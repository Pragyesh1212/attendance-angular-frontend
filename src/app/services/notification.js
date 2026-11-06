import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export class NotificationService {
    http = inject(HttpClient);
    base = '/attendance-api/notifications';
    getNotifications(page = 1, limit = 30, unreadOnly = false) {
        return this.http.get(this.base, { params: { page, limit, unreadOnly } });
    }
    getUnreadCount() { return this.http.get(`${this.base}/unread-count`); }
    markAsRead(id) { return this.http.patch(`${this.base}/${id}/read`, {}); }
    markAllAsRead() { return this.http.patch(`${this.base}/read-all`, {}); }
    static ɵfac = function NotificationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
