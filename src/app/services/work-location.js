import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { defer, of, switchMap, timer } from 'rxjs';
import * as i0 from "@angular/core";
export class WorkLocationService {
    http = inject(HttpClient);
    apiUrl = 'http://localhost:3000/work-locations';
    nominatimUrl = 'https://nominatim.openstreetmap.org';
    lastRequestAt = 0;
    cache = new Map();
    getAll() {
        return this.http.get(this.apiUrl);
    }
    create(payload) {
        return this.http.post(this.apiUrl, payload);
    }
    update(id, payload) {
        return this.http.patch(`${this.apiUrl}/${id}`, payload);
    }
    deactivate(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    assignPermanent(employeeProfileId, workLocationId) {
        return this.http.patch(`${this.apiUrl}/employees/${employeeProfileId}/permanent`, { workLocationId });
    }
    assignTemporary(employeeProfileId, payload) {
        return this.http.post(`${this.apiUrl}/employees/${employeeProfileId}/temporary`, payload);
    }
    searchPlace(query) {
        const key = `search:${query.trim().toLowerCase()}`;
        if (this.cache.has(key)) {
            return of(this.cache.get(key));
        }
        const params = new HttpParams()
            .set('format', 'jsonv2')
            .set('addressdetails', '1')
            .set('limit', '6')
            .set('q', query.trim());
        return this.nominatimRequest(key, () => this.http.get(`${this.nominatimUrl}/search`, { params }));
    }
    reverseGeocode(latitude, longitude) {
        const key = `reverse:${latitude.toFixed(5)},${longitude.toFixed(5)}`;
        if (this.cache.has(key)) {
            return of(this.cache.get(key));
        }
        const params = new HttpParams()
            .set('format', 'jsonv2')
            .set('addressdetails', '1')
            .set('zoom', '18')
            .set('lat', String(latitude))
            .set('lon', String(longitude));
        return this.nominatimRequest(key, () => this.http.get(`${this.nominatimUrl}/reverse`, { params }));
    }
    nominatimRequest(key, request) {
        return defer(() => {
            const wait = Math.max(0, 1000 - (Date.now() - this.lastRequestAt));
            return timer(wait).pipe(switchMap(() => {
                this.lastRequestAt = Date.now();
                return request();
            }));
        }).pipe(switchMap(result => {
            this.cache.set(key, result);
            return of(result);
        }));
    }
    static ɵfac = function WorkLocationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkLocationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WorkLocationService, factory: WorkLocationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkLocationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
