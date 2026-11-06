
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ShiftStatus = 'ACTIVE' | 'INACTIVE';

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  gracePeriodMinutes: number;
  lateReasonAfterMinutes: number | null;
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
  lateReasonAfterMinutes?: number | null;
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

  private readonly API_URL = '/attendance-api/shifts';

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
