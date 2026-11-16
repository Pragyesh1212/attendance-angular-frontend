import { LanguageService } from './language';
import { Injectable, NgZone, OnDestroy, inject, signal } from '@angular/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { Attendance, EmployeeLocationMonitorStatus, LocationAlertFix } from './attendance';

export interface EmployeeLocationWarning {
  locationName: string;
  radiusMeters: number;
}

type Geofence = NonNullable<EmployeeLocationMonitorStatus['location']>;

/**
 * Keeps GPS in the employee's browser. Only the authenticated employee's
 * active punch-in session and assigned geofence are fetched from the server.
 * This never changes attendance. One confirmed exit/return episode is posted
 * to the backend for the organization admin; no continuous GPS trail is sent.
 *
 * Browser geolocation is best-effort: browsers/OSs may suspend it in the
 * background, or completely stop it when the tab/browser is closed.
 */
@Injectable({ providedIn: 'root' })
export class EmployeeLocationMonitor implements OnDestroy {
  private readonly attendance = inject(Attendance);
  private readonly zone = inject(NgZone);
  private readonly languageService = inject(LanguageService);

  readonly warning = signal<EmployeeLocationWarning | null>(null);

  private started = false;
  private requestInFlight = false;
  private monitorPoll: ReturnType<typeof setInterval> | null = null;
  private confirmationTimer: ReturnType<typeof setTimeout> | null = null;
  private reminderTimer: ReturnType<typeof setTimeout> | null = null;
  private chromeReminderTimer: ReturnType<typeof setInterval> | null = null;
  private visibleGpsPoll: ReturnType<typeof setInterval> | null = null;
  private visibleGpsRequestInFlight = false;
  // In-app reminders, Chrome reminders, and foreground GPS checks use 5 seconds.
  // Chrome suspends geolocation in background tabs; a web page cannot override it.
  private readonly reminderDelayMs = 5_000;
  private readonly chromeReminderDelayMs = 5_000;
  private readonly visibleGpsPollMs = 5_000;
  private serverRequest: Subscription | null = null;
  private watchId: number | null = null;
  private generation = 0;

  private sessionId: string | null = null;
  private geofence: Geofence | null = null;
  private outsideReadings = 0;
  private insideReadings = 0;
  private outsideEpisode = false;
  private eventQueue: Array<{ kind: 'EXIT' | 'RETURN'; fix: LocationAlertFix; generation: number }> = [];
  private sendingEvent = false;

  start(): void {
    if (this.started || typeof window === 'undefined') return;
    this.started = true;
    this.refresh();
    this.monitorPoll = setInterval(() => this.refresh(), 30_000);
    window.addEventListener('focus', this.onFocus);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  stop(): void {
    this.started = false;
    if (this.monitorPoll !== null) clearInterval(this.monitorPoll);
    this.monitorPoll = null;
    window.removeEventListener('focus', this.onFocus);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.serverRequest?.unsubscribe();
    this.serverRequest = null;
    this.requestInFlight = false;
    this.stopWatching();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  /** Recheck immediately after the backend confirms a punch-in or punch-out. */
  refreshImmediately(punchedOut = false): void {
    if (punchedOut) this.stopWatching();
    this.serverRequest?.unsubscribe();
    this.serverRequest = null;
    this.requestInFlight = false;
    this.refresh();
  }

  /** Called after a successful punch-in/out; the server remains authoritative. */
  refresh(): void {
    if (!this.started || this.requestInFlight) return;
    this.requestInFlight = true;
    this.serverRequest = this.attendance.getMyLocationMonitor().subscribe({
      next: status => {
        this.requestInFlight = false;
        if (!this.started) return;
        this.zone.run(() => this.applyStatus(status));
      },
      error: error => {
        this.requestInFlight = false;
        if ([401, 403, 404].includes(error?.status)) {
          this.zone.run(() => this.stopWatching());
        }
        // Transient errors are not proof of exit. Retry on the next poll.
      },
    });
  }

  /**
   * Only call this from the employee's explicit Punch In click.
   * Chrome requires user interaction to request system-notification permission.
   */
  requestSystemNotificationPermission(): void {
    if (typeof window === 'undefined' || !window.isSecureContext ||
        !('Notification' in window) || Notification.permission !== 'default') return;
    void Notification.requestPermission().catch(() => {
      // In-app location warning works regardless of notification permission.
    });
  }

  dismissWarning(): void {
    // The X dismisses the visible warning only, not the ongoing geofence alert.
    this.warning.set(null);
    if (this.outsideEpisode) this.scheduleReminder();
  }

  private readonly onFocus = () => {
    this.refresh();
    this.requestVisibleGpsPosition();
  };
  private readonly onVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      this.refresh();
      this.requestVisibleGpsPosition();
    } else if (document.visibilityState === 'hidden' &&
               this.started && this.outsideEpisode && this.geofence) {
      // The employee may switch tabs while the in-app warning is still open.
      // Notify independently of the modal's dismissed/visible state.
      // This uses the last confirmed exit; hidden tabs cannot reliably read GPS.
      // Send a background-specific notification even if the in-app modal is open.
      this.showChromeWarning('background');
    }
  };

