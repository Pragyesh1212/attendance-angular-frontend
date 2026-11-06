
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type EmployeeStatus = 'ACTIVE' | 'INACTIVE';

export interface Employee {
  id: string;
  email: string;
  role: string;
  status: EmployeeStatus;
  createdAt: string;
  updatedAt?: string;
  employeeProfile: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
    phone?: string;
    designation?: string;
    joiningDate?: string;
    avatarUrl?: string;
    shiftId?: string;
    shift?: {
      id: string;
      name: string;
      startTime: string;
      endTime: string;
      status?: 'ACTIVE' | 'INACTIVE';
    } | null;
    department?: {
      id: string;
      name: string;
    };
    workLocation?: {
      id: string;
      name: string;
      type: string;
      address?: string | null;
      status: 'ACTIVE' | 'INACTIVE';
    } | null;
    temporaryLocationAssignments?: Array<{
      id: string;
      startAt: string;
      endAt: string;
      reason?: string | null;
      workLocation: {
        id: string;
        name: string;
        type: string;
        address?: string | null;
        status: 'ACTIVE' | 'INACTIVE';
      };
    }>;
  };
}

export interface Department {
  id: string;
  name: string;
}

export interface EmployeeResponse {
  data: Employee[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateEmployeePayload {
  email: string;
  password: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  phone?: string;
  designation?: string;
  departmentId?: string;
  joiningDate?: string;
  avatarUrl?: string;
}

export interface UpdateEmployeePayload {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  designation?: string;
  departmentId?: string;
  joiningDate?: string;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000';

  getEmployees(
    page = 1,
    limit = 10,
    search = '',
    status = '',
    departmentId = ''
  ): Observable<EmployeeResponse> {

    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    if (status) {
      params = params.set('status', status);
    }

    if (departmentId) {
      params = params.set('departmentId', departmentId);
    }

    return this.http.get<EmployeeResponse>(
      `${this.apiUrl}/users/employees`,
      { params }
    );
  }

  createEmployee(
    payload: CreateEmployeePayload
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/users/employees`,
      payload
    );
  }

  updateEmployee(
    employeeId: string,
    payload: UpdateEmployeePayload
  ): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/users/employees/${employeeId}`,
      payload
    );
  }

  getDepartments(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/departments`
    );
  }

  assignEmployeeShift(
    employeeId: string,
    shiftId: string
  ): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/users/employees/${employeeId}/shift`,
      { shiftId }
    );
  }
}
