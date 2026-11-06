import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as i0 from "@angular/core";
export class AdminService {
    http = inject(HttpClient);
    API_URL = '/attendance-api/users/admins';
    getAdmins(page = 1, limit = 10, search = '', status = '') {
        let params = new HttpParams()
            .set('page', page)
            .set('limit', limit);
        if (search.trim())
            params = params.set('search', search.trim());
        if (status)
            params = params.set('status', status);
        return this.http.get(this.API_URL, { params });
    }
    getAdminById(id) {
        return this.http.get(`${this.API_URL}/${id}`);
    }
    createAdmin(payload) {
        return this.http.post(this.API_URL, payload);
    }
    updateAdmin(id, payload) {
        return this.http.patch(`${this.API_URL}/${id}`, payload);
    }
    deactivateAdmin(id) {
        return this.http.patch(`${this.API_URL}/${id}/deactivate`, {});
    }
    reactivateAdmin(id) {
        return this.http.patch(`${this.API_URL}/${id}/reactivate`, {});
    }
    static ɵfac = function AdminService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AdminService, factory: AdminService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
