import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as i0 from "@angular/core";
export class EmployeeService {
    http = inject(HttpClient);
    apiUrl = '/attendance-api';
    getEmployees(page = 1, limit = 10, search = '', status = '', departmentId = '') {
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
        return this.http.get(`${this.apiUrl}/users/employees`, { params });
    }
    createEmployee(payload) {
        return this.http.post(`${this.apiUrl}/users/employees`, payload);
    }
    updateEmployee(employeeId, payload) {
        return this.http.patch(`${this.apiUrl}/users/employees/${employeeId}`, payload);
    }
    getDepartments() {
        return this.http.get(`${this.apiUrl}/departments`);
    }
    static ɵfac = function EmployeeService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeeService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EmployeeService, factory: EmployeeService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeeService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
