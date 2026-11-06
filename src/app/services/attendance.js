import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as i0 from "@angular/core";
export class Attendance {
    http = inject(HttpClient);
    API_URL = 'http://localhost:3000/attendance';
    buildParams(query = {}) {
        let params = new HttpParams();
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params = params.set(key, String(value));
            }
        });
        return params;
    }
    getAllAttendance(query = {}) {
        return this.http.get(this.API_URL, {
            params: this.buildParams(query)
        });
    }
    getAttendanceById(id) {
        return this.http.get(`${this.API_URL}/${id}`);
    }
    getMyAttendance(query = {}) {
        return this.http.get(`${this.API_URL}/my`, { params: this.buildParams(query) });
    }
    punchIn(data) {
        return this.http.post(`${this.API_URL}/punch-in`, data);
    }
    punchOut(data) {
        return this.http.post(`${this.API_URL}/punch-out`, data);
    }
    createCorrection(data) {
        return this.http.post(`${this.API_URL}/corrections`, data);
    }
    getMyCorrections() {
        return this.http.get(`${this.API_URL}/corrections/my`);
    }
    getMissingPunchOuts() {
        return this.http.get(`${this.API_URL}/missing-punch-outs`);
    }
    getPendingCorrections() {
        return this.http.get(`${this.API_URL}/corrections/pending`);
    }
    reviewCorrection(requestId, data) {
        return this.http.post(`${this.API_URL}/corrections/${requestId}/review`, data);
    }
    getPendingApprovals() {
        return this.http.get(`${this.API_URL}/approvals/pending`);
    }
    reviewAttendance(sessionId, data) {
        return this.http.post(`${this.API_URL}/approvals/${sessionId}/review`, data);
    }
    static ɵfac = function Attendance_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Attendance)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Attendance, factory: Attendance.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Attendance, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
