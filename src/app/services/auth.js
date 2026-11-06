import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, finalize } from 'rxjs';
import * as i0 from "@angular/core";
export class Auth {
    http = inject(HttpClient);
    API_URL = 'http://localhost:3000/auth';
    // Login
    login(credentials) {
        return this.http.post(`${this.API_URL}/login`, credentials).pipe(tap(response => {
            sessionStorage.setItem('accessToken', response.accessToken);
            sessionStorage.setItem('refreshToken', response.refreshToken);
            sessionStorage.setItem('user', JSON.stringify(response.user));
        }));
    }
    // Refresh access and refresh tokens
    refreshToken() {
        const refreshToken = sessionStorage.getItem('refreshToken');
        return this.http.post(`${this.API_URL}/refresh`, { refreshToken }).pipe(tap(response => {
            sessionStorage.setItem('accessToken', response.accessToken);
            sessionStorage.setItem('refreshToken', response.refreshToken);
        }));
    }
    // Logout
    logout() {
        const accessToken = sessionStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`
        });
        return this.http.post(`${this.API_URL}/logout`, {}, { headers }).pipe(finalize(() => this.clearSession()));
    }
    // Get current access token
    getAccessToken() {
        return sessionStorage.getItem('accessToken');
    }
    getRefreshToken() {
        return sessionStorage.getItem('refreshToken');
    }
    // Get current user
    getUser() {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    // Check authentication
    isAuthenticated() {
        return !!this.getAccessToken();
    }
    // Clear session
    clearSession() {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('user');
    }
    static ɵfac = function Auth_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Auth)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Auth, factory: Auth.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Auth, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
