import { TranslateTextPipe } from '../../shared/translate-text.pipe';
import { FeedbackService } from '../../shared/feedback/feedback.service';
import { RouterLink } from '@angular/router';

import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs';
import { Auth } from '../../services/auth';
import { OrganizationService, Organization } from '../../services/organization';

import {
  EmployeeService,
  Employee,
  Department,
  EmployeeStatus,
  CreateEmployeePayload,
  UpdateEmployeePayload
} from '../../services/employee';

import {
  WorkLocationService,
  WorkLocation
} from '../../services/work-location';

import {
  ShiftService,
  Shift
} from '../../services/shift';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink, TranslateTextPipe],
  templateUrl: './employees.html'
})
export class Employees implements OnInit, OnDestroy {
  private readonly uiFeedback = inject(FeedbackService);

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get errorMessage(): string { return ''; }
  set errorMessage(value: string) {
    if (value) this.uiFeedback.error(value);
  }

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get successMessage(): string { return ''; }
  set successMessage(value: string) {
    if (value) this.uiFeedback.success(value);
  }


  private employeeService = inject(EmployeeService);
  private workLocationService = inject(WorkLocationService);
  private shiftService = inject(ShiftService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(Auth);
  private organizationService = inject(OrganizationService);

  // Data
  employees: Employee[] = [];
  departments: Department[] = [];
  organizations: Organization[] = [];
  loadingOrganizations = false;
  workLocations: WorkLocation[] = [];
  shifts: Shift[] = [];
  selectedEmployeeShiftId: string | null = null;
  shiftSelections: string[] = [''];
  private originalShiftSelections: string[] = [];
  selectedAvatarFile: File | null = null;
  avatarPreview: string | null = null;
  private displayedAvatars = new Set<string>();

  // Loading states
  loading = false;
  saving = false;
  assigningLocation = false;
  loadingShifts = false;

  // Messages
  
  
  locationErrorMessage = '';

  // Filters
  searchTerm = '';
  statusFilter = '';
  departmentFilter = '';
  organizationFilter = '';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalEmployees = 0;
  totalPages = 0;

  // Admin-only custom employee deactivation dialog
  showDeleteModal = false;
  employeeToDelete: Employee | null = null;
  deletingEmployee = false;
  deleteErrorMessage = '';

  // The existing confirmation dialog handles both deactivation and reactivation.
  get isReactivatingEmployee(): boolean {
    return this.employeeToDelete?.status === 'INACTIVE';
  }

  // Employee modal
  showAddModal = false;
  isEditMode = false;
  selectedEmployeeId: string | null = null;

  // Work location modal
  showLocationModal = false;
  selectedEmployeeForLocation: Employee | null = null;

  locationAssignmentType: 'PERMANENT' | 'TEMPORARY' = 'PERMANENT';

  selectedWorkLocationId = '';
  temporaryStartAt = '';
  temporaryEndAt = '';
  temporaryReason = '';

  // Employee form
  employeeForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(128)
      ]
    ],

    employeeCode: [
      '',
      [
        Validators.required,
        Validators.maxLength(50)
      ]
    ],

    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    lastName: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    phone: ['', Validators.maxLength(20)],

    designation: ['', Validators.maxLength(100)],

    departmentId: [''],

    numberOfShifts: [1, [Validators.required, Validators.min(1), Validators.max(24), Validators.pattern(/^\d+$/)]],

    joiningDate: [''],


  });

  // ==========================================
  // INITIALIZATION
  // ==========================================

  get isSuperAdmin(): boolean {
    return this.authService.getUser()?.role === 'SUPER_ADMIN';
  }

  ngOnDestroy(): void {
    this.clearAvatarPreview();
    this.releaseDisplayedAvatars();
  }

  syncShiftCount(): void {
    const count = Number(this.employeeForm.controls.numberOfShifts.value);
    if (!Number.isInteger(count) || count < 1 || count > 24) return;
    this.shiftSelections = Array.from({ length: count }, (_, index) => this.shiftSelections[index] || '');
  }

  trackByShiftIndex(index: number): number { return index; }

  selectShift(index: number, value: string): void {
    this.shiftSelections[index] = value;
  }

  private clearAvatarPreview(): void {
    if (this.avatarPreview) URL.revokeObjectURL(this.avatarPreview);
    this.avatarPreview = null;
    this.selectedAvatarFile = null;
  }

  onAvatarChosen(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 1024 * 1024) {
      this.errorMessage = 'Choose a JPEG, PNG or WebP image no larger than 1 MB.';
      input.value = '';
      return;
    }
    this.clearAvatarPreview();
    this.selectedAvatarFile = file;
    this.avatarPreview = URL.createObjectURL(file);
  }

  private releaseDisplayedAvatars(): void {
    this.displayedAvatars.forEach(url => URL.revokeObjectURL(url));
    this.displayedAvatars.clear();
  }

  private hydrateAvatars(employees: Employee[]): void {
    for (const employee of employees) {
      // New photos live in private S3: keep the permanent stored URL in the API,
      // but never request that private URL directly from <img> (would return 403).
      // The existing authenticated NestJS endpoint supplies the visible blob.
      // Older external image URLs remain untouched for backward compatibility.
      const storedUrl = employee.employeeProfile.avatarUrl;
      if (!employee.employeeProfile.avatar && !storedUrl) continue;
      if (storedUrl && /^https:\/\/[^/]+\.s3\.[^/]+\.amazonaws\.com\/employee-avatars\//i.test(storedUrl)) {
        employee.employeeProfile.avatarUrl = undefined;
      }
      this.employeeService.getEmployeeAvatar(employee.id).subscribe({
        next: blob => {
          // Ignore stale page results after filtering or navigating pages.
          if (!this.employees.includes(employee)) return;
          const url = URL.createObjectURL(blob);
          this.displayedAvatars.add(url);
          employee.employeeProfile.avatarUrl = url;
          this.cdr.detectChanges();
        },
        error: () => { /* Keep initials when the image is unavailable. */ }
      });
    }
  }

  private validateSelectedShifts(): boolean {
    if (this.shiftSelections.some(id => !id) ||
        new Set(this.shiftSelections).size !== this.shiftSelections.length ||
        this.shiftSelections.length !== Number(this.employeeForm.controls.numberOfShifts.value)) {
      this.errorMessage = 'Select a different shift in every dropdown.';
      return false;
    }
    const selected = this.shiftSelections.map(id => this.shifts.find(shift => shift.id === id));
    if (selected.some(shift => !shift)) {
      this.errorMessage = 'One of the selected shifts is no longer available.';
      return false;
    }
    for (let i = 0; i < selected.length; i++) {
      const shift = selected[i]!;
      if (selected.length > 1 && shift.endTime <= shift.startTime) {
        this.errorMessage = 'Overnight shifts are not supported for multiple attendance sessions yet.';
        return false;
      }
      if (i && shift.startTime < selected[i - 1]!.endTime) {
        this.errorMessage = 'Choose shifts in time order without overlapping time ranges.';
        return false;
      }
    }
    return true;
  }

  ngOnInit(): void {
    if (this.isSuperAdmin) {
      this.loadOrganizations();
    } else {
      this.loadDepartments();
      this.loadWorkLocations();
      this.loadShifts();
    }
    this.loadEmployees();
  }

  loadOrganizations(): void {
    this.loadingOrganizations = true;
    this.organizationService.getOrganizations()
      .pipe(finalize(() => {
        this.loadingOrganizations = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (response) => {
          this.organizations = response?.data || [];
        },
        error: (error) => {
          console.error('Failed to load organizations:', error);
          this.organizations = [];
        }
      });
  }

  // ==========================================
  // LOAD DEPARTMENTS
  // ==========================================

  loadDepartments(): void {
    this.employeeService.getDepartments().subscribe({
      next: (response: any) => {

        this.departments = Array.isArray(response)
          ? response
          : response?.data ||
            response?.departments ||
            [];

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Failed to load departments:', error);
      }
    });
  }

  // ==========================================
  // LOAD ACTIVE SHIFTS
  // ==========================================

  loadShifts(): void {
    this.loadingShifts = true;

    this.shiftService.getShifts()
      .pipe(
        finalize(() => {
          this.loadingShifts = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.shifts = (response?.data || []).filter(
            (shift: Shift) => shift.status === 'ACTIVE'
          );
        },
        error: (error) => {
          console.error('Failed to load shifts:', error);
          this.shifts = [];
        }
      });
  }

  // ==========================================
  // LOAD EMPLOYEES
  // ==========================================

  loadEmployees(): void {

    this.loading = true;
    this.errorMessage = '';

    this.employeeService.getEmployees(
      this.currentPage,
      this.pageSize,
      this.searchTerm,
      this.statusFilter,
      this.isSuperAdmin ? '' : this.departmentFilter,
      this.isSuperAdmin ? this.organizationFilter : ''
    )
    .pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({

      next: (response) => {

        this.releaseDisplayedAvatars();
        this.employees = response.data || [];
        this.hydrateAvatars(this.employees);

        this.totalEmployees =
          response.pagination?.total || 0;

        this.totalPages =
          response.pagination?.totalPages || 0;

        this.currentPage =
          response.pagination?.page || this.currentPage;

      },

      error: (error) => {

        console.error('Failed to load employees:', error);

        this.errorMessage =
          error.error?.message ||
          'Unable to load employees. Please try again.';
      }

    });
  }

  // ==========================================
  // FILTERS
  // ==========================================

  applyFilters(): void {

    this.currentPage = 1;

    this.loadEmployees();
  }

  resetFilters(): void {

    this.searchTerm = '';
    this.statusFilter = '';
    this.departmentFilter = '';
    this.organizationFilter = '';

    this.currentPage = 1;

    this.loadEmployees();
  }

  // ==========================================
  // PAGINATION
  // ==========================================

  changePage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.currentPage = page;

    this.loadEmployees();
  }

  // ==========================================
  // WORK LOCATIONS
  // ==========================================

  loadWorkLocations(): void {

    this.workLocationService.getAll().subscribe({

      next: (response: any) => {

        const locations = Array.isArray(response)
          ? response
          : response?.data ||
            response?.workLocations ||
            response?.locations ||
            [];

        this.workLocations = locations.filter(
          (location: WorkLocation) =>
            location.status === 'ACTIVE'
        );

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(
          'Work locations loading failed:',
          error
        );
      }

    });
  }

  openLocationModal(employee: Employee): void {

    if (this.isSuperAdmin) return;

    this.selectedEmployeeForLocation = employee;

    this.locationAssignmentType = 'PERMANENT';

    this.selectedWorkLocationId = '';

    this.temporaryStartAt = '';
    this.temporaryEndAt = '';
    this.temporaryReason = '';

    this.locationErrorMessage = '';

    this.showLocationModal = true;

    // Refresh locations before displaying the dropdown.
    this.loadWorkLocations();
  }

  closeLocationModal(): void {

    if (this.assigningLocation) {
      return;
    }

    this.showLocationModal = false;

    this.selectedEmployeeForLocation = null;

    this.locationErrorMessage = '';
  }

  assignWorkLocation(): void {

    this.locationErrorMessage = '';

    if (!this.selectedEmployeeForLocation) {

      this.locationErrorMessage =
        'Please select an employee.';

      return;
    }

    if (!this.selectedWorkLocationId) {

      this.locationErrorMessage =
        'Please select a work location.';

      return;
    }

    const employeeProfileId =
      this.selectedEmployeeForLocation.employeeProfile.id;

    // Validate temporary assignment.
    if (this.locationAssignmentType === 'TEMPORARY') {

      if (!this.temporaryStartAt || !this.temporaryEndAt) {

        this.locationErrorMessage =
          'Select both start and end date/time.';

        return;
      }

      const start = new Date(this.temporaryStartAt);
      const end = new Date(this.temporaryEndAt);

      if (
        Number.isNaN(start.getTime()) ||
        Number.isNaN(end.getTime()) ||
        end <= start
      ) {

        this.locationErrorMessage =
          'End date/time must be later than start date/time.';

        return;
      }
    }

    this.assigningLocation = true;

    // Permanent assignment.
    const request$ =
      this.locationAssignmentType === 'PERMANENT'

        ? this.workLocationService.assignPermanent(
            employeeProfileId,
            this.selectedWorkLocationId
          )

        // Temporary assignment.
        : this.workLocationService.assignTemporary(
            employeeProfileId,
            {
              workLocationId: this.selectedWorkLocationId,

              startAt: new Date(
                this.temporaryStartAt
              ).toISOString(),

              endAt: new Date(
                this.temporaryEndAt
              ).toISOString(),

              reason:
                this.temporaryReason.trim() || undefined
            }
          );

    request$
      .pipe(
        finalize(() => {

          this.assigningLocation = false;

          this.cdr.detectChanges();
        })
      )
      .subscribe({

        next: (response: any) => {

          this.showLocationModal = false;

          this.selectedEmployeeForLocation = null;

          this.successMessage =
            response?.message ||
            'Work location assigned successfully.';

          this.loadEmployees();
        },

        error: (error) => {

          this.locationErrorMessage =
            error.error?.message ||
            'Unable to assign work location. Please try again.';
        }

      });
  }

  // ==========================================
  // EMPLOYEE FORM RESET
  // ==========================================

  private resetEmployeeForm(): void {

    this.employeeForm.reset({

      email: '',
      password: '',
      employeeCode: '',
      firstName: '',
      lastName: '',
      phone: '',
      designation: '',
      departmentId: '',
      numberOfShifts: 1,
      joiningDate: ''

    });
    this.shiftSelections = [''];
    this.originalShiftSelections = [];
    this.clearAvatarPreview();
  }

  // ==========================================
  // OPEN ADD EMPLOYEE MODAL
  // ==========================================

  openAddModal(): void {

    if (this.isSuperAdmin) return;

    this.isEditMode = false;

    this.selectedEmployeeId = null;
    this.selectedEmployeeShiftId = null;

    this.resetEmployeeForm();

    this.employeeForm.get('password')?.setValidators([

      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(128)

    ]);

    this.employeeForm
      .get('password')
      ?.updateValueAndValidity();

    this.employeeForm.get('employeeCode')?.enable();

    this.errorMessage = '';

    this.showAddModal = true;
  }

  // ==========================================
  // OPEN EDIT EMPLOYEE MODAL
  // ==========================================

  openEditModal(employee: Employee): void {

    if (this.isSuperAdmin) return;

    this.isEditMode = true;

    this.selectedEmployeeId = employee.id;
    this.selectedEmployeeShiftId =
      employee.employeeProfile.shift?.id ||
      employee.employeeProfile.shiftId ||
      null;

    this.errorMessage = '';

    this.employeeForm.patchValue({

      email: employee.email || '',

      password: '',

      employeeCode:
        employee.employeeProfile.employeeCode || '',

      firstName:
        employee.employeeProfile.firstName || '',

      lastName:
        employee.employeeProfile.lastName || '',

      phone:
        employee.employeeProfile.phone || '',

      designation:
        employee.employeeProfile.designation || '',

      departmentId:
        employee.employeeProfile.department?.id || '',

      numberOfShifts: employee.employeeProfile.shiftAssignments?.length || 1,

      joiningDate:
        employee.employeeProfile.joiningDate
          ? employee.employeeProfile.joiningDate.substring(0, 10)
          : '',


    });

    this.clearAvatarPreview();
    this.shiftSelections = employee.employeeProfile.shiftAssignments?.length
      ? employee.employeeProfile.shiftAssignments.map(a => a.shift.id)
      : [employee.employeeProfile.shift?.id || employee.employeeProfile.shiftId || ''];
    this.originalShiftSelections = [...this.shiftSelections];

    // Current backend update DTO does not support password
    // or employeeCode updates.
    this.employeeForm.get('password')?.clearValidators();

    this.employeeForm
      .get('password')
      ?.updateValueAndValidity();

    this.employeeForm.get('employeeCode')?.disable();

    this.showAddModal = true;
  }

  // ==========================================
  // CLOSE EMPLOYEE MODAL
  // ==========================================

  closeAddModal(): void {

    if (this.saving) {
      return;
    }

    this.showAddModal = false;
    this.clearAvatarPreview();

    this.selectedEmployeeId = null;
    this.selectedEmployeeShiftId = null;

    this.isEditMode = false;

    this.employeeForm.get('employeeCode')?.enable();
  }

  // ==========================================
  // FORM CONTROLS
  // ==========================================

  get f() {
    return this.employeeForm.controls;
  }

  // ==========================================
  // SAVE EMPLOYEE
  // ==========================================

  saveEmployee(): void {

    this.employeeForm.markAllAsTouched();

    if (this.employeeForm.invalid || !this.validateSelectedShifts()) {
      return;
    }

    if (this.isEditMode) {

      this.updateExistingEmployee();

      return;
    }

    this.createNewEmployee();
  }

  // ==========================================
  // CREATE EMPLOYEE
  // ==========================================

  private createNewEmployee(): void {
    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';
    const formValue = this.employeeForm.getRawValue();
    const payload: CreateEmployeePayload = {
      email: formValue.email!.trim(),
      password: formValue.password!,
      employeeCode: formValue.employeeCode!.trim(),
      firstName: formValue.firstName!.trim(),
      lastName: formValue.lastName!.trim(),
      phone: formValue.phone?.trim() || undefined,
      designation: formValue.designation?.trim() || undefined,
      departmentId: formValue.departmentId || undefined,
      joiningDate: formValue.joiningDate || undefined,
      shiftIds: [...this.shiftSelections],
    };
    this.employeeService.createEmployee(payload).subscribe({
      next: response => {
        const id = response?.employee?.id;
        if (this.selectedAvatarFile && id) {
          this.employeeService.uploadEmployeeAvatar(id, this.selectedAvatarFile).subscribe({
            next: () => this.completeEmployeeSave('Employee, shifts and photo saved successfully.'),
            error: (error) => this.completeEmployeeSave(
              `Employee and shifts saved, but the photo upload failed: ${error.error?.message || 'You can retry it from Edit Employee.'}`),
          });
        } else {
          this.completeEmployeeSave(response?.message || 'Employee created with assigned shifts.');
        }
      },
      error: (error) => {
        this.saving = false;
        this.errorMessage = error.error?.message || 'Unable to create employee.';
        this.cdr.detectChanges();
      },
    });
  }

  private completeEmployeeSave(message: string): void {
    this.saving = false;
    this.showAddModal = false;
    this.clearAvatarPreview();
    this.selectedEmployeeId = null;
    this.selectedEmployeeShiftId = null;
    this.isEditMode = false;
    this.employeeForm.get('employeeCode')?.enable();
    this.successMessage = message;
    this.currentPage = 1;
    this.loadEmployees();
    this.cdr.detectChanges();
  }

  // ==========================================
  // UPDATE EMPLOYEE
  // ==========================================

  private updateExistingEmployee(): void {
    if (!this.selectedEmployeeId) {
      this.errorMessage = 'No employee selected for editing.';
      return;
    }
    this.saving = true;
    this.errorMessage = '';
    const formValue = this.employeeForm.getRawValue();
    const payload: UpdateEmployeePayload = {
      email: formValue.email!.trim(),
      firstName: formValue.firstName!.trim(),
      lastName: formValue.lastName!.trim(),
      phone: formValue.phone?.trim() || undefined,
      designation: formValue.designation?.trim() || undefined,
      departmentId: formValue.departmentId || undefined,
      joiningDate: formValue.joiningDate || undefined,
      ...(JSON.stringify(this.shiftSelections) === JSON.stringify(this.originalShiftSelections)
        ? {} : { shiftIds: [...this.shiftSelections] }),
    };
    this.employeeService.updateEmployee(this.selectedEmployeeId, payload).subscribe({
      next: response => {
        if (this.selectedAvatarFile && this.selectedEmployeeId) {
          this.employeeService.uploadEmployeeAvatar(this.selectedEmployeeId, this.selectedAvatarFile).subscribe({
            next: () => this.completeEmployeeSave('Employee, shifts and profile image updated successfully.'),
            error: (error) => this.completeEmployeeSave(
              `Employee and shifts updated, but the photo upload failed: ${error.error?.message || 'Please retry.'}`),
          });
        } else {
          this.completeEmployeeSave(response?.message || 'Employee updated successfully.');
        }
      },
      error: (error) => {
        this.saving = false;
        this.errorMessage = error.error?.message || 'Unable to update employee.';
        this.cdr.detectChanges();
      },
    });
  }

  // ==========================================
  // DEACTIVATE / REACTIVATE EMPLOYEE (ADMIN ONLY)
  // ==========================================

  // Keep the existing method names to avoid changing other callers or features.
  openDeleteModal(employee: Employee): void {
    if (this.isSuperAdmin || this.deletingEmployee) return;
    this.employeeToDelete = employee;
    this.deleteErrorMessage = '';
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    if (this.deletingEmployee) return;
    this.showDeleteModal = false;
    this.employeeToDelete = null;
    this.deleteErrorMessage = '';
  }

  confirmDeleteEmployee(): void {
    if (this.isSuperAdmin || this.deletingEmployee || !this.employeeToDelete) return;

    const employeeId = this.employeeToDelete.id;
    const reactivating = this.employeeToDelete.status === 'INACTIVE';
    this.deletingEmployee = true;
    this.deleteErrorMessage = '';

    const request$ = reactivating
      ? this.employeeService.reactivateEmployee(employeeId)
      : this.employeeService.deactivateEmployee(employeeId);

    request$
      .pipe(finalize(() => {
        this.deletingEmployee = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (response: any) => {
          this.showDeleteModal = false;
          this.employeeToDelete = null;
          this.successMessage = response?.message || (reactivating
            ? 'Employee reactivated successfully.'
            : 'Employee deactivated successfully.');

          // Move back only when the active status filter excludes this employee.
          const filteredOut = reactivating
            ? this.statusFilter === 'INACTIVE'
            : this.statusFilter === 'ACTIVE';
          if (filteredOut && this.employees.length === 1 && this.currentPage > 1) {
            this.currentPage--;
          }
          this.loadEmployees();
        },
        error: (error) => {
          this.deleteErrorMessage = error.error?.message || (reactivating
            ? 'Unable to reactivate employee. Please try again.'
            : 'Unable to deactivate employee. Please try again.');
        }
      });
  }

  // ==========================================
  // EMPLOYEE DISPLAY HELPERS
  // ==========================================

  getFullName(employee: Employee): string {

    return `${employee.employeeProfile.firstName} ${employee.employeeProfile.lastName}`;
  }

  getInitials(employee: Employee): string {

    const first =
      employee.employeeProfile.firstName?.charAt(0) || '';

    const last =
      employee.employeeProfile.lastName?.charAt(0) || '';

    return (first + last).toUpperCase();
  }

  getDepartmentName(employee: Employee): string {

    return employee.employeeProfile.department?.name ||
      'Not assigned';
  }

  getShiftName(employee: Employee): string {
    const assignments = employee.employeeProfile.shiftAssignments;
    if (assignments?.length) {
      return assignments.map(a => `Shift ${a.sequence}: ${a.shift.name} (${a.shift.startTime} - ${a.shift.endTime})`).join(' • ');
    }
    const shift = employee.employeeProfile.shift;
    return shift ? `${shift.name} (${shift.startTime} - ${shift.endTime})` : 'Not assigned';
  }

  getStatusClass(status: EmployeeStatus): string {

    return status === 'ACTIVE'
      ? 'active'
      : 'inactive';
  }

  getEffectiveWorkLocation(employee: Employee) {
    const profile = employee.employeeProfile;
    const temporary = profile.temporaryLocationAssignments?.[0];

    if (temporary?.workLocation) {
      return {
        location: temporary.workLocation,
        assignmentType: 'TEMPORARY' as const,
        startAt: temporary.startAt,
        endAt: temporary.endAt,
      };
    }

    if (profile.workLocation?.status === 'ACTIVE') {
      return {
        location: profile.workLocation,
        assignmentType: 'PERMANENT' as const,
        startAt: null,
        endAt: null,
      };
    }

    return null;
  }

}
