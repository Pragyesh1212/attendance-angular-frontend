
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AttendanceQuery {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  employeeProfileId?: string;
}

export interface PunchInPayload {
  latitude: number;
  longitude: number;
  accuracy?: number;
  lateReason?: string;
}

export interface PunchOutPayload {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface AttendanceSession {
  id: string;
  punchInAt: string;
  punchOutAt: string | null;
  approvalStatus: string;
  lateMinutes?: number;
  lateReason?: string | null;
  [key: string]: any;
}

export interface AttendanceRecord {
  id: string;
  workDate: string;
  status: string;
  totalWorkMinutes: number;
  employeeProfile?: any;
  sessions: AttendanceSession[];
  [key: string]: any;
}

export interface AttendanceResponse {
  data: AttendanceRecord[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class Attendance {
  private http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:3000/attendance';

  private buildParams(query: AttendanceQuery = {}): HttpParams {
    let params = new HttpParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return params;
  }

  getAllAttendance(
    query: AttendanceQuery = {}
  ): Observable<AttendanceResponse> {
    return this.http.get<AttendanceResponse>(this.API_URL, {
      params: this.buildParams(query)
    });
  }

  getAttendanceById(id: string): Observable<AttendanceRecord> {
    return this.http.get<AttendanceRecord>(
      `${this.API_URL}/${id}`
    );
  }

  getMyAttendance(
    query: AttendanceQuery = {}
  ): Observable<AttendanceResponse> {
    return this.http.get<AttendanceResponse>(
      `${this.API_URL}/my`,
      { params: this.buildParams(query) }
    );
  }

  punchIn(data: PunchInPayload): Observable<any> {
    return this.http.post(
      `${this.API_URL}/punch-in`,
      data
    );
  }

  punchOut(data: PunchOutPayload): Observable<any> {
    return this.http.post(
      `${this.API_URL}/punch-out`,
      data
    );
  }

  createCorrection(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/corrections`,
      data
    );
  }

  getMyCorrections(): Observable<any> {
    return this.http.get(`${this.API_URL}/corrections/my`);
  }

  getMissingPunchOuts(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/missing-punch-outs`
    );
  }

  getPendingCorrections(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/corrections/pending`
    );
  }

  reviewCorrection(
    requestId: string,
    data: any
  ): Observable<any> {
    return this.http.post(
      `${this.API_URL}/corrections/${requestId}/review`,
      data
    );
  }

  getPendingApprovals(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/approvals/pending`
    );
  }

  reviewAttendance(
    sessionId: string,
    data: any
  ): Observable<any> {
    return this.http.post(
      `${this.API_URL}/approvals/${sessionId}/review`,
      data
    );
  }
}
