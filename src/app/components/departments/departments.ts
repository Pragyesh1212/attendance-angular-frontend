
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
  DepartmentService,
  Department,
  DepartmentPayload
} from '../../services/department';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments.html'
})
export class Departments implements OnInit {

  private departmentService = inject(DepartmentService);
  private cdr = inject(ChangeDetectorRef);

  departments: Department[] = [];
  filteredDepartments: Department[] = [];

  loading = false;
  saving = false;

  searchTerm = '';

  showModal = false;
  isEditMode = false;

  selectedDepartmentId: string | null = null;

  formData: DepartmentPayload = {
    name: '',
    description: ''
  };

  errorMessage = '';
  successMessage = '';

  userRole = '';

  get canManage(): boolean {
    return this.userRole === 'ADMIN';
  }

  get totalEmployees(): number {
    return this.departments.reduce(
      (total, department) =>
        total + (department._count?.employees || 0),
      0
    );
  }

  ngOnInit(): void {
    this.getUserRole();
    this.loadDepartments();
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

  loadDepartments(): void {
    this.loading = true;
    this.errorMessage = '';

    this.cdr.detectChanges();

    this.departmentService.getDepartments().subscribe({

      next: (response) => {
        this.departments = response.data || [];
        this.applySearch();

        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error: HttpErrorResponse) => {
        console.error('Department API error:', error);

        this.errorMessage = this.getErrorMessage(
          error,
          'Unable to load departments.'
        );

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applySearch(): void {
    const search = this.searchTerm.trim().toLowerCase();

    this.filteredDepartments = this.departments.filter(
      department =>
        department.name.toLowerCase().includes(search) ||
        (department.description || '').toLowerCase().includes(search)
    );
  }

  openCreateModal(): void {
    if (!this.canManage) return;

    this.isEditMode = false;
    this.selectedDepartmentId = null;

    this.formData = {
      name: '',
      description: ''
    };

    this.errorMessage = '';
    this.successMessage = '';
    this.showModal = true;

    this.cdr.detectChanges();
  }

  openEditModal(department: Department): void {
    if (!this.canManage) return;

    this.isEditMode = true;
    this.selectedDepartmentId = department.id;

    this.formData = {
      name: department.name,
      description: department.description || ''
    };

    this.errorMessage = '';
    this.successMessage = '';
    this.showModal = true;

    this.cdr.detectChanges();
  }

  closeModal(): void {
    if (this.saving) return;

    this.showModal = false;
    this.errorMessage = '';

    this.cdr.detectChanges();
  }

  saveDepartment(): void {
    if (!this.canManage) return;

    const name = this.formData.name?.trim();

    if (!name) {
      this.errorMessage = 'Department name is required.';
      return;
    }

    const payload: DepartmentPayload = {
      name,
      description: this.formData.description?.trim() || ''
    };

    this.saving = true;
    this.errorMessage = '';

    this.cdr.detectChanges();

    const request = this.isEditMode && this.selectedDepartmentId
      ? this.departmentService.updateDepartment(
          this.selectedDepartmentId,
          payload
        )
      : this.departmentService.createDepartment(payload);

    request.subscribe({

      next: (response) => {
        console.log('Department saved:', response);

        this.saving = false;
        this.showModal = false;

        this.successMessage = this.isEditMode
          ? 'Department updated successfully.'
          : 'Department created successfully.';

        this.cdr.detectChanges();

        this.loadDepartments();
      },

      error: (error: HttpErrorResponse) => {
        console.error('Save department error:', error);

        this.saving = false;

        this.errorMessage = this.getErrorMessage(
          error,
          'Unable to save department.'
        );

        this.cdr.detectChanges();
      }
    });
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
