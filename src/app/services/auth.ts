
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, finalize } from 'rxjs';

export interface AuthUser {
  id: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EMPLOYEE';
  employeeProfile: any;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:3000/auth';

  // Login
  login(credentials: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.API_URL}/login`,
      credentials
    ).pipe(
      tap(response => {
        sessionStorage.setItem('accessToken', response.accessToken);
        sessionStorage.setItem('refreshToken', response.refreshToken);
        sessionStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  // Refresh access and refresh tokens
  refreshToken(): Observable<TokenResponse> {

    const refreshToken = sessionStorage.getItem('refreshToken');

    return this.http.post<TokenResponse>(
      `${this.API_URL}/refresh`,
      { refreshToken }
    ).pipe(
      tap(response => {
        sessionStorage.setItem('accessToken', response.accessToken);
        sessionStorage.setItem('refreshToken', response.refreshToken);
      })
    );
  }

  // Logout
  logout(): Observable<{ message: string }> {

    const accessToken = sessionStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.post<{ message: string }>(
      `${this.API_URL}/logout`,
      {},
      { headers }
    ).pipe(
      finalize(() => this.clearSession())
    );
  }

  // Get current access token
  getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
  return sessionStorage.getItem('refreshToken');
}

  // Get current user
  getUser(): AuthUser | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) as AuthUser : null;
  }

  // Check authentication
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Clear session
  clearSession(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('user');
  }
}
