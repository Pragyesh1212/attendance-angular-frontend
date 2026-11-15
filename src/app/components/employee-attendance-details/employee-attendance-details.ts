import { TranslateTextPipe } from '../../shared/translate-text.pipe';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { EmployeeMonthlyService, EmployeeMonthData, EmployeeMonthDay, EmployeeDayType, EmployeeDayUpdate } from '../../services/employee-monthly';
import { FeedbackService } from '../../shared/feedback/feedback.service';
import { EmployeeService } from '../../services/employee';
import { EmployeeDeviceService, DeviceList, RegisteredDevice } from '../../services/employee-device';

type EditedDay = {
  dayType: EmployeeDayType; status: string; note: string;
  shifts: { shiftOrder: number; punchIn: string; punchOut: string; originalPunchIn: string; originalPunchOut: string; original: boolean }[];
};
@Component({
  selector: 'app-employee-attendance-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslateTextPipe],
  templateUrl: './employee-attendance-details.html',
  styleUrl: './employee-attendance-details.css',
})
export class EmployeeAttendanceDetails implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly monthly = inject(EmployeeMonthlyService);
  private readonly employees = inject(EmployeeService);
  private readonly feedback = inject(FeedbackService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly auth = inject(Auth);
  private readonly deviceService = inject(EmployeeDeviceService);
  devices: DeviceList | null = null;
  devicesLoading = false;
  devicesSaving = false;
  deviceError = '';
  deviceLabels: Record<string, string> = {};
  pendingRevokeId: string | null = null;

  async loadDevices(): Promise<void> {
    if (!this.canEdit || !this.employeeId) return;
    this.devicesLoading = true; this.deviceError = '';
    try {
      this.devices = await this.deviceService.adminDevices(this.employeeId);
      for (const d of this.devices.devices) this.deviceLabels[d.id] = d.label;
    } catch (error: any) { this.deviceError = error?.error?.message || error?.message || 'Unable to load devices'; }
    finally { this.devicesLoading = false; this.cdr.markForCheck(); }
  }

  async deviceAction(device: RegisteredDevice, action: 'approve' | 'revoke' | 'reactivate' | 'rename'): Promise<void> {
    if (!this.canEdit || this.devicesSaving) return;
    this.devicesSaving = true; this.deviceError = '';
    try {
      await this.deviceService.adminAction(device.id, action, this.deviceLabels[device.id]);
      this.pendingRevokeId = null;
      this.feedback.success(`Device ${action === 'rename' ? 'name updated' : action === 'approve' ? 'approved' : action === 'revoke' ? 'revoked' : 'reactivated'}.`);
      await this.loadDevices();
    } catch (error: any) {
      this.deviceError = error?.error?.message || error?.message || 'Could not update the device';
    } finally { this.devicesSaving = false; this.cdr.markForCheck(); }
  }

  employeeId = '';
  profileImageUrl: string | null = null;
  month = (() => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit' }).formatToParts(new Date());
    const get = (key: string) => parts.find(p => p.type === key)?.value || '';
    return `${get('year')}-${get('month')}`;
  })();
  report: EmployeeMonthData | null = null;
  loading = false;
  saving = false;
  downloading = false;
  editMode = false;
  selectedDate = '';
  readonly selectedDates = new Set<string>();
  editing: Record<string, EditedDay> = {};
  showDownload = false;
  exportFormat: 'xlsx' | 'pdf' = 'xlsx';
  filter = 'ALL';
  error = '';
  private monthRequestVersion = 0;

  get canEdit(): boolean { return this.auth.getUser()?.role === 'ADMIN'; }
  get visibleDays(): EmployeeMonthDay[] {
    return (this.report?.days || []).filter(d => this.filter === 'ALL' || (this.editMode ? this.editing[d.date]?.dayType === this.filter : d.status === this.filter));
  }
  get selectedCount(): number { return this.selectedDates.size; }
  get allVisibleSelected(): boolean {
    return this.visibleDays.length > 0 && this.visibleDays.every(day => this.selectedDates.has(day.date));
  }
  get shiftNumbers(): number[] { return Array.from({ length: this.report?.maxShift || 0 }, (_, i) => i + 1); }
  get selectedMonthText(): string {
    return new Date(`${this.month}-01T12:00:00Z`).toLocaleDateString('en-IN', { timeZone: 'UTC', year: 'numeric', month: 'long' });
  }
  ngOnDestroy(): void { this.clearImage(); }
  private clearImage(): void {
    if (this.profileImageUrl) URL.revokeObjectURL(this.profileImageUrl);
    this.profileImageUrl = null;
  }
  private loadAvatar(hasAvatar: boolean): void {
    this.clearImage();
    if (!hasAvatar) return;
    this.employees.getEmployeeAvatar(this.employeeId).subscribe({
      next: blob => { this.clearImage(); this.profileImageUrl = URL.createObjectURL(blob); this.cdr.markForCheck(); },
      error: () => { /* Keep initials when a private image isn't available. */ },
    });
  }
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    if (this.employeeId) { this.load(); void this.loadDevices(); }
  }
  onMonthChange(value: string): void {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return;
    if (value === this.month && this.report?.month === value) return;
    this.month = value;
    this.filter = 'ALL';
    this.load();
  }
  load(keepEditing = false): void {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(this.month)) return;
    const requestedMonth = this.month;
    const requestVersion = ++this.monthRequestVersion;
    this.loading = true; this.error = ''; this.editMode = false; this.editing = {};
    this.selectedDate = ''; this.selectedDates.clear();
    this.monthly.getMonth(this.employeeId, requestedMonth).subscribe({
      next: report => {
        // Ignore responses from earlier month selections.
        if (requestVersion !== this.monthRequestVersion || requestedMonth !== this.month) return;
        this.loading = false;
        if (report.month !== requestedMonth) {
          this.error = 'The server returned attendance for a different month. Please try again.';
          this.cdr.markForCheck();
          return;
        }
        this.report = report;
        if (keepEditing && this.canEdit) { this.copyEdits(); this.editMode = true; }
        this.loadAvatar(report.employee.hasAvatar);
        this.cdr.markForCheck();
      },
      error: e => {
        if (requestVersion !== this.monthRequestVersion || requestedMonth !== this.month) return;
        this.loading = false; this.report = null;
        this.error = e?.error?.message || 'Unable to load this employee attendance.';
        this.cdr.markForCheck();
      },
    });
  }
  getTimes(day: EmployeeMonthDay, order: number) {
    return day.sessions.find(s => s.shiftOrder === order);
  }
  showTime(day: EmployeeMonthDay, order: number, key: 'punchIn' | 'punchOut') {
    return this.getTimes(day, order)?.[key] || '—';
  }
  private copyEdits(): void {
    this.editing = {};
    for (const day of this.report?.days || []) {
      const statuses = ['PRESENT', 'LATE', 'HALF_DAY', 'ABSENT', 'ON_LEAVE'];
      this.editing[day.date] = {
        dayType: day.dayType, status: statuses.includes(day.status) ? day.status : (day.dayType === 'WORKDAY' ? day.status : 'NO_RECORD'),
        note: day.note || '',
        shifts: this.shiftNumbers.map(order => {
          const session = this.getTimes(day, order);
          return { shiftOrder: order, punchIn: session?.punchIn || '', punchOut: session?.punchOut || '',
            originalPunchIn: session?.punchIn || '', originalPunchOut: session?.punchOut || '', original: !!session };
        }),
      };
    }
  }
  startEditing(): void { if (!this.canEdit || !this.report) return; this.filter = 'ALL'; this.selectedDates.clear(); this.copyEdits(); this.editMode = true; }
  cancelEditing(): void { this.editMode = false; this.editing = {}; this.selectedDate = ''; this.selectedDates.clear(); }
  selectDate(date: string): void { this.selectedDate = date; }
  updateDayType(date: string, value: EmployeeDayType): void {
    if (!this.editing[date]) return;
    this.editing[date].dayType = value;
  }
  addAttendanceEntry(): void {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const get = (field: string) => parts.find(p => p.type === field)?.value || '';
    const today = `${get('year')}-${get('month')}-${get('day')}`;
    const day = this.report?.days.find(d => d.dayType === 'WORKDAY' && !d.sessions.length && d.date <= today);
    if (!day) { this.feedback.error('No empty past or current workday found. Select a date to edit.'); return; }
    this.selectedDate = day.date;
    this.feedback.success(`Selected ${day.date}. Enter shift Punch In/Out, then save this day.`);
  }
  toggleDate(date: string, checked: boolean): void {
    if (!this.editMode || this.saving) return;
    if (checked) this.selectedDates.add(date);
    else this.selectedDates.delete(date);
  }
  toggleAllVisible(checked: boolean): void {
    if (!this.editMode || this.saving) return;
    for (const day of this.visibleDays) this.toggleDate(day.date, checked);
  }
  clearBulkSelection(): void { this.selectedDates.clear(); }

  // Bulk day-type changes are independent of shift-time edits. Avoid discarding unfinished row edits.
  private hasUnsavedRowEdits(): boolean {
    return (this.report?.days ?? []).some(day => {
      const edit = this.editing[day.date];
      if (!edit) return false;
      const validStatuses = ['PRESENT', 'LATE', 'HALF_DAY', 'ABSENT', 'ON_LEAVE'];
      const originalStatus = validStatuses.includes(day.status)
        ? day.status : day.dayType === 'WORKDAY' ? day.status : 'NO_RECORD';
      return edit.dayType !== day.dayType || edit.status !== originalStatus ||
        edit.note !== (day.note || '') || edit.shifts.some(shift =>
          shift.punchIn !== shift.originalPunchIn || shift.punchOut !== shift.originalPunchOut);
    });
  }
  markSelected(type: EmployeeDayType): void {
    if (!this.canEdit || this.saving || this.loading || !this.report || this.report.month !== this.month) return;
    const dates = Array.from(this.selectedDates).sort();
    if (!dates.length) {
      this.feedback.error('Select one or more dates using the checkboxes first.');
      return;
    }
    if (this.hasUnsavedRowEdits()) {
      this.feedback.error('Save or cancel individual row changes before applying a bulk day type.');
      return;
    }
    this.saving = true;
    this.monthly.bulkSetDayType(this.employeeId, dates, type).subscribe({
      next: result => {
        this.saving = false;
        this.feedback.success(`${result.affectedCount} date(s) marked as ${type === 'WORKDAY' ? 'Workday' : type === 'WEEKEND' ? 'Weekend' : 'Holiday'}.`);
        this.load(true);
      },
      error: error => {
        this.saving = false;
        this.feedback.error(error?.error?.message || 'Unable to update the selected dates. No dates were changed.');
        this.cdr.markForCheck();
      },
    });
  }
  saveDay(day: EmployeeMonthDay): void {
    const edit = this.editing[day.date];
    if (!edit || !this.canEdit || this.saving) return;
    const payload: EmployeeDayUpdate = { dayType: edit.dayType, note: edit.note };
    if (edit.dayType === 'WORKDAY') {
      if (edit.status !== day.status && edit.status !== 'NO_RECORD' && edit.status !== 'UPCOMING') {
        payload.status = edit.status as EmployeeDayUpdate['status'];
      }
      if (!day.attendanceRecordId && edit.shifts.some(s => !!s.punchIn)) payload.status =
        (edit.status === 'NO_RECORD' || edit.status === 'UPCOMING' ? 'PRESENT' : edit.status) as EmployeeDayUpdate['status'];
      payload.sessions = edit.shifts.filter(s => s.punchIn !== s.originalPunchIn || s.punchOut !== s.originalPunchOut).map(s => ({
        shiftOrder: s.shiftOrder, punchIn: s.punchIn || null, punchOut: s.punchOut || null,
      }));
    }
    this.saving = true;
    this.monthly.saveDay(this.employeeId, day.date, payload).subscribe({
      next: () => { this.saving = false; this.feedback.success(`Attendance saved for ${day.date}.`); this.load(); },
      error: e => { this.saving = false;
        this.feedback.error(e?.error?.message || 'Unable to save attendance for this date.'); this.cdr.markForCheck(); },
    });
  }
  saveSelected(): void {
    if (!this.selectedDate || !this.report) { this.feedback.error('Select a date to save.'); return; }
    const day = this.report.days.find(d => d.date === this.selectedDate);
    if (day) this.saveDay(day);
  }
  openDownload(): void { this.showDownload = true; this.exportFormat = 'xlsx'; }
  download(): void {
    if (!this.report || this.report.month !== this.month || this.loading || this.downloading) return;
    this.downloading = true;
    this.monthly.download(this.employeeId, this.month, this.exportFormat).subscribe({
      next: blob => {
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a'); link.href = objectUrl;
        const name = this.report!.employee.name.replace(/[^a-z0-9-]/gi, '_');
        link.download = `AttendEase_${name}_${this.month}.${this.exportFormat}`;
        link.click(); URL.revokeObjectURL(objectUrl);
        this.downloading = false; this.showDownload = false; this.cdr.markForCheck();
      },
      error: e => { this.downloading = false; this.feedback.error(e?.error?.message || 'Report download failed.'); this.cdr.markForCheck(); },
    });
  }
}
