
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

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class AttendanceComponent implements OnInit, OnDestroy {

  private attendanceService = inject(Attendance);
  private authService = inject(Auth);
  private cdr = inject(ChangeDetectorRef);

  private clockInterval: ReturnType<typeof setInterval> | null = null;

  user = this.authService.getUser();

  records: AttendanceRecord[] = [];
  monthlyRecords: AttendanceRecord[] = [];

  calendarDays: CalendarDay[] = [];
  selectedDayRecords: AttendanceRecord[] = [];

  isLoading = false;
  isMonthlyLoading = false;

  errorMessage = '';

  viewMode: 'daily' | 'monthly' = 'daily';

  page = 1;
  limit = 10;
  total = 0;
  totalPages = 0;

  startDate = '';
  endDate = '';
  selectedStatus = '';

  currentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  selectedDate = '';

  actionLoading = false;
  actionMessage = '';
  actionError = '';

  lateReason = '';
  showLateReason = false;

  locationMessage = '';

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
        !session.punchOutAt
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
    return !!this.activeSession &&
      ['NOT_REQUIRED', 'APPROVED'].includes(
        this.activeSession.approvalStatus
      );
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
    this.loadAttendance();
    this.loadMonthlyAttendance();

    this.clockInterval = setInterval(() => {
      this.now = new Date();
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
      status: this.selectedStatus || undefined
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

    request$.subscribe({
      next: response => {
        this.monthlyRecords = response.data || [];

        this.buildCalendar();

        this.isMonthlyLoading = false;
        this.cdr.markForCheck();
      },
      error: error => {
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
    this.loadAttendance();
    this.loadMonthlyAttendance();
  }

  private getCurrentLocation(
    callback: (payload: PunchInPayload) => void
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

    navigator.geolocation.getCurrentPosition(
      position => {
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
        timeout: 20000,
        maximumAge: 0
      }
    );
  }

  punchIn(): void {
    if (this.actionLoading || this.activeSession) return;

    this.actionLoading = true;
    this.actionMessage = '';
    this.actionError = '';

    this.getCurrentLocation(payload => {
      const requestPayload: PunchInPayload = {
        ...payload,
        ...(this.lateReason.trim()
          ? { lateReason: this.lateReason.trim() }
          : {})
      };

      this.attendanceService.punchIn(requestPayload).subscribe({
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
          }
          this.cdr.markForCheck();
        }
      });
    });
  }

  punchOut(): void {
    if (
      this.actionLoading ||
      !this.isPunchOutAllowed ||
      this.pendingApproval ||
      !!this.rejectedSession
    ) return;

    this.actionLoading = true;
    this.actionMessage = '';
    this.actionError = '';

    this.getCurrentLocation(payload => {
      const requestPayload: PunchOutPayload = {
        latitude: payload.latitude,
        longitude: payload.longitude,
        accuracy: payload.accuracy
      };

      this.attendanceService.punchOut(requestPayload).subscribe({
        next: response => {
          this.actionLoading = false;
          this.actionMessage =
            response?.message || 'Punch-out successful.';

          this.refreshAttendance();
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
    });
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
    this.page = 1;
    this.loadAttendance();
  }

  clearFilters(): void {
    this.startDate = '';
    this.endDate = '';
    this.selectedStatus = '';
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
