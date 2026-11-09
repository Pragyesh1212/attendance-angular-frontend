
import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export type AdminStatus =
  'ACTIVE' |
  'INACTIVE' |
  'SUSPENDED';

export interface Admin {

  id: string;

  email: string;

  role: 'ADMIN';

  status: AdminStatus;

  organizationId: string | null;

  organization?: {
    id: string;
    name: string;
  } | null;

  createdAt: string;

  updatedAt?: string;

  adminProfile?: {

    firstName: string;

    lastName: string;

    phone?: string | null;

    designation?: string | null;

    avatarUrl?: string | null;

  } | null;

}

export interface AdminListResponse {

  data: Admin[];

  pagination: {

    total: number;

    page: number;

    limit: number;

    totalPages: number;

  };

}

export interface CreateAdminPayload {

  organizationId: string;

  email: string;

  password: string;

  firstName: string;

  lastName: string;

  phone?: string;

}

export interface UpdateAdminPayload {

  email?: string;

  firstName?: string;

  lastName?: string;

  phone?: string;

  organizationId?: string;

}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  private readonly API_URL =
    `${environment.apiUrl}/users/admins`;

  // GET ADMINS WITH FILTERS
  getAdmins(
    page = 1,
    limit = 10,
    search = '',
    status = '',
    organizationId = ''
  ): Observable<AdminListResponse> {

    let params = new HttpParams()

      .set('page', page)

      .set('limit', limit);

    if (search.trim()) {

      params = params.set(
        'search',
        search.trim()
      );

    }

    if (status) {

      params = params.set(
        'status',
        status
      );

    }

    if (organizationId) {

      params = params.set(
        'organizationId',
        organizationId
      );

    }

    return this.http.get<AdminListResponse>(
      this.API_URL,
      { params }
    );

  }

  // GET ADMIN BY ID
  getAdminById(
    id: string
  ): Observable<{ data: Admin }> {

    return this.http.get<{ data: Admin }>(
      `${this.API_URL}/${id}`
    );

  }

  // CREATE ADMIN
  createAdmin(
    payload: CreateAdminPayload
  ): Observable<any> {

    return this.http.post(
      this.API_URL,
      payload
    );

  }

  // UPDATE ADMIN
  updateAdmin(
    id: string,
    payload: UpdateAdminPayload
  ): Observable<any> {

    return this.http.patch(
      `${this.API_URL}/${id}`,
      payload
    );

  }

  // DEACTIVATE ADMIN
  deactivateAdmin(
    id: string
  ): Observable<any> {

    return this.http.patch(
      `${this.API_URL}/${id}/deactivate`,
      {}
    );

  }

  // REACTIVATE ADMIN
  reactivateAdmin(
    id: string
  ): Observable<any> {

    return this.http.patch(
      `${this.API_URL}/${id}/reactivate`,
      {}
    );

  }

}