  private applyStatus(status: EmployeeLocationMonitorStatus): void {
    if (!status.active || !status.sessionId || !this.validLocation(status.location)) {
      this.stopWatching();
      return;
    }

    const location = status.location;
    const changed = this.sessionId !== status.sessionId ||
      this.geofence?.id !== location.id ||
      this.geofence?.latitude !== location.latitude ||
      this.geofence?.longitude !== location.longitude ||
      this.geofence?.radiusMeters !== location.radiusMeters;

    if (!changed && this.watchId !== null) {
      this.startVisibleGpsPolling();
      return;
    }
    this.stopWatching();
    this.sessionId = status.sessionId;
    this.geofence = location;
    if (!navigator.geolocation || !window.isSecureContext) return;

    const currentGeneration = ++this.generation;
    this.watchId = navigator.geolocation.watchPosition(
      pos => this.zone.run(() => {
        if (this.started && currentGeneration === this.generation) {
          this.evaluateLocation(pos);
        }
      }),
      error => {
        // Do not mistake a timeout, GPS failure or denied permission for
        // proof of being outside the assigned radius.
        if (currentGeneration === this.generation) {
          console.warn('AttendEase location monitoring unavailable:', error.message);
        }
      },
      { enableHighAccuracy: true, timeout: 30_000, maximumAge: 10_000 },
    );
    this.startVisibleGpsPolling();
    this.requestVisibleGpsPosition();
  }

  /**
   * watchPosition is event-driven, not a 5-second timer. Ask for a new GPS fix
   * while the Attendance tab is visible so DevTools overrides/movements are
   * noticed without switching tabs. Background geolocation is blocked by Chrome.
   */
  private startVisibleGpsPolling(): void {
    if (this.visibleGpsPoll !== null || !this.geofence || !this.started) return;
    this.visibleGpsPoll = setInterval(() => this.requestVisibleGpsPosition(), this.visibleGpsPollMs);
  }

