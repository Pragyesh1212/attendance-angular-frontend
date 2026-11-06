import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Organization, OrganizationService, OrganizationStatus } from '../../services/organization';

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './organizations.html'
})
export class Organizations implements OnInit {
  private readonly service = inject(OrganizationService);
  private readonly cdr = inject(ChangeDetectorRef);
  organizations: Organization[] = [];
  isLoading = false;
  isSaving = false;
  showModal = false;
  editing: Organization | null = null;
  name = '';
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void { this.load(); }

  load(): void {
    this.isLoading = true;
    this.service.getOrganizations().subscribe({
      next: response => { this.organizations = response.data || []; this.isLoading = false; this.cdr.markForCheck(); },
      error: error => { this.errorMessage = this.error(error); this.isLoading = false; this.cdr.markForCheck(); }
    });
  }

  openCreate(): void { this.editing = null; this.name = ''; this.errorMessage = ''; this.showModal = true; }
  openEdit(org: Organization): void { this.editing = org; this.name = org.name; this.errorMessage = ''; this.showModal = true; }
  close(): void { if (!this.isSaving) this.showModal = false; }

  save(): void {
    const name = this.name.trim();
    if (name.length < 2 || name.length > 150) { this.errorMessage = 'Organization name must contain 2–150 characters.'; return; }
    this.isSaving = true;
    const request = this.editing
      ? this.service.updateOrganization(this.editing.id, { name })
      : this.service.createOrganization(name);
    request.subscribe({
      next: result => { this.isSaving = false; this.showModal = false; this.successMessage = result.message; this.load(); this.cdr.markForCheck(); },
      error: error => { this.isSaving = false; this.errorMessage = this.error(error); this.cdr.markForCheck(); }
    });
  }

  toggleStatus(org: Organization): void {
    const status: OrganizationStatus = org.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    if (!confirm(`${status === 'ACTIVE' ? 'Activate' : 'Deactivate'} ${org.name}?`)) return;
    this.service.updateOrganization(org.id, { status }).subscribe({
      next: result => { this.successMessage = result.message; this.load(); },
      error: error => { this.errorMessage = this.error(error); this.cdr.markForCheck(); }
    });
  }

  private error(error: any): string {
    const message = error?.error?.message;
    return Array.isArray(message) ? message.join(', ') : message || 'Something went wrong. Please try again.';
  }
}
