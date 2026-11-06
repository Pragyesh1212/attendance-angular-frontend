import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export class ShiftService {
    http = inject(HttpClient);
    API_URL = 'http://localhost:3000/shifts';
    getShifts() {
        return this.http.get(this.API_URL);
    }
    getShiftById(id) {
        return this.http.get(`${this.API_URL}/${id}`);
    }
    createShift(data) {
        return this.http.post(this.API_URL, data);
    }
    updateShift(id, data) {
        return this.http.patch(`${this.API_URL}/${id}`, data);
    }
    deleteShift(id) {
        return this.http.delete(`${this.API_URL}/${id}`);
    }
    static ɵfac = function ShiftService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ShiftService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ShiftService, factory: ShiftService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ShiftService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
