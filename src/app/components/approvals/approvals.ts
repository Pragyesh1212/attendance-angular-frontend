import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { ApprovalService } from '../../services/approval';
import { FeedbackService } from '../../shared/feedback/feedback.service';
import { TranslateTextPipe } from '../../shared/translate-text.pipe';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, TranslateTextPipe],
  templateUrl: './approvals.html',
})
export class Approvals implements OnInit {
  private readonly api = inject(ApprovalService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly feedback = inject(FeedbackService);

  approvals: any[] = [];
  loadingApprovals = false;
  busyId = '';
  rejectingId: string | null = null;
  rejectionReasons: Record<string, string> = {};

  ngOnInit(): void {
    this.loadApprovals();
  }

  private normalizeApprovals(response: any): any[] {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.items)) return response.items;
    if (Array.isArray(response?.requests)) return response.requests;
    if (Array.isArray(response?.approvals)) return response.approvals;
    if (Array.isArray(response?.data?.items)) return response.data.items;
    return [];
  }

  private loadApprovals(): void {
    this.loadingApprovals = true;
    this.api.getPendingApprovals().pipe(
      finalize(() => {
        this.loadingApprovals = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: response => {
        this.approvals = this.normalizeApprovals(response);
        this.cdr.markForCheck();
      },
      error: error => {
        this.feedback.error(error?.error?.message || 'Unable to load pending approvals.');
        this.cdr.markForCheck();
      },
    });
  }

  beginReject(item: any): void {
    if (this.busyId || !item?.id) return;
    this.rejectingId = item.id;
    this.rejectionReasons[item.id] ??= '';
  }

  cancelReject(): void {
    if (this.busyId) return;
    this.rejectingId = null;
  }

  review(item: any, action: 'APPROVE' | 'REJECT'): void {
    if (this.busyId) return;
    const id = item?.id;
    if (!id) {
      this.feedback.error('Invalid request ID.');
      return;
    }

    const rejectionReason = (this.rejectionReasons[id] || '').trim();
    if (action === 'REJECT' && !rejectionReason) {
      this.feedback.error('Please enter a rejection reason.');
      return;
    }

    this.busyId = id;
    this.api.reviewApproval(id, {
      action,
      rejectionReason: action === 'REJECT' ? rejectionReason : undefined,
    }).pipe(
      finalize(() => {
        this.busyId = '';
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: () => {
        this.feedback.success(action === 'APPROVE'
          ? 'Request approved successfully.'
          : 'Request rejected successfully.');
        delete this.rejectionReasons[id];
        if (this.rejectingId === id) this.rejectingId = null;
        // Remove the completed request immediately; re-fetch remaining pending requests.
        this.approvals = this.approvals.filter(approval => approval.id !== id);
        this.loadApprovals();
      },
      error: error => {
        this.feedback.error(error?.error?.message || 'Unable to submit this decision.');
        this.cdr.markForCheck();
      },
    });
  }

  employee(item: any): string {
    const profile = item?.attendanceRecord?.employeeProfile ?? item?.employeeProfile;
    return [profile?.firstName, profile?.lastName].filter(Boolean).join(' ')
      || profile?.user?.email || 'Employee';
  }

  date(item: any): string | null {
    return item?.punchInAt ?? item?.createdAt ?? null;
  }

  submittedReason(item: any): string {
    return item?.lateReason?.trim() || 'No reason submitted';
  }
}
