import { TranslateTextPipe } from '../../shared/translate-text.pipe';
import { FeedbackService } from '../../shared/feedback/feedback.service';
import { EmployeeMonthlyService } from '../../services/employee-monthly';
import { EmployeeDeviceService, RegisteredDevice } from '../../services/employee-device';
import { EmployeeLocationMonitor } from '../../services/employee-location-monitor';
import { forkJoin } from 'rxjs';

import {
  Component,
  ChangeDetectorRef,
  inject,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Auth } from '../../services/auth';

import {
  Attendance,
  AttendanceRecord,
  AttendanceQuery,
  PunchInPayload,
  PunchOutPayload
} from '../../services/attendance';

interface CalendarDay {
  date: number;
  dateKey: string;
  records: AttendanceRecord[];
  statuses: string[];
}

/** One display-only row for every calendar date in the selected month.
 * No fake attendance record is written to the database. */
interface EmployeeMonthDayRow {
  dateKey: string;
  formattedDate: string;
  weekday: string;
  record: AttendanceRecord | null;
  status: string;
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateTextPipe],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class AttendanceComponent implements OnInit, OnDestroy {
  private readonly uiFeedback = inject(FeedbackService);

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get errorMessage(): string { return ''; }
  set errorMessage(value: string) {
    if (value) this.uiFeedback.error(value);
  }

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get actionMessage(): string { return ''; }
  set actionMessage(value: string) {
    if (value) this.uiFeedback.success(value);
  }


  private attendanceService = inject(Attendance);
  private readonly locationMonitor = inject(EmployeeLocationMonitor);
  private readonly devicesService = inject(EmployeeDeviceService);
  currentBrowserDevice: RegisteredDevice | null = null;
  deviceRegistrationMessage = '';
  checkingDevice = false;

  async ensureAttendanceDevice(): Promise<void> {
    if (!this.user || this.user.role !== 'EMPLOYEE') return;
    this.checkingDevice = true; this.deviceRegistrationMessage = '';
    try {
      this.currentBrowserDevice = await this.devicesService.ensureRegistered(this.user.id);
    } catch (error: any) {
      this.deviceRegistrationMessage = error?.error?.message || error?.message || 'Device enrollment unavailable';
      this.currentBrowserDevice = await this.devicesService.currentBrowserDevice(this.user.id).catch(() => null);
    } finally { this.checkingDevice = false; this.cdr.markForCheck(); }
  }

  async refreshAttendanceDevice(): Promise<void> {
    if (!this.user || this.user.role !== 'EMPLOYEE') return;
    this.checkingDevice = true;
    try {
      this.currentBrowserDevice = await this.devicesService.currentBrowserDevice(this.user.id);
      this.deviceRegistrationMessage = this.currentBrowserDevice ? '' : 'No registered browser credential was found.';
    } catch (error: any) { this.deviceRegistrationMessage = error?.error?.message || error?.message || 'Unable to check device status'; }
    finally { this.checkingDevice = false; this.cdr.markForCheck(); }
  }

  private readonly employeeMonthlyService = inject(EmployeeMonthlyService);
  private authService = inject(Auth);
  private cdr = inject(ChangeDetectorRef);

  private clockInterval: ReturnType<typeof setInterval> | null = null;
  private policyPollTicks = 0;
  private monthlyRequestSerial = 0;

  user = this.authService.getUser();

  records: AttendanceRecord[] = [];
  monthlyRecords: AttendanceRecord[] = [];

  calendarDays: CalendarDay[] = [];
  selectedDayRecords: AttendanceRecord[] = [];

  isLoading = false;
  isMonthlyLoading = false;

  

  viewMode: 'daily' | 'monthly' = 'daily';

  page = 1;
  limit = 10;
  total = 0;
  totalPages = 0;

  startDate = '';
  endDate = '';
  selectedStatus = '';
  // The input is not applied until the Admin clicks Apply (or presses Enter).
  employeeNameSearch = '';
  private appliedEmployeeName = '';

  currentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  selectedDate = '';

  actionLoading = false;
  
  actionError = '';

  lateReason = '';
  showLateReason = false;

  locationMessage = '';

  // The server is authoritative about both the configured cutoff and shift end.
  // Fail closed on the employee screen until its policy has been confirmed.
  private punchInOpensAtMs: number | null = null;
  private punchInCutoffAtMs: number | null = null;
  private serverConfirmedCutoff = false;
  currentShiftLabel = '';
  allShiftsCompleted = false;
  punchInPolicyReady = false;
  punchInPolicyError = '';
  punchInBeforeStartMessage = 'Your shift has not started yet. Punch In will be available at shift start.';
  punchInCutoffMessage = 'Punch In is closed for your shift. Please contact your Admin.';

  get isPunchInBeforeShift(): boolean {
    return this.punchInPolicyReady &&
      this.punchInOpensAtMs !== null &&
      this.now.getTime() < this.punchInOpensAtMs;
  }

  get isPunchInCutoffReached(): boolean {
    return this.punchInPolicyReady &&
      (this.serverConfirmedCutoff ||
        (this.punchInCutoffAtMs !== null && this.now.getTime() >= this.punchInCutoffAtMs));
  }

  get isPunchInUnavailable(): boolean {
    return !this.punchInPolicyReady || this.isPunchInBeforeShift || this.isPunchInCutoffReached;
  }

  get punchInStatusMessage(): string {
    if (!this.punchInPolicyReady) {
      return this.punchInPolicyError || 'Checking your assigned shift policy...';
    }
    return this.isPunchInBeforeShift
      ? this.punchInBeforeStartMessage
      : this.punchInCutoffMessage;
  }

  private loadPunchInPolicy(): void {
    if (!this.isEmployee) return;

    this.attendanceService.getMyPunchInPolicy().subscribe({
      next: policy => {
        // A server still running the old cutoff-only policy MUST NOT
        // silently enable Punch In. Require the new time-window contract.
        if (!policy || typeof policy.cutoffReached !== 'boolean' ||
            !['NOT_STARTED', 'OPEN', 'CLOSED'].includes(policy.status)) {
          this.punchInPolicyReady = false;
          this.punchInPolicyError = 'Unable to verify your updated shift policy. Please contact your Admin.';
          this.cdr.markForCheck();
          return;
        }
        const opening = policy.opensAt ? Date.parse(policy.opensAt) : NaN;
        const closing = policy.cutoffAt ? Date.parse(policy.cutoffAt) : NaN;
        if (policy.status !== 'CLOSED' &&
            (!Number.isFinite(opening) || !Number.isFinite(closing))) {
          this.punchInPolicyReady = false;
          this.punchInPolicyError = 'Shift time configuration is incomplete. Please contact your Admin.';
          this.cdr.markForCheck();
          return;
        }
        this.punchInOpensAtMs = Number.isFinite(opening) ? opening : null;
        this.punchInCutoffAtMs = Number.isFinite(closing) ? closing : null;
        this.serverConfirmedCutoff = policy.status === 'CLOSED' || policy.cutoffReached;
        this.currentShiftLabel = policy.shiftOrder ? `Shift ${policy.shiftOrder}: ${policy.shiftName || ''}` : '';
        this.allShiftsCompleted = policy.allShiftsCompleted === true;
        this.punchInBeforeStartMessage = policy.status === 'NOT_STARTED' && policy.message
          ? policy.message
          : 'Your shift has not started yet. Punch In will be available at shift start.';
        this.punchInCutoffMessage = policy.status === 'CLOSED' && policy.message
          ? policy.message
          : 'Punch In is closed for your shift. Please contact your Admin.';
        this.punchInPolicyReady = true;
        this.punchInPolicyError = '';
        this.cdr.markForCheck();
      },
      error: error => {
        // Never show an enabled Punch In button if the policy cannot be verified.
        // This also surfaces missing routes (404) and authorization errors (401/403).
        console.warn('Unable to load punch-in policy:', error);
        this.punchInPolicyReady = false;
        this.punchInPolicyError = 'Unable to verify your shift policy. Please retry or contact your Admin.';
        this.cdr.markForCheck();
      }
    });
  }

  now = new Date();

  // Used by the existing HTML template.
  get today(): Date {
    return this.now;
  }

  get isAdmin(): boolean {
    return this.user?.role === 'ADMIN' ||
      this.user?.role === 'SUPER_ADMIN';
  }

  get isEmployee(): boolean {
    return this.user?.role === 'EMPLOYEE';
  }

  get monthLabel(): string {
    return this.currentMonth.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric'
    });
  }

  get monthStart(): string {
    return this.formatDate(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      1
    );
  }

  get monthEnd(): string {
    return this.formatDate(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0
    );
  }

  get presentCount(): number {
    return this.monthlyRecords.filter(
      r => r.status === 'PRESENT'
    ).length;
  }

  get lateCount(): number {
    return this.monthlyRecords.filter(
      r => r.status === 'LATE'
    ).length;
  }

  get absentCount(): number {
    return this.monthlyRecords.filter(
      r => r.status === 'ABSENT'
    ).length;
  }

  get halfDayCount(): number {
    return this.monthlyRecords.filter(
      r => r.status === 'HALF_DAY'
    ).length;
  }

  // Monthly table and graph share the exact same selected-month API data.
  // Count only persisted statuses; do not infer ABSENT from missing dates.
  get employeeMonthRecords(): AttendanceRecord[] {
    const selectedMonth = this.monthStart.slice(0, 7);
    return this.monthlyRecords
      .filter(record => (record.workDate || '').slice(0, 7) === selectedMonth)
      .slice()
      .sort((a, b) => (b.workDate || '').localeCompare(a.workDate || ''));
  }

  /** Combines real attendance and Admin day-off overrides with ALL dates of
   * the selected month. An unrecorded date is NOT automatically an absence. */
  get employeeMonthDays(): EmployeeMonthDayRow[] {
    const year = this.currentMonth.getFullYear();
    const monthIndex = this.currentMonth.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const recordsByDate = new Map<string, AttendanceRecord>();
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'
    });
    const weekdayFormatter = new Intl.DateTimeFormat('en-GB', {
      weekday: 'short', timeZone: 'UTC'
    });
    for (const record of this.employeeMonthRecords) {
      const key = record.workDate?.slice(0, 10);
      if (key && !recordsByDate.has(key)) recordsByDate.set(key, record);
    }

    const todayKey = this.formatDate(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
    const rows: EmployeeMonthDayRow[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = this.formatDate(year, monthIndex, day);
      // UTC is used ONLY for calendar labels, never to shift stored punch times.
      const utcDay = new Date(Date.UTC(year, monthIndex, day));
      const record = recordsByDate.get(dateKey) ?? null;
      const status = record?.status || (dateKey > todayKey ? 'UPCOMING' : 'NO_RECORD');
      rows.push({
        dateKey,
        formattedDate: dateFormatter.format(utcDay),
        weekday: weekdayFormatter.format(utcDay),
        record,
        status
      });
    }
    return rows;
  }

  employeeDayWorkHours(day: EmployeeMonthDayRow): string {
    // A non-working or unrecorded date is not a zero-hour shift.
    if (!day.record || ['WEEKEND', 'HOLIDAY', 'UPCOMING', 'NO_RECORD'].includes(day.status) ||
        !(day.record.sessions || []).some(s => !!s.punchInAt)) return '—';
    return this.formatHours(this.getRecordWorkingMinutes(day.record));
  }

  employeeDayStatusLabel(status: string): string {
    if (status === 'NO_RECORD') return 'No record';
    if (status === 'UPCOMING') return 'Upcoming';
    return status.replace(/_/g, ' ');
  }

  employeeDayStatusClass(status: string): string {
    switch (status) {
      case 'WEEKEND': return 'ea-status-weekend';
      case 'HOLIDAY': return 'ea-status-holiday';
      case 'UPCOMING': return 'ea-status-upcoming';
      case 'NO_RECORD': return 'ea-status-no-record';
      default: return this.statusClass(status);
    }
  }

  get employeeStatusBars(): { key: string; label: string; count: number; percent: number }[] {
    const records = this.employeeMonthRecords;
    const bars = [
      { key: 'present', label: 'Present', code: 'PRESENT' },
      { key: 'late', label: 'Late', code: 'LATE' },
      { key: 'absent', label: 'Absent', code: 'ABSENT' },
      { key: 'half', label: 'Half Day', code: 'HALF_DAY' }
    ].map(item => ({
      key: item.key,
      label: item.label,
      count: records.filter(record => record.status === item.code).length
    }));
    const maximum = Math.max(1, ...bars.map(bar => bar.count));
    return bars.map(bar => ({ ...bar, percent: 100 * bar.count / maximum }));
  }

  get employeeChartDescription(): string {
    return `For ${this.monthLabel}: ${this.presentCount} present, ${this.lateCount} late, ` +
      `${this.absentCount} absent, ${this.halfDayCount} half day.`;
  }

  onEmployeeMonthChange(value: string): void {
    if (!this.isEmployee || !/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return;
    const [year, month] = value.split('-').map(Number);
    if (year === this.currentMonth.getFullYear() && month === this.currentMonth.getMonth() + 1) return;
    this.currentMonth = new Date(year, month - 1, 1);
    this.selectedDate = '';
    this.selectedDayRecords = [];
    this.loadMonthlyAttendance();
  }

  firstPunchInAt(record: AttendanceRecord): string {
    const sessions = (record.sessions || []).filter(session => !!session.punchInAt);
    if (!sessions.length) return '';
    const first = sessions.reduce((earliest, session) =>
      new Date(session.punchInAt).getTime() < new Date(earliest.punchInAt).getTime()
        ? session : earliest
    );
    return first.punchInAt;
  }

  latestPunchOutAt(record: AttendanceRecord): string {
    const sessions = (record.sessions || []).filter(session => !!session.punchInAt);
    if (!sessions.length) return '';
    const latest = sessions.reduce((mostRecent, session) =>
      new Date(session.punchInAt).getTime() > new Date(mostRecent.punchInAt).getTime()
        ? session : mostRecent
    );
    // A currently open session must show "Not yet", even if earlier ones finished.
    return latest.punchOutAt || '';
  }

  get totalWorkMinutes(): number {
    return this.monthlyRecords.reduce(
      (total, record) =>
        total + this.getRecordWorkingMinutes(record),
      0
    );
  }

  get totalWorkHours(): string {
    return this.formatHours(this.totalWorkMinutes);
  }

  get todayRecord(): AttendanceRecord | undefined {
    const todayKey = this.formatDate(
      this.now.getFullYear(),
      this.now.getMonth(),
      this.now.getDate()
    );

    // Keep Punch In/Out independent of the month being browsed below the card.
    // The daily records request remains unfiltered for Employees.
    if (this.isEmployee) {
      const dailyRecord = this.records.find(
        record => record.workDate?.slice(0, 10) === todayKey
      );
      if (dailyRecord) return dailyRecord;
    }

    return this.monthlyRecords.find(
      record => record.workDate?.slice(0, 10) === todayKey
    );
  }

  get todaySessions(): any[] {
    return this.todayRecord?.sessions || [];
  }

  get latestSession(): any {
    if (!this.todaySessions.length) return null;

    return [...this.todaySessions].sort(
      (a, b) =>
        new Date(b.punchInAt).getTime() -
        new Date(a.punchInAt).getTime()
    )[0];
  }

  get activeSession(): any {
    return this.todaySessions.find(
      session =>
        !!session.punchInAt &&
        !session.punchOutAt && session.approvalStatus !== 'REJECTED' 
    ) || null;
  }

  // A pending session is an approval request, not permission to start work.
  get pendingApproval(): boolean {
    return this.activeSession?.approvalStatus === 'PENDING';
  }

  get rejectedSession(): any {
    return this.todaySessions.find(
      session =>
        session.approvalStatus === 'REJECTED' &&
        !session.punchOutAt
    ) || null;
  }

  get isPunchOutAllowed(): boolean {
    return !this.isAttendanceCompletedToday &&
      !!this.activeSession &&
      ['NOT_REQUIRED', 'APPROVED'].includes(
        this.activeSession.approvalStatus
      );
  }

  // A finished attendance session means the employee has completed today's
  // allowed punch-in and punch-out. Keep the button hidden after punch-out.
  get isAttendanceCompletedToday(): boolean {
    return this.allShiftsCompleted && this.todaySessions.some(session => !!session.punchOutAt);
  }

  get todayPunchIn(): string {
    return this.latestSession?.punchInAt || '';
  }

  get todayPunchOut(): string {
    return this.latestSession?.punchOutAt || '';
  }

  get todayWorkingHours(): string {
    if (!this.todayRecord) return '0h 0m';

    return this.formatHours(
      this.getRecordWorkingMinutes(this.todayRecord)
    );
  }

  get approvalStatus(): string {
    return this.activeSession?.approvalStatus || '';
  }

  ngOnInit(): void {
    if (this.user?.role === 'EMPLOYEE') void this.ensureAttendanceDevice();
    this.loadPunchInPolicy();
    this.loadAttendance();
    // Only the Employee page needs monthly data now.
    if (this.isEmployee) this.loadMonthlyAttendance();

    this.clockInterval = setInterval(() => {
      this.now = new Date();
      // Check for Admin changes to the shift policy every two minutes.
      // The local clock still disables the button exactly at the cutoff.
      if (this.isEmployee && !this.activeSession && !this.isAttendanceCompletedToday) {
        this.policyPollTicks++;
        if (this.policyPollTicks % 4 === 0) this.loadPunchInPolicy();
      }
      this.cdr.markForCheck();
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }

  private formatDate(
    year: number,
    month: number,
    day: number
  ): string {
    const date = new Date(year, month, day);

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    return `${y}-${m}-${d}`;
  }

  private getRecordWorkingMinutes(
    record: AttendanceRecord
  ): number {
    const completedMinutes = record.totalWorkMinutes || 0;

    const runningMinutes = (record.sessions || [])
      .filter(session =>
        !!session.punchInAt &&
        !session.punchOutAt &&
        ['NOT_REQUIRED', 'APPROVED'].includes(
          session.approvalStatus
        )
      )
      .reduce((total, session) => {
        const start = new Date(session.punchInAt).getTime();
        const end = this.now.getTime();

        if (!Number.isFinite(start) || end <= start) {
          return total;
        }

        return total + Math.floor(
          (end - start) / 60000
        );
      }, 0);

    return completedMinutes + runningMinutes;
  }

  private buildCalendar(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: CalendarDay[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({
        date: 0,
        dateKey: '',
        records: [],
        statuses: []
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = this.formatDate(year, month, day);

      const dayRecords = this.monthlyRecords.filter(
        record => record.workDate?.slice(0, 10) === dateKey
      );

      days.push({
        date: day,
        dateKey,
        records: dayRecords,
        statuses: [
          ...new Set(dayRecords.map(r => r.status))
        ]
      });
    }

    this.calendarDays = days;
    this.cdr.markForCheck();
  }

  loadAttendance(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const query: AttendanceQuery = {
      page: this.page,
      limit: this.limit,
      startDate: this.startDate || undefined,
      endDate: this.endDate || undefined,
      status: this.selectedStatus || undefined,
      ...(this.isAdmin && this.appliedEmployeeName
        ? { employeeName: this.appliedEmployeeName }
        : {})
    };

    const request$ = this.isAdmin
      ? this.attendanceService.getAllAttendance(query)
      : this.attendanceService.getMyAttendance(query);

    request$.subscribe({
      next: response => {
        this.records = response.data || [];
        this.total = response.pagination?.total || 0;
        this.totalPages = response.pagination?.totalPages || 0;

        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: error => {
        this.records = [];
        this.isLoading = false;
        this.errorMessage =
          error.error?.message ||
          'Unable to load attendance records.';

        this.cdr.markForCheck();
      }
    });
  }

  loadMonthlyAttendance(): void {
    const requestSerial = ++this.monthlyRequestSerial;
    this.isMonthlyLoading = true;

    const query: AttendanceQuery = {
      page: 1,
      limit: 100,
      startDate: this.monthStart,
      endDate: this.monthEnd
    };

    const request$ = this.isAdmin
      ? this.attendanceService.getAllAttendance(query)
      : this.attendanceService.getMyAttendance(query);

    // Employee-only: overlay Admin-marked weekends/holidays without changing
    // persisted attendance statuses or any Admin/Super Admin views.
    if (this.isEmployee) {
      forkJoin({ attendance: request$, dayOverrides: this.employeeMonthlyService.myOverrides(this.monthStart.slice(0, 7)) })
        .subscribe({
          next: ({ attendance, dayOverrides }) => {
            if (requestSerial !== this.monthlyRequestSerial) return;
            const rows = (attendance.data || []).map(record => ({ ...record }));
            for (const day of dayOverrides) {
              const existing = rows.find(r => r.workDate?.slice(0, 10) === day.date);
              if (existing) {
                existing.status = day.dayType;
              } else {
                rows.push({ id: `day-off-${day.date}`, workDate: `${day.date}T00:00:00.000Z`,
                  status: day.dayType, totalWorkMinutes: 0, sessions: [], notes: day.note || '' });
              }
            }
            this.monthlyRecords = rows;
            this.buildCalendar();
            this.isMonthlyLoading = false;
            this.cdr.markForCheck();
          },
          error: e => { if (requestSerial !== this.monthlyRequestSerial) return;
            this.monthlyRecords = []; this.isMonthlyLoading = false;
            this.errorMessage = e.error?.message || 'Unable to load monthly attendance.';
            this.cdr.markForCheck(); },
        });
      return;
    }
    request$.subscribe({
      next: response => {
        if (requestSerial !== this.monthlyRequestSerial) return;
        this.monthlyRecords = response.data || [];

        this.buildCalendar();

        this.isMonthlyLoading = false;
        this.cdr.markForCheck();
      },
      error: error => {
        if (requestSerial !== this.monthlyRequestSerial) return;
        this.monthlyRecords = [];
        this.isMonthlyLoading = false;

        this.errorMessage =
          error.error?.message ||
          'Unable to load monthly attendance.';

        this.cdr.markForCheck();
      }
    });
  }

  refreshAttendance(): void {
    this.now = new Date();
    this.loadPunchInPolicy();
    this.loadAttendance();
    this.loadMonthlyAttendance();
  }

  private getCurrentLocation(
    callback: (payload: PunchInPayload) => void,
    timeoutMs = 300_000
  ): void {
    this.locationMessage = '';
    this.actionError = '';

    if (!navigator.geolocation) {
      this.actionError =
        'Geolocation is not supported by this browser.';
      this.actionLoading = false;
      this.cdr.markForCheck();
      return;
    }

    this.locationMessage =
      'Getting your current GPS location...';

    this.cdr.markForCheck();

    // Geolocation's own timeout may exclude time spent waiting for permission.
    // A wall-clock deadline also prevents the UI from hanging indefinitely.
    // Once the deadline passes, ignore any late GPS result to avoid submitting
    // an attendance request after the user has already seen a timeout.
    let finished = false;
    const deadline = setTimeout(() => {
      if (finished) return;
      finished = true;
      this.actionLoading = false;
      this.locationMessage = '';
      this.actionError = 'Location request timed out. Please try again.';
      this.cdr.markForCheck();
    }, timeoutMs + 1_000);

    navigator.geolocation.getCurrentPosition(
      position => {
        if (finished) return;
        finished = true;
        clearTimeout(deadline);
        const payload: PunchInPayload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };

        this.locationMessage =
          `Location captured (accuracy ±${Math.round(position.coords.accuracy)}m).`;

        this.cdr.markForCheck();
        callback(payload);
      },
      error => {
        if (finished) return;
        finished = true;
        clearTimeout(deadline);
        this.actionLoading = false;
        this.locationMessage = '';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.actionError =
              'Location permission denied. Allow location access in Chrome site settings.';
            break;

          case error.POSITION_UNAVAILABLE:
            this.actionError =
              'Your current location is unavailable. Check GPS/location settings.';
            break;

          case error.TIMEOUT:
            this.actionError =
              'Location request timed out. Please try again.';
            break;

          default:
            this.actionError =
              'Unable to retrieve your current location.';
        }

        this.cdr.markForCheck();
      },
      {
        enableHighAccuracy: true,
        timeout: timeoutMs,
        maximumAge: 0
      }
    );
  }

  async punchIn(): Promise<void> {
    if (this.actionLoading || this.activeSession || this.isAttendanceCompletedToday || this.rejectedSession) return;
    if (this.isPunchInUnavailable) {
      this.actionError = this.punchInPolicyReady
        ? this.punchInStatusMessage
        : (this.punchInPolicyError || 'Checking your shift policy. Please try again.');
      return;
    }

    // Permission request must be a direct user gesture for Chrome to allow it.
    this.locationMonitor.requestSystemNotificationPermission();

    this.actionLoading = true;
    this.actionMessage = '';
    this.actionError = '';

    // GPS can take minutes. Verify the browser immediately before sending the attendance request.
    this.getCurrentLocation(async payload => {
      let deviceProof: string;
      try { deviceProof = await this.devicesService.punchProof(this.user?.id || ''); }
      catch (e: any) {
        this.actionLoading = false;
        this.actionError = e?.error?.message || e?.message || 'Device verification failed';
        await this.refreshAttendanceDevice();
        this.cdr.markForCheck();
        return;
      }
      const requestPayload: PunchInPayload = {
        ...payload,
        ...(this.lateReason.trim()
          ? { lateReason: this.lateReason.trim() }
          : {})
      };

      this.attendanceService.punchIn(requestPayload, deviceProof).subscribe({
        next: response => {
          this.actionLoading = false;
          this.showLateReason = false;
          this.lateReason = '';

          const approvalIsPending =
            response?.approvalStatus === 'PENDING' ||
            response?.session?.approvalStatus === 'PENDING';

          this.actionMessage = approvalIsPending
            ? 'Approval needed: your late-arrival request has been sent to Admin. You cannot start working or punch out until it is approved.'
            : response?.message || 'Punch-in successful.';

          this.refreshAttendance();
          // A prior successful punch-out stops the monitor completely.
          // Start it again for this new session, then read its live status.
          this.locationMonitor.start();
          this.locationMonitor.refreshImmediately();
          this.cdr.markForCheck();
        },
        error: error => {
          this.actionLoading = false;

          const message = Array.isArray(error.error?.message)
            ? error.error.message.join(', ')
            : error.error?.message ||
              'Unable to process punch-in.';

          if (
            error.status === 409 &&
            /reason|late arrival/i.test(message)
          ) {
            this.showLateReason = true;
            this.actionError =
              `${message} Enter your reason below, then select Submit Late Reason & Punch In.`;
          } else {
            this.actionError = message;
            if (error.status === 403 && /punch in is closed/i.test(message)) {
              this.serverConfirmedCutoff = true;
              this.punchInCutoffMessage = message;
            } else if (error.status === 403 && /shift starts at/i.test(message)) {
              this.punchInBeforeStartMessage = message;
              this.loadPunchInPolicy();
            }
          }
          this.cdr.markForCheck();
        }
      });
    });
  }

  async punchOut(): Promise<void> {
    if (
      this.actionLoading ||
      !this.isPunchOutAllowed ||
      this.pendingApproval ||
      !!this.rejectedSession
    ) return;

    this.actionLoading = true;
    this.actionMessage = '';
    this.actionError = '';

    // GPS can take minutes. Verify the browser immediately before sending the attendance request.
    this.getCurrentLocation(async payload => {
      let deviceProof: string;
      try { deviceProof = await this.devicesService.punchProof(this.user?.id || ''); }
      catch (e: any) {
        this.actionLoading = false;
        this.actionError = e?.error?.message || e?.message || 'Device verification failed';
        await this.refreshAttendanceDevice();
        this.cdr.markForCheck();
        return;
      }
      const requestPayload: PunchOutPayload = {
        latitude: payload.latitude,
        longitude: payload.longitude,
        accuracy: payload.accuracy
      };

      this.attendanceService.punchOut(requestPayload, deviceProof).subscribe({
        next: response => {
          this.actionLoading = false;
          this.actionMessage =
            response?.message || 'Punch-out successful.';

          this.refreshAttendance();
          // Stop the GPS watcher, reminder timers, and 30-second status polling.
          // The next successful Punch In will start monitoring again.
          this.locationMonitor.stop();
          this.cdr.markForCheck();
        },
        error: error => {
          this.actionLoading = false;

          this.actionError = Array.isArray(error.error?.message)
            ? error.error.message.join(', ')
            : error.error?.message ||
              'Unable to process punch-out.';

          this.cdr.markForCheck();
        }
      });
    }, 20_000); // Maximum 20 seconds for fresh Punch Out GPS acquisition.
  }

  changeView(view: 'daily' | 'monthly'): void {
    this.viewMode = view;

    if (view === 'monthly') {
      this.loadMonthlyAttendance();
    }
  }

  changeMonth(direction: number): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + direction,
      1
    );

    this.selectedDate = '';
    this.selectedDayRecords = [];

    this.loadMonthlyAttendance();
  }

  selectDate(day: CalendarDay): void {
    if (!day.date) return;

    this.selectedDate = day.dateKey;
    this.selectedDayRecords = day.records;
  }

  isToday(day: CalendarDay): boolean {
    return day.dateKey === this.formatDate(
      this.now.getFullYear(),
      this.now.getMonth(),
      this.now.getDate()
    );
  }

  applyFilters(): void {
    if (this.isAdmin) {
      this.appliedEmployeeName = this.employeeNameSearch.trim();
    }
    this.page = 1;
    this.loadAttendance();
  }

  clearFilters(): void {
    this.startDate = '';
    this.endDate = '';
    this.selectedStatus = '';
    this.employeeNameSearch = '';
    this.appliedEmployeeName = '';
    this.page = 1;
    this.loadAttendance();
  }

  changePage(nextPage: number): void {
    if (nextPage < 1 || nextPage > this.totalPages) return;

    this.page = nextPage;
    this.loadAttendance();
  }

  formatHours(minutes: number | null | undefined): string {
    if (minutes == null) return '0h 0m';

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  employeeName(record: AttendanceRecord): string {
    const employee = record.employeeProfile;

    if (!employee) return 'My Attendance';

    return `${employee.firstName || ''} ${employee.lastName || ''}`.trim()
      || 'Employee';
  }

  statusClass(status: string): string {
    switch (status) {
      case 'PRESENT':
        return 'bg-green-100 text-green-700';

      case 'LATE':
        return 'bg-yellow-100 text-yellow-700';

      case 'ABSENT':
        return 'bg-red-100 text-red-700';

      case 'HALF_DAY':
        return 'bg-orange-100 text-orange-700';

      case 'ON_LEAVE':
        return 'bg-blue-100 text-blue-700';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }

  statusDot(status: string): string {
    switch (status) {
      case 'PRESENT': return 'bg-green-500';
      case 'LATE': return 'bg-yellow-500';
      case 'ABSENT': return 'bg-red-500';
      case 'HALF_DAY': return 'bg-orange-500';
      case 'ON_LEAVE': return 'bg-blue-500';
      default: return 'bg-slate-400';
    }
  }
}
