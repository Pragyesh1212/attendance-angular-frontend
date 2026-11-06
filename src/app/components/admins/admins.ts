
import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AdminService,
  Admin,
  AdminStatus,
  CreateAdminPayload,
  UpdateAdminPayload
} from '../../services/admin';

import {
  Organization,
  OrganizationService
} from '../../services/organization';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admins.html',
  styleUrl: './admins.css'
})
export class Admins implements OnInit {

  private readonly adminService = inject(AdminService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly organizationService = inject(OrganizationService);

  organizations: Organization[] = [];
  isLoadingOrganizations = false;

  admins: Admin[] = [];

  isLoading = false;
  isSaving = false;

  errorMessage = '';
  successMessage = '';

  search = '';
  selectedStatus = '';

  page = 1;
  limit = 10;
  total = 0;
  totalPages = 0;

  showModal = false;
  isEditMode = false;

  selectedAdmin: Admin | null = null;

  form = this.emptyForm();

  private emptyForm() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      organizationId: ''
    };
  }

  ngOnInit(): void {
    this.loadOrganizations();
    this.loadAdmins();
  }

  loadOrganizations(): void {
    this.isLoadingOrganizations = true;

    this.organizationService.getOrganizations().subscribe({
      next: response => {
        this.organizations = (response.data || [])
          .filter(org => org.status === 'ACTIVE');

        this.isLoadingOrganizations = false;
        this.cdr.markForCheck();
      },

      error: error => {
        this.errorMessage = this.getError(error);
        this.isLoadingOrganizations = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadAdmins(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.adminService.getAdmins(
      this.page,
      this.limit,
      this.search,
      this.selectedStatus
    ).subscribe({
      next: response => {
        this.admins = response.data || [];
        this.total = response.pagination?.total ?? 0;
        this.totalPages = response.pagination?.totalPages ?? 0;

        this.isLoading = false;
        this.cdr.markForCheck();
      },

      error: error => {
        this.isLoading = false;
        this.errorMessage = this.getError(error);
        this.cdr.markForCheck();
      }
    });
  }

  openCreateModal(): void {
    this.form = this.emptyForm();

    this.isEditMode = false;
    this.selectedAdmin = null;

    this.errorMessage = '';
    this.showModal = true;
  }

  openEditModal(admin: Admin): void {
    this.form = {
      email: admin.email,
      password: '',
      confirmPassword: '',

      firstName: admin.adminProfile?.firstName || '',
      lastName: admin.adminProfile?.lastName || '',
      phone: admin.adminProfile?.phone || '',

      // Preselect the current organization.
      organizationId: admin.organizationId || ''
    };

    this.isEditMode = true;
    this.selectedAdmin = admin;

    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void {
    if (this.isSaving) return;

    this.showModal = false;
    this.selectedAdmin = null;
    this.form = this.emptyForm();
  }

  submitForm(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const email = this.form.email.trim().toLowerCase();
    const firstName = this.form.firstName.trim();
    const lastName = this.form.lastName.trim();
    const phone = this.form.phone.trim();
    const organizationId = this.form.organizationId;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (
      firstName.length < 2 ||
      firstName.length > 100 ||
      lastName.length < 2 ||
      lastName.length > 100
    ) {
      this.errorMessage =
        'First name and last name must contain 2–100 characters.';
      return;
    }

    if (phone.length > 20) {
      this.errorMessage = 'Phone must be at most 20 characters.';
      return;
    }

    // Validate password only during creation.
    if (!this.isEditMode) {
      if (
        this.form.password.length < 12 ||
        this.form.password.length > 128
      ) {
        this.errorMessage =
          'Password must contain between 12 and 128 characters.';
        return;
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.errorMessage =
          'Password and confirm password do not match.';
        return;
      }
    }

    // Organization is required for both create and edit.
    const selectedOrganization = this.organizations.find(
      org => org.id === organizationId
    );

    if (!organizationId || !selectedOrganization) {
      this.errorMessage = 'Please select an active organization.';
      return;
    }

    this.isSaving = true;

    // UPDATE ADMIN
    if (this.isEditMode && this.selectedAdmin) {

      const payload: UpdateAdminPayload = {
        email,
        firstName,
        lastName,
        phone,
        organizationId
      };

      this.adminService.updateAdmin(
        this.selectedAdmin.id,
        payload
      ).subscribe({
        next: response => {
          this.finishSave(
            response.message ||
            'Administrator updated successfully.'
          );
        },

        error: error => this.handleSaveError(error)
      });

      return;
    }

    // CREATE ADMIN
    const payload: CreateAdminPayload = {
      organizationId,
      email,
      password: this.form.password,
      firstName,
      lastName,
      ...(phone ? { phone } : {})
    };

    this.adminService.createAdmin(payload).subscribe({
      next: response => {
        this.finishSave(
          response.message ||
          'Administrator created successfully.'
        );
      },

      error: error => this.handleSaveError(error)
    });
  }

  private finishSave(message: string): void {
    this.isSaving = false;
    this.showModal = false;
    this.selectedAdmin = null;

    this.form = this.emptyForm();

    this.successMessage = message;

    this.loadAdmins();
    this.cdr.markForCheck();
  }

  private handleSaveError(error: any): void {
    this.isSaving = false;
    this.errorMessage = this.getError(error);
    this.cdr.markForCheck();
  }

  deactivateAdmin(admin: Admin): void {
    if (!confirm(`Deactivate admin account ${admin.email}?`)) {
      return;
    }

    this.adminService.deactivateAdmin(admin.id).subscribe({
      next: response => {
        this.successMessage =
          response.message || 'Admin deactivated successfully.';

        this.loadAdmins();
      },

      error: error => {
        this.errorMessage = this.getError(error);
        this.cdr.markForCheck();
      }
    });
  }

  reactivateAdmin(admin: Admin): void {
    if (!confirm(`Reactivate admin account ${admin.email}?`)) {
      return;
    }

    this.adminService.reactivateAdmin(admin.id).subscribe({
      next: response => {
        this.successMessage =
          response.message || 'Admin reactivated successfully.';

        this.loadAdmins();
      },

      error: error => {
        this.errorMessage = this.getError(error);
        this.cdr.markForCheck();
      }
    });
  }

  applyFilters(): void {
    this.page = 1;
    this.loadAdmins();
  }

  clearFilters(): void {
    this.search = '';
    this.selectedStatus = '';
    this.page = 1;

    this.loadAdmins();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.page = page;
    this.loadAdmins();
  }

  getAdminName(admin: Admin): string {
    const profile = admin.adminProfile;

    if (!profile) {
      return 'Profile not completed';
    }

    return `${profile.firstName || ''} ${profile.lastName || ''}`
      .trim() || 'Admin';
  }

  statusClass(status: AdminStatus): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700';

      case 'INACTIVE':
        return 'bg-red-100 text-red-700';

      case 'SUSPENDED':
        return 'bg-yellow-100 text-yellow-700';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }

  private getError(error: any): string {
    const message = error?.error?.message;

    return Array.isArray(message)
      ? message.join(', ')
      : message || 'Something went wrong. Please try again.';
  }
}
