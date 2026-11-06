import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export class DepartmentService {
    http = inject(HttpClient);
    apiUrl = 'http://localhost:3000/departments';
    getDepartments() {
        return this.http.get(this.apiUrl);
    }
    getDepartmentById(id) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
    createDepartment(data) {
        return this.http.post(this.apiUrl, data);
    }
    updateDepartment(id, data) {
        return this.http.patch(`${this.apiUrl}/${id}`, data);
    }
    deleteDepartment(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    static ɵfac = function DepartmentService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DepartmentService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DepartmentService, factory: DepartmentService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DepartmentService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
