import { TranslateTextPipe } from '../../shared/translate-text.pipe';
import { FeedbackService } from '../../shared/feedback/feedback.service';

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
  imports: [CommonModule, FormsModule, TranslateTextPipe],
  templateUrl: './admins.html',
  styleUrl: './admins.css'
})
export class Admins implements OnInit {
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


  private readonly adminService = inject(AdminService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly organizationService = inject(OrganizationService);

  organizations: Organization[] = [];

  get activeOrganizations(): Organization[] {
    return this.organizations.filter(
      organization => organization.status === 'ACTIVE'
    );
  }

  isLoadingOrganizations = false;

  admins: Admin[] = [];

  isLoading = false;
  isSaving = false;

  
  

  search = '';
  selectedStatus = '';
  selectedOrganization = '';

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

  // Load organizations
  loadOrganizations(): void {

    this.isLoadingOrganizations = true;

    this.organizationService.getOrganizations().subscribe({

      next: response => {

        // Keep all organizations for filtering.
        this.organizations = response.data || [];

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

  // Load administrators with filters
  loadAdmins(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.adminService.getAdmins(
      this.page,
      this.limit,
      this.search,
      this.selectedStatus,
      this.selectedOrganization
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

  // Open Create Modal
  openCreateModal(): void {

    this.form = this.emptyForm();

    this.isEditMode = false;

    this.selectedAdmin = null;

    this.errorMessage = '';

    this.showModal = true;
  }

  // Open Edit Modal
  openEditModal(admin: Admin): void {

    this.form = {

      email: admin.email,

      password: '',

      confirmPassword: '',

      firstName: admin.adminProfile?.firstName || '',

      lastName: admin.adminProfile?.lastName || '',

      phone: admin.adminProfile?.phone || '',

      organizationId: admin.organizationId || ''

    };

    this.isEditMode = true;

    this.selectedAdmin = admin;

    this.errorMessage = '';

    this.showModal = true;
  }

  // Close Modal
  closeModal(): void {

    if (this.isSaving) return;

    this.showModal = false;

    this.selectedAdmin = null;

    this.form = this.emptyForm();
  }

  // Create / Update Admin
  submitForm(): void {

    this.errorMessage = '';

    this.successMessage = '';

    const email = this.form.email.trim().toLowerCase();

    const firstName = this.form.firstName.trim();

    const lastName = this.form.lastName.trim();

    const phone = this.form.phone.trim();

    const organizationId = this.form.organizationId;

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

      this.errorMessage = 'Please enter a valid email address.';

      return;
    }

    // Name validation
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

    // Phone validation
    if (phone.length > 20) {

      this.errorMessage = 'Phone must be at most 20 characters.';

      return;
    }

    // Password validation for creation
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

    // Organization validation
    const selectedOrganization = this.activeOrganizations.find(
      organization => organization.id === organizationId
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

  // Finish Save
  private finishSave(message: string): void {

    this.isSaving = false;

    this.showModal = false;

    this.selectedAdmin = null;

    this.form = this.emptyForm();

    this.successMessage = message;

    this.loadAdmins();

    this.cdr.markForCheck();
  }

  // Save Error
  private handleSaveError(error: any): void {

    this.isSaving = false;

    this.errorMessage = this.getError(error);

    this.cdr.markForCheck();
  }

  // Deactivate Admin
  async deactivateAdmin(admin: Admin): Promise<void> {

    const confirmed = await this.uiFeedback.confirm({
      title: 'Deactivate administrator?',
      message: `Deactivate the account ${admin.email}? The administrator will lose access until reactivated.`,
      confirmLabel: 'Deactivate',
      tone: 'danger'
    });
    if (!confirmed) return;

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

  // Reactivate Admin
  async reactivateAdmin(admin: Admin): Promise<void> {

    const confirmed = await this.uiFeedback.confirm({
      title: 'Reactivate administrator?',
      message: `Reactivate the account ${admin.email}? The administrator will regain access.`,
      confirmLabel: 'Reactivate',
      tone: 'primary'
    });
    if (!confirmed) return;

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

  // Apply Filters
  applyFilters(): void {

    this.page = 1;

    this.loadAdmins();
  }

  // Clear Filters
  clearFilters(): void {

    this.search = '';

    this.selectedStatus = '';

    this.selectedOrganization = '';

    this.page = 1;

    this.loadAdmins();
  }

  // Pagination
  changePage(page: number): void {

    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.page = page;

    this.loadAdmins();
  }

  // Admin Name
  getAdminName(admin: Admin): string {

    const profile = admin.adminProfile;

    if (!profile) {
      return 'Profile not completed';
    }

    return `${profile.firstName || ''} ${profile.lastName || ''}`
      .trim() || 'Admin';
  }

  // Admin Initials
  getInitials(admin: Admin): string {

    const profile = admin.adminProfile;

    if (!profile) {
      return 'AD';
    }

    const first = profile.firstName?.charAt(0) || '';

    const last = profile.lastName?.charAt(0) || '';

    return (first + last).toUpperCase() || 'AD';
  }

  // Status Styling
  statusClass(status: AdminStatus): string {

    switch (status) {

      case 'ACTIVE':
        return 'status-active';

      case 'INACTIVE':
        return 'status-inactive';

      case 'SUSPENDED':
        return 'status-suspended';

      default:
        return '';
    }
  }

  // Error Handler
  private getError(error: any): string {

    const message = error?.error?.message;

    return Array.isArray(message)
      ? message.join(', ')
      : message || 'Something went wrong. Please try again.';
  }

}
