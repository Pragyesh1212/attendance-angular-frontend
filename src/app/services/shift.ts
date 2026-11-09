
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type ShiftStatus = 'ACTIVE' | 'INACTIVE';

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  gracePeriodMinutes: number;
  /** Stored legacy name: now the Admin approval threshold. */
  lateReasonAfterMinutes: number | null;
  /** Stored legacy name: now the hard punch-in cutoff. */
  approvalRequiredAfterMinutes: number | null;
  status: ShiftStatus;
  createdAt: string;
  updatedAt: string;
  _count: {
    employees: number;
  };
}

export interface ShiftPayload {
  name: string;
  startTime: string;
  endTime: string;
  gracePeriodMinutes?: number;
  /** Admin approval threshold (legacy API field). */
  lateReasonAfterMinutes?: number | null;
  /** Punch-in cutoff threshold (legacy API field). */
  approvalRequiredAfterMinutes?: number | null;
}

export interface ShiftResponse {
  message: string;
  data: Shift[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private http = inject(HttpClient);

  private readonly API_URL = `${environment.apiUrl}/shifts`;

  getShifts(): Observable<ShiftResponse> {
    return this.http.get<ShiftResponse>(this.API_URL);
  }

  getShiftById(id: string): Observable<{ message: string; data: Shift }> {
    return this.http.get<{ message: string; data: Shift }>(
      `${this.API_URL}/${id}`
    );
  }

  createShift(data: ShiftPayload): Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  updateShift(id: string, data: Partial<ShiftPayload> & { status?: ShiftStatus }): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}`, data);
  }

  deleteShift(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
