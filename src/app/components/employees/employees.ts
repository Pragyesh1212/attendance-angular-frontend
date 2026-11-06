
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs';

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
    ReactiveFormsModule
  ],
  templateUrl: './employees.html'
})
export class Employees implements OnInit {

  private employeeService = inject(EmployeeService);
  private workLocationService = inject(WorkLocationService);
  private shiftService = inject(ShiftService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  // Data
  employees: Employee[] = [];
  departments: Department[] = [];
  workLocations: WorkLocation[] = [];
  shifts: Shift[] = [];
  selectedEmployeeShiftId: string | null = null;

  // Loading states
  loading = false;
  saving = false;
  assigningLocation = false;
  loadingShifts = false;

  // Messages
  errorMessage = '';
  successMessage = '';
  locationErrorMessage = '';

  // Filters
  searchTerm = '';
  statusFilter = '';
  departmentFilter = '';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalEmployees = 0;
  totalPages = 0;

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

    shiftId: [''],

    joiningDate: [''],

    avatarUrl: [
      '',
      Validators.pattern(/^https?:\/\/.+/i)
    ]
  });

  // ==========================================
  // INITIALIZATION
  // ==========================================

  ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployees();
    this.loadWorkLocations();
    this.loadShifts();
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
      this.departmentFilter
    )
    .pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({

      next: (response) => {

        this.employees = response.data || [];

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
      shiftId: '',
      joiningDate: '',
      avatarUrl: ''

    });
  }

  // ==========================================
  // OPEN ADD EMPLOYEE MODAL
  // ==========================================

  openAddModal(): void {

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

      shiftId:
        employee.employeeProfile.shift?.id ||
        employee.employeeProfile.shiftId ||
        '',

      joiningDate:
        employee.employeeProfile.joiningDate
          ? employee.employeeProfile.joiningDate.substring(0, 10)
          : '',

      avatarUrl:
        employee.employeeProfile.avatarUrl || ''

    });

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

    if (this.employeeForm.invalid) {
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
    const selectedShiftId = formValue.shiftId || '';

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
      avatarUrl: formValue.avatarUrl?.trim() || undefined
    };

    this.employeeService.createEmployee(payload).subscribe({
      next: (response: any) => {
        const createdEmployeeId =
          response?.data?.id ||
          response?.data?.user?.id ||
          response?.id;

        if (!selectedShiftId) {
          this.completeEmployeeSave(
            response?.message || 'Employee created successfully.'
          );
          return;
        }

        if (!createdEmployeeId) {
          this.saving = false;
          this.errorMessage =
            'Employee was created, but the employee ID was not returned. The shift could not be assigned.';
          this.cdr.detectChanges();
          this.loadEmployees();
          return;
        }

        this.employeeService.assignEmployeeShift(
          createdEmployeeId,
          selectedShiftId
        ).subscribe({
          next: (shiftResponse: any) => {
            this.completeEmployeeSave(
              `${response?.message || 'Employee created successfully.'} ${shiftResponse?.message || 'Shift assigned successfully.'}`
            );
          },
          error: (error) => {
            this.saving = false;
            this.showAddModal = false;
            this.successMessage =
              'Employee created successfully, but shift assignment failed.';
            this.errorMessage =
              error.error?.message ||
              'Employee was created, but the selected shift could not be assigned.';
            this.currentPage = 1;
            this.loadEmployees();
            this.cdr.detectChanges();
          }
        });
      },
      error: (error) => {
        this.saving = false;
        this.errorMessage =
          error.error?.message ||
          'Unable to create employee. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  private completeEmployeeSave(message: string): void {
    this.saving = false;
    this.showAddModal = false;
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
    this.successMessage = '';

    const formValue = this.employeeForm.getRawValue();
    const selectedShiftId = formValue.shiftId || '';

    const payload: UpdateEmployeePayload = {
      email: formValue.email!.trim(),
      firstName: formValue.firstName!.trim(),
      lastName: formValue.lastName!.trim(),
      phone: formValue.phone?.trim() || undefined,
      designation: formValue.designation?.trim() || undefined,
      departmentId: formValue.departmentId || undefined,
      joiningDate: formValue.joiningDate || undefined,
      avatarUrl: formValue.avatarUrl?.trim() || undefined
    };

    this.employeeService.updateEmployee(
      this.selectedEmployeeId,
      payload
    ).subscribe({
      next: (response: any) => {
        const shiftChanged =
          !!selectedShiftId &&
          selectedShiftId !== this.selectedEmployeeShiftId;

        if (!shiftChanged) {
          this.completeEmployeeSave(
            response?.message || 'Employee updated successfully.'
          );
          return;
        }

        this.employeeService.assignEmployeeShift(
          this.selectedEmployeeId!,
          selectedShiftId
        ).subscribe({
          next: (shiftResponse: any) => {
            this.completeEmployeeSave(
              `${response?.message || 'Employee updated successfully.'} ${shiftResponse?.message || 'Shift assigned successfully.'}`
            );
          },
          error: (error) => {
            this.saving = false;
            this.showAddModal = false;
            this.successMessage =
              'Employee details were updated, but shift assignment failed.';
            this.errorMessage =
              error.error?.message ||
              'Employee details were saved, but the selected shift could not be assigned.';
            this.selectedEmployeeId = null;
            this.selectedEmployeeShiftId = null;
            this.isEditMode = false;
            this.employeeForm.get('employeeCode')?.enable();
            this.loadEmployees();
            this.cdr.detectChanges();
          }
        });
      },
      error: (error) => {
        this.saving = false;
        this.errorMessage =
          error.error?.message ||
          'Unable to update employee. Please try again.';
        this.cdr.detectChanges();
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
    const shift = employee.employeeProfile.shift;
    return shift
      ? `${shift.name} (${shift.startTime} - ${shift.endTime})`
      : 'Not assigned';
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
