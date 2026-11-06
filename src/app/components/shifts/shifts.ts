
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import {
  ShiftService,
  Shift,
  ShiftPayload,
  ShiftStatus
} from '../../services/shift';

@Component({
  selector: 'app-shifts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shifts.html'
})
export class Shifts implements OnInit {

  private shiftService = inject(ShiftService);
  private cdr = inject(ChangeDetectorRef);

  shifts: Shift[] = [];
  filteredShifts: Shift[] = [];

  loading = false;
  saving = false;

  searchTerm = '';
  statusFilter = '';

  showModal = false;
  isEditMode = false;

  selectedShiftId: string | null = null;

  userRole = '';

  errorMessage = '';
  successMessage = '';

  formData: ShiftPayload = this.getEmptyForm();

  get canManageShifts(): boolean {
    return this.userRole === 'ADMIN';
  }

  get activeShifts(): number {
    return this.shifts.filter(
      shift => shift.status === 'ACTIVE'
    ).length;
  }

  get inactiveShifts(): number {
    return this.shifts.filter(
      shift => shift.status === 'INACTIVE'
    ).length;
  }

  get totalEmployees(): number {
    return this.shifts.reduce(
      (total, shift) => total + (shift._count?.employees || 0),
      0
    );
  }

  ngOnInit(): void {
    this.getUserRole();
    this.loadShifts();
  }

  private getEmptyForm(): ShiftPayload {
    return {
      name: '',
      startTime: '09:00',
      endTime: '18:00',
      gracePeriodMinutes: 10,
      lateReasonAfterMinutes: 15,
      approvalRequiredAfterMinutes: 30
    };
  }

  private getUserRole(): void {
    try {
      const user = JSON.parse(
        sessionStorage.getItem('user') || '{}'
      );

      this.userRole = user.role || '';
    } catch {
      this.userRole = '';
    }
  }

  loadShifts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.cdr.detectChanges();

    this.shiftService.getShifts().subscribe({

      next: (response) => {
        this.shifts = response.data || [];
        this.applyFilters();

        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.getErrorMessage(
          error,
          'Unable to load shifts.'
        );

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    const search = this.searchTerm.trim().toLowerCase();

    this.filteredShifts = this.shifts.filter(shift => {

      const matchesSearch =
        shift.name.toLowerCase().includes(search);

      const matchesStatus =
        !this.statusFilter ||
        shift.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  openCreateModal(): void {
    if (!this.canManageShifts) return;

    this.isEditMode = false;
    this.selectedShiftId = null;
    this.formData = this.getEmptyForm();

    this.errorMessage = '';
    this.showModal = true;

    this.cdr.detectChanges();
  }

  openEditModal(shift: Shift): void {
    if (!this.canManageShifts) return;

    this.isEditMode = true;
    this.selectedShiftId = shift.id;

    this.formData = {
      name: shift.name,
      startTime: shift.startTime,
      endTime: shift.endTime,
      gracePeriodMinutes: shift.gracePeriodMinutes,
      lateReasonAfterMinutes: shift.lateReasonAfterMinutes,
      approvalRequiredAfterMinutes: shift.approvalRequiredAfterMinutes
    };

    this.errorMessage = '';
    this.showModal = true;

    this.cdr.detectChanges();
  }

  closeModal(): void {
    if (this.saving) return;

    this.showModal = false;
    this.errorMessage = '';

    this.cdr.detectChanges();
  }

  saveShift(): void {
    if (!this.canManageShifts) return;

    const name = this.formData.name.trim();

    if (!name) {
      this.errorMessage = 'Shift name is required.';
      return;
    }

    if (!this.formData.startTime || !this.formData.endTime) {
      this.errorMessage = 'Start time and end time are required.';
      return;
    }

    if (this.formData.startTime === this.formData.endTime) {
      this.errorMessage = 'Start time and end time cannot be the same.';
      return;
    }

    const parseOptionalMinutes = (
      value: number | null | undefined
    ): number | null => {
      if (value === null || value === undefined || value === ('' as any)) {
        return null;
      }

      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    };

    const gracePeriod = Number(this.formData.gracePeriodMinutes ?? 10);
    const lateReason = parseOptionalMinutes(
      this.formData.lateReasonAfterMinutes
    );
    const approval = parseOptionalMinutes(
      this.formData.approvalRequiredAfterMinutes
    );

    if (!Number.isInteger(gracePeriod) || gracePeriod < 0 || gracePeriod > 1440) {
      this.errorMessage = 'Grace period must be a whole number between 0 and 1440.';
      return;
    }

    if (
      lateReason !== null &&
      (!Number.isInteger(lateReason) || lateReason < 0 || lateReason > 1440)
    ) {
      this.errorMessage = 'Late reason threshold must be a whole number between 0 and 1440.';
      return;
    }

    if (
      approval !== null &&
      (!Number.isInteger(approval) || approval < 0 || approval > 1440)
    ) {
      this.errorMessage = 'Approval threshold must be a whole number between 0 and 1440.';
      return;
    }

    if (
      lateReason !== null &&
      approval !== null &&
      approval <= lateReason
    ) {
      this.errorMessage =
        'Approval threshold must be greater than the late reason threshold.';
      return;
    }

    const payload: ShiftPayload = {
      name,
      startTime: this.formData.startTime,
      endTime: this.formData.endTime,
      gracePeriodMinutes: gracePeriod,
      lateReasonAfterMinutes: lateReason,
      approvalRequiredAfterMinutes: approval
    };

    this.saving = true;
    this.errorMessage = '';

    const request = this.isEditMode && this.selectedShiftId
      ? this.shiftService.updateShift(this.selectedShiftId, payload)
      : this.shiftService.createShift(payload);

    request.subscribe({

      next: () => {
        this.saving = false;
        this.showModal = false;

        this.successMessage = this.isEditMode
          ? 'Shift updated successfully.'
          : 'Shift created successfully.';

        this.cdr.detectChanges();
        this.loadShifts();
      },

      error: (error: HttpErrorResponse) => {
        this.saving = false;

        this.errorMessage = this.getErrorMessage(
          error,
          'Unable to save shift.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  toggleStatus(shift: Shift): void {
    if (!this.canManageShifts) return;

    const newStatus: ShiftStatus =
      shift.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

    const confirmed = window.confirm(
      `Are you sure you want to ${newStatus === 'ACTIVE' ? 'activate' : 'deactivate'} "${shift.name}"?`
    );

    if (!confirmed) return;

    this.shiftService.updateShift(
      shift.id,
      { status: newStatus }
    ).subscribe({

      next: () => {
        this.successMessage =
          `Shift ${newStatus.toLowerCase()} successfully.`;

        this.cdr.detectChanges();
        this.loadShifts();
      },

      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.getErrorMessage(
          error,
          'Unable to change shift status.'
        );

        this.cdr.detectChanges();
      }
    });
  }


  formatThreshold(value: number | null): string {
    return value === null || value === undefined
      ? 'Not configured'
      : `${value} minutes`;
  }

  private getErrorMessage(
    error: HttpErrorResponse,
    fallback: string
  ): string {

    const message = error.error?.message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    return typeof message === 'string'
      ? message
      : fallback;
  }
}
