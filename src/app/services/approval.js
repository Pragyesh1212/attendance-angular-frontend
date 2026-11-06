import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export class ApprovalService {
    http = inject(HttpClient);
    base = '/attendance-api/attendance';
    getPendingApprovals() { return this.http.get(`${this.base}/approvals/pending`); }
    reviewApproval(id, body) {
        return this.http.post(`${this.base}/approvals/${id}/review`, body);
    }
    getPendingCorrections() { return this.http.get(`${this.base}/corrections/pending`); }
    reviewCorrection(id, body) {
        return this.http.post(`${this.base}/corrections/${id}/review`, body);
    }
    static ɵfac = function ApprovalService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApprovalService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApprovalService, factory: ApprovalService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApprovalService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
