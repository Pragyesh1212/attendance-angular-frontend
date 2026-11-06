
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department {
  id: string;
  name: string;
  description: string | null;
  _count: {
    employees: number;
  };
}

export interface DepartmentResponse {
  message: string;
  data: Department;
}

export interface DepartmentsResponse {
  message: string;
  data: Department[];
  total: number;
}

export interface DepartmentPayload {
  name?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/departments';

  getDepartments(): Observable<DepartmentsResponse> {
    return this.http.get<DepartmentsResponse>(this.apiUrl);
  }

  getDepartmentById(id: string): Observable<DepartmentResponse> {
    return this.http.get<DepartmentResponse>(`${this.apiUrl}/${id}`);
  }

  createDepartment(data: DepartmentPayload): Observable<DepartmentResponse> {
    return this.http.post<DepartmentResponse>(this.apiUrl, data);
  }

  updateDepartment(
    id: string,
    data: DepartmentPayload
  ): Observable<DepartmentResponse> {
    return this.http.patch<DepartmentResponse>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  deleteDepartment(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${id}`
    );
  }
}