  private requestVisibleGpsPosition(): void {
    if (!this.started || !this.geofence || !this.sessionId ||
        document.visibilityState !== 'visible' ||
        !navigator.geolocation || !window.isSecureContext ||
        this.visibleGpsRequestInFlight) return;

    const currentGeneration = this.generation;
    this.visibleGpsRequestInFlight = true;
    navigator.geolocation.getCurrentPosition(
      position => this.zone.run(() => {
        if (currentGeneration !== this.generation) return;
        this.visibleGpsRequestInFlight = false;
        if (this.started && document.visibilityState === 'visible') {
          this.evaluateLocation(position);
        }
      }),
      () => this.zone.run(() => {
        // Do not warn from a failed/uncertain GPS fix. The watcher still runs.
        if (currentGeneration === this.generation) this.visibleGpsRequestInFlight = false;
      }),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 },
    );
  }

  private validLocation(location: EmployeeLocationMonitorStatus['location']): location is Geofence {
    return !!location && Number.isFinite(location.latitude) &&
      Math.abs(location.latitude) <= 90 &&
      Number.isFinite(location.longitude) && Math.abs(location.longitude) <= 180 &&
      Number.isFinite(location.radiusMeters) && location.radiusMeters > 0;
  }

  private evaluateLocation(position: GeolocationPosition): void {
    const location = this.geofence;
    if (!location || !Number.isFinite(position.coords.latitude) ||
        !Number.isFinite(position.coords.longitude)) return;

    const accuracy = position.coords.accuracy;
    if (!Number.isFinite(accuracy) || accuracy < 0) return;

    const distance = this.distanceMeters(
      position.coords.latitude, position.coords.longitude,
      location.latitude, location.longitude,
    );

    // Count only fixes whose whole accuracy circle is reliably on one side.
    // An uncertain fix near the edge must not trigger a false warning.
    if (distance - accuracy > location.radiusMeters) {
      this.outsideReadings++;
      this.insideReadings = 0;
      if (this.outsideReadings === 1) this.confirmOutsideWithFreshFix();
      if (this.outsideReadings >= 2 && !this.outsideEpisode) {
        this.outsideEpisode = true;
        this.clearConfirmationTimer();
        this.warning.set({
          locationName: location.name,
          radiusMeters: location.radiusMeters,
        });
        this.queueLocationEvent('EXIT', position);
        this.showChromeWarning();
        this.startChromeReminders();
      }
      return;
    }

    if (distance + accuracy < location.radiusMeters) {
      this.insideReadings++;
      this.outsideReadings = 0;
      this.clearConfirmationTimer();
      if (this.insideReadings >= 2 && this.outsideEpisode) {
        this.outsideEpisode = false;
        this.clearReminderTimer();
        this.clearChromeReminders();
        this.queueLocationEvent('RETURN', position);
        this.warning.set(null);
      }
      return;
    }

    // Uncertain readings should neither create nor clear an alert.
    this.outsideReadings = 0;
    this.insideReadings = 0;
    this.clearConfirmationTimer();
  }

  private confirmOutsideWithFreshFix(): void {
    if (this.confirmationTimer !== null) return;
    const currentGeneration = this.generation;
    this.confirmationTimer = setTimeout(() => {
      this.confirmationTimer = null;
      if (!this.started || currentGeneration !== this.generation ||
          this.outsideEpisode || this.outsideReadings !== 1) return;

      navigator.geolocation.getCurrentPosition(
        position => this.zone.run(() => {
          if (this.started && currentGeneration === this.generation) {
            this.evaluateLocation(position);
          }
        }),
        () => { /* No reliable new fix: never invent an exit. */ },
        { enableHighAccuracy: true, timeout: 20_000, maximumAge: 0 },
      );
    }, 10_000);
  }

  /**
   * Closing X only hides the modal for five seconds. Once two reliable GPS
   * readings confirmed an exit, keep reminding during that same outside
   * episode; do not block the reminder on another GPS request (which may hang).
   * The independent GPS watcher clears the episode after two reliable inside
   * readings, and stopWatching() cancels pending reminders on punch-out.
   */
  private scheduleReminder(): void {
    this.clearReminderTimer();
    if (!this.started || !this.outsideEpisode || !this.geofence) return;

    const currentGeneration = this.generation;
    this.reminderTimer = setTimeout(() => this.zone.run(() => {
      this.reminderTimer = null;
      if (!this.started || !this.outsideEpisode || !this.geofence ||
          currentGeneration !== this.generation || this.warning()) return;

      this.warning.set({
        locationName: this.geofence.name,
        radiusMeters: this.geofence.radiusMeters,
      });
      // Chrome alerts use their own timer, regardless of this modal's state.
    }), this.reminderDelayMs);
  }

  private clearReminderTimer(): void {
    if (this.reminderTimer !== null) clearTimeout(this.reminderTimer);
    this.reminderTimer = null;
  }

  /**
   * Keep system notifications independent of the dismissible in-app modal.
   * Closing a Chrome/Windows notification cannot reliably be detected across
   * every OS, so request another alert every five seconds while the last
   * confirmed location status is outside. Browser/OS throttling still applies.
   */
  private startChromeReminders(): void {
    if (this.chromeReminderTimer !== null || !this.started || !this.outsideEpisode) return;
    const currentGeneration = this.generation;
    this.chromeReminderTimer = setInterval(() => {
      if (!this.started || !this.outsideEpisode || !this.geofence ||
          currentGeneration !== this.generation) {
        this.clearChromeReminders();
        return;
      }
      // Do not check this.warning(): system alerts repeat even when the popup is open.
      this.showChromeWarning();
    }, this.chromeReminderDelayMs);
  }

  private clearChromeReminders(): void {
    if (this.chromeReminderTimer !== null) clearInterval(this.chromeReminderTimer);
    this.chromeReminderTimer = null;
  }

  private showChromeWarning(context: 'location-exit' | 'background' = 'location-exit'): void {
    if (typeof window === 'undefined' || !window.isSecureContext ||
        !('Notification' in window) || Notification.permission !== 'granted') return;

    const title = this.languageService.translate('AttendEase – Location Warning');
    const options: NotificationOptions & { renotify?: boolean } = {
      body: this.languageService.translate('You have left your assigned work location. Please return immediately.'),
      // Use a different tag for a tab switch. Reusing the exit notification's
      // tag can simply replace the old notification instead of showing a new one.
      tag: context === 'background'
        ? 'attendease-location-warning-background'
        : 'attendease-location-warning',
      renotify: true,
      icon: new URL('favicon.ico', document.baseURI).href,
    };

    // Chrome on Android requires ServiceWorkerRegistration.showNotification().
    // The notification-only worker has no fetch handler or caching behavior.
    if ('serviceWorker' in navigator) {
      const url = new URL('attendease-notification-sw.js', document.baseURI).href;
      void navigator.serviceWorker.register(url)
        .then(() => navigator.serviceWorker.ready)
        .then(registration => registration.showNotification(title, options))
        .catch(() => this.showDesktopNotification(title, options));
    } else {
      this.showDesktopNotification(title, options);
    }
  }

  private showDesktopNotification(title: string, options: NotificationOptions): void {
    try {
      new Notification(title, options);
    } catch {
      // System notifications can be denied at browser/OS level; in-app remains.
    }
  }

  /** Send one event per confirmed transition; preserve ordering during quick exit/return. */
  private queueLocationEvent(kind: 'EXIT' | 'RETURN', position: GeolocationPosition): void {
    if (!this.sessionId || !this.geofence || !this.started) return;
    this.eventQueue.push({
      kind,
      generation: this.generation,
      fix: {
        sessionId: this.sessionId,
        workLocationId: this.geofence.id,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      },
    });
    void this.sendQueuedEvents();
  }

  private async sendQueuedEvents(): Promise<void> {
    if (this.sendingEvent) return;
    this.sendingEvent = true;
    try {
      while (this.eventQueue.length) {
        const event = this.eventQueue.shift()!;
        if (!this.started || event.generation !== this.generation) continue;
        try {
          await firstValueFrom(event.kind === 'EXIT'
            ? this.attendance.reportGeofenceExit(event.fix)
            : this.attendance.reportGeofenceReturn(event.fix));
        } catch (error) {
          // In-app warnings continue even if the API or GPS-event reporting fails.
          console.warn('AttendEase could not save geofence transition:', error);
        }
      }
    } finally {
      this.sendingEvent = false;
    }
  }

  private stopWatching(): void {
    ++this.generation; // Invalidate queued callbacks from a prior watch/session.
    this.eventQueue = [];
    if (this.visibleGpsPoll !== null) clearInterval(this.visibleGpsPoll);
    this.visibleGpsPoll = null;
    this.visibleGpsRequestInFlight = false;
    this.clearConfirmationTimer();
    this.clearReminderTimer();
    this.clearChromeReminders();
    if (this.watchId !== null && typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.clearWatch(this.watchId);
    }
    this.watchId = null;
    this.geofence = null;
    this.sessionId = null;
    this.outsideReadings = 0;
    this.insideReadings = 0;
    this.outsideEpisode = false;
    this.warning.set(null);
  }

  private clearConfirmationTimer(): void {
    if (this.confirmationTimer !== null) clearTimeout(this.confirmationTimer);
    this.confirmationTimer = null;
  }

  private distanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const radians = (degrees: number) => degrees * Math.PI / 180;
    const deltaLat = radians(lat2 - lat1);
    const deltaLon = radians(lon2 - lon1);
    const a = Math.sin(deltaLat / 2) ** 2 +
      Math.cos(radians(lat1)) * Math.cos(radians(lat2)) *
      Math.sin(deltaLon / 2) ** 2;
    return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
  }
}
