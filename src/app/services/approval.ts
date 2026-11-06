import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReviewDecision { action: 'APPROVE' | 'REJECT'; rejectionReason?: string; }

@Injectable({ providedIn: 'root' })
export class ApprovalService {
  private readonly http = inject(HttpClient);
  private readonly base = 'http://localhost:3000/attendance';

  getPendingApprovals(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/approvals/pending`); }
  reviewApproval(id: string, body: ReviewDecision): Observable<any> {
    return this.http.post(`${this.base}/approvals/${id}/review`, body);
  }
  getPendingCorrections(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/corrections/pending`); }
  reviewCorrection(id: string, body: ReviewDecision): Observable<any> {
    return this.http.post(`${this.base}/corrections/${id}/review`, body);
  }
}
