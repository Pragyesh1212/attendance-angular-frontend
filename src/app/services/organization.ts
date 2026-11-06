import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type OrganizationStatus = 'ACTIVE' | 'INACTIVE';

export interface Organization {
  id: string;
  name: string;
  status: OrganizationStatus;
  createdAt: string;
  updatedAt?: string;
  userCount?: number;
  adminCount?: number;
}

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/organizations';

  getOrganizations(): Observable<{ data: Organization[] }> {
    return this.http.get<{ data: Organization[] }>(this.API_URL);
  }

  createOrganization(name: string): Observable<{ message: string; data: Organization }> {
    return this.http.post<{ message: string; data: Organization }>(this.API_URL, { name });
  }

  updateOrganization(id: string, payload: { name?: string; status?: OrganizationStatus }): Observable<{ message: string; data: Organization }> {
    return this.http.patch<{ message: string; data: Organization }>(`${this.API_URL}/${id}`, payload);
  }
}
