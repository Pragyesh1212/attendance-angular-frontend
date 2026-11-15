import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type EmployeeDayType = 'WORKDAY' | 'WEEKEND' | 'HOLIDAY';
export type ShiftDayEntry = { id?: string; shiftOrder: number; shiftName?: string | null;
  punchIn: string; punchOut: string; approvalStatus?: string };
export interface EmployeeMonthDay {
  date: string; weekday: string; dayType: EmployeeDayType; status: string;
  note: string; workMinutes: number | null; workingHours: string;
  attendanceRecordId: string | null; sessions: ShiftDayEntry[];
}
export interface EmployeeMonthData {
  month: string;
  employee: {
    userId: string; employeeProfileId: string; name: string; employeeCode: string;
    status: string; email: string; department: string | null; designation: string | null;
    phone: string | null; workLocation: string | null; avatarUrl: string | null; hasAvatar: boolean;
    shifts: { order: number; id: string; name: string; startTime: string; endTime: string }[];
  };
  device: { status: string; name: string | null; os: string | null; lastSeenAt: string | null };
  maxShift: number;
  summary: { present: number; late: number; absent: number; weekend: number; holiday: number };
  days: EmployeeMonthDay[];
}
export interface EmployeeDayUpdate {
  dayType: EmployeeDayType;
  note?: string;
  status?: 'PRESENT' | 'LATE' | 'HALF_DAY' | 'ABSENT' | 'ON_LEAVE';
  sessions?: { shiftOrder: number; punchIn: string | null; punchOut: string | null }[];
}

@Injectable({ providedIn: 'root' })
export class EmployeeMonthlyService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/attendance`;

  getMonth(employeeUserId: string, month: string): Observable<EmployeeMonthData> {
    return this.http.get<EmployeeMonthData>(`${this.base}/employees/${encodeURIComponent(employeeUserId)}/month`,
      { params: new HttpParams().set('month', month) });
  }
  saveDay(employeeUserId: string, day: string, payload: EmployeeDayUpdate): Observable<{saved: boolean; date: string}> {
    return this.http.patch<{saved: boolean; date: string}>(
      `${this.base}/employees/${encodeURIComponent(employeeUserId)}/days/${encodeURIComponent(day)}`, payload);
  }
  bulkSetDayType(employeeUserId: string, dates: string[], dayType: EmployeeDayType):
    Observable<{saved: boolean; affectedCount: number; dates: string[]; dayType: EmployeeDayType}> {
    return this.http.patch<{saved: boolean; affectedCount: number; dates: string[]; dayType: EmployeeDayType}>(
      `${this.base}/employees/${encodeURIComponent(employeeUserId)}/days/bulk`, { dates, dayType });
  }
  download(employeeUserId: string, month: string, format: 'xlsx' | 'pdf'): Observable<Blob> {
    return this.http.get(`${this.base}/employees/${encodeURIComponent(employeeUserId)}/month/export`, {
      params: { month, format }, responseType: 'blob',
    });
  }
  myOverrides(month: string): Observable<{ date: string; dayType: 'WEEKEND' | 'HOLIDAY'; note: string | null }[]> {
    return this.http.get<{ date: string; dayType: 'WEEKEND' | 'HOLIDAY'; note: string | null }[]>(
      `${this.base}/my/day-overrides`, { params: { month } });
  }
}
