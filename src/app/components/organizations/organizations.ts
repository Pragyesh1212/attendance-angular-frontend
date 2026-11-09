import { FeedbackService } from '../../shared/feedback/feedback.service';
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

  private readonly service = inject(OrganizationService);
  private readonly cdr = inject(ChangeDetectorRef);
  organizations: Organization[] = [];
  isLoading = false;
  isSaving = false;
  showModal = false;
  editing: Organization | null = null;
  name = '';
  
  

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

  async toggleStatus(org: Organization): Promise<void> {
    const status: OrganizationStatus = org.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const confirmed = await this.uiFeedback.confirm({
      title: status === 'ACTIVE' ? 'Activate organization?' : 'Deactivate organization?',
      message: `${status === 'ACTIVE' ? 'Activate' : 'Deactivate'} ${org.name}?`,
      confirmLabel: status === 'ACTIVE' ? 'Activate' : 'Deactivate',
      tone: status === 'ACTIVE' ? 'primary' : 'warning'
    });
    if (!confirmed) return;
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
