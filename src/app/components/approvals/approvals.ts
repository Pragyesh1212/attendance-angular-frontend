
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { ApprovalService } from '../../services/approval';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './approvals.html'
})
export class Approvals implements OnInit {

  private readonly api = inject(ApprovalService);
  private readonly cdr = inject(ChangeDetectorRef);

  // Tabs
  activeTab: 'late' | 'corrections' = 'late';

  // Data
  approvals: any[] = [];
  corrections: any[] = [];

  // Separate loading states
  loadingApprovals = false;
  loadingCorrections = false;

  // Messages
  error = '';
  successMessage = '';

  // Actions
  busyId = '';
  rejectionReason = '';

  ngOnInit(): void {
    this.load();
  }

  // ==========================================
  // LOAD BOTH REQUEST LISTS
  // ==========================================

  load(): void {
    this.error = '';
    this.successMessage = '';

    this.loadApprovals();
    this.loadCorrections();
  }

  // ==========================================
  // LOAD LATE ARRIVAL APPROVALS
  // ==========================================

  private loadApprovals(): void {

    this.loadingApprovals = true;

    this.api.getPendingApprovals()
      .pipe(
        finalize(() => {
          this.loadingApprovals = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Pending approvals API response:',
            response
          );

          this.approvals = this.normalizeResponse(
            response,
            'approvals'
          );

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Pending approvals API error:',
            error
          );

          this.error =
            error?.error?.message ||
            'Unable to load pending approvals.';

          this.cdr.detectChanges();
        }

      });
  }

  // ==========================================
  // LOAD ATTENDANCE CORRECTIONS
  // ==========================================

  private loadCorrections(): void {

    this.loadingCorrections = true;

    this.api.getPendingCorrections()
      .pipe(
        finalize(() => {
          this.loadingCorrections = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Pending corrections API response:',
            response
          );

          this.corrections = this.normalizeResponse(
            response,
            'corrections'
          );

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Pending corrections API error:',
            error
          );

          this.error =
            error?.error?.message ||
            'Unable to load correction requests.';

          this.cdr.detectChanges();
        }

      });
  }

  // ==========================================
  // NORMALIZE API RESPONSE
  // ==========================================

  private normalizeResponse(
    response: any,
    type: 'approvals' | 'corrections'
  ): any[] {

    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.items)) {
      return response.items;
    }

    if (Array.isArray(response?.requests)) {
      return response.requests;
    }

    if (Array.isArray(response?.[type])) {
      return response[type];
    }

    if (Array.isArray(response?.data?.items)) {
      return response.data.items;
    }

    console.warn(
      `Unexpected ${type} response structure:`,
      response
    );

    return [];
  }

  // ==========================================
  // APPROVE / REJECT REQUEST
  // ==========================================

  review(
    kind: 'late' | 'correction',
    item: any,
    action: 'APPROVE' | 'REJECT'
  ): void {

    const reason = this.rejectionReason.trim();

    if (action === 'REJECT' && !reason) {

      this.error =
        'Please enter a rejection reason.';

      this.cdr.detectChanges();
      return;
    }

    if (this.busyId) {
      return;
    }

    const id = item?.id;

    if (!id) {

      this.error = 'Invalid request ID.';

      this.cdr.detectChanges();
      return;
    }

    this.busyId = id;
    this.error = '';

    const body = {
      action,
      rejectionReason:
        action === 'REJECT'
          ? reason
          : undefined
    };

    const request =
      kind === 'late'
        ? this.api.reviewApproval(id, body)
        : this.api.reviewCorrection(id, body);

    request.pipe(
      finalize(() => {
        this.busyId = '';
        this.cdr.detectChanges();
      })
    ).subscribe({

      next: () => {

        this.successMessage =
          action === 'APPROVE'
            ? 'Request approved successfully.'
            : 'Request rejected successfully.';

        this.rejectionReason = '';

        this.cdr.detectChanges();

        // Reload both lists after successful review.
        this.load();
      },

      error: (error) => {

        console.error(
          'Review request error:',
          error
        );

        this.error =
          error?.error?.message ||
          'Unable to submit this decision.';

        this.cdr.detectChanges();
      }

    });
  }

  // ==========================================
  // EMPLOYEE NAME
  // ==========================================

  employee(item: any): string {

    const profile =
      item?.attendanceRecord?.employeeProfile ??
      item?.employeeProfile;

    return [
      profile?.firstName,
      profile?.lastName
    ]
      .filter(Boolean)
      .join(' ') ||
      profile?.user?.email ||
      'Employee';
  }

  // ==========================================
  // REQUEST DATE
  // ==========================================

  date(item: any): any {

    return item?.punchInAt ??
      item?.requestedPunchInAt ??
      item?.createdAt;
  }
}
