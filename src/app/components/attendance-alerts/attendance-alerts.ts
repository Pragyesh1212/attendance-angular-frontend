import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AlertItem {
  id: string;
  employeeName: string;
  employeeCode: string;
  workLocationId: string;
  workLocationName: string;
  workLocationLatitude: number;
  workLocationLongitude: number;
  exitLocationName: string | null;
  exitLatitude: number;
  exitLongitude: number;
  leftAt: string;
  returnedAt: string | null;
  status: 'OUTSIDE' | 'RETURNED';
  sessionActive: boolean;
}
interface AlertResponse {
  date: string;
  summary: { alertsToday: number; currentlyOutside: number; returnedToday: number };
  data: AlertItem[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}
interface WorkLocationsResponse {
  locations: Array<{ id: string; name: string }>;
}

@Component({
  selector: 'app-attendance-alerts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-alerts.html',
  styleUrl: './attendance-alerts.css',
})
export class AttendanceAlerts implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly baseUrl = `${environment.apiUrl}/attendance/location-alerts`;
  private readonly subscriptions = new Subscription();
  private alertsRequest: Subscription | null = null;

  date = this.todayIST();
  employeeName = '';
  status = '';
  workLocationId = '';
  page = 1;
  readonly pageSize = 20;
  loading = false;
  errorMessage = '';
  summary = { alertsToday: 0, currentlyOutside: 0, returnedToday: 0 };
  alerts: AlertItem[] = [];
  workLocations: Array<{ id: string; name: string }> = [];
  pagination = { total: 0, page: 1, limit: 20, totalPages: 0 };

  ngOnInit(): void {
    this.subscriptions.add(this.http.get<WorkLocationsResponse>(`${environment.apiUrl}/work-locations`)
      .subscribe({ next: result => {
        this.workLocations = result.locations ?? [];
        this.changeDetector.markForCheck();
      } }));
    this.loadAlerts();
    // Refresh status quietly while the Admin page is visible.
    this.subscriptions.add(interval(30_000).subscribe(() => {
      if (document.visibilityState === 'visible') this.loadAlerts(true);
    }));
  }

  ngOnDestroy(): void {
    this.alertsRequest?.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  get selectedDateIsToday(): boolean { return this.date === this.todayIST(); }

  private todayIST(): string {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(new Date());
    const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
    return `${map['year']}-${map['month']}-${map['day']}`;
  }

  loadAlerts(background = false): void {
    if (!background) this.loading = true;
    this.errorMessage = '';
    this.changeDetector.markForCheck();
    this.alertsRequest?.unsubscribe();
    let params = new HttpParams().set('date', this.date).set('page', this.page).set('limit', this.pageSize);
    if (this.employeeName.trim()) params = params.set('employeeName', this.employeeName.trim());
    if (this.status) params = params.set('status', this.status);
    if (this.workLocationId) params = params.set('workLocationId', this.workLocationId);
    this.alertsRequest = this.http.get<AlertResponse>(this.baseUrl, { params }).subscribe({
      next: response => {
        this.alerts = response.data;
        this.summary = response.summary;
        this.pagination = response.pagination;
        this.loading = false;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.loading = false;
        if (!background) this.alerts = [];
        this.errorMessage = 'Could not load attendance alerts. Please retry.';
        this.changeDetector.markForCheck();
      },
    });
  }

  applyFilters(): void { this.page = 1; this.loadAlerts(); }
  resetFilters(): void {
    this.date = this.todayIST();
    this.employeeName = '';
    this.status = '';
    this.workLocationId = '';
    this.page = 1;
    this.loadAlerts();
  }
  changePage(page: number): void {
    if (page < 1 || page > this.pagination.totalPages) return;
    this.page = page;
    this.loadAlerts();
  }
  coords(lat: number, lon: number): string { return `${lat.toFixed(4)}, ${lon.toFixed(4)}`; }
  initials(name: string): string {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  }
  trackById(_index: number, item: AlertItem): string { return item.id; }
}
