import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function Notifications_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function Notifications_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1, "Loading notifications\u2026");
    i0.ɵɵelementEnd();
} }
function Notifications_Conditional_16_For_2_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function Notifications_Conditional_16_For_2_Conditional_12_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.markRead(item_r3)); });
    i0.ɵɵtext(1, "Mark as read");
    i0.ɵɵelementEnd();
} }
function Notifications_Conditional_16_For_2_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 23);
} }
function Notifications_Conditional_16_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 13)(1, "div", 14);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 15)(4, "div", 16)(5, "h2", 17);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "time", 18);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "p", 19);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, Notifications_Conditional_16_For_2_Conditional_12_Template, 2, 0, "button", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, Notifications_Conditional_16_For_2_span_13_Template, 1, 0, "span", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("bg-blue-50/50", !item_r3.isRead);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.icon(item_r3.type));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 8, item_r3.createdAt, "medium"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.message);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!item_r3.isRead ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !item_r3.isRead);
} }
function Notifications_Conditional_16_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "div", 24);
    i0.ɵɵtext(2, "\u2667");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 25);
    i0.ɵɵtext(4, "You're all caught up");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 4);
    i0.ɵɵtext(6, "New notifications will appear here.");
    i0.ɵɵelementEnd()();
} }
function Notifications_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵrepeaterCreate(1, Notifications_Conditional_16_For_2_Template, 14, 11, "article", 11, _forTrack0, false, Notifications_Conditional_16_ForEmpty_3_Template, 7, 0, "div", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.notifications);
} }
export class Notifications {
    api = inject(NotificationService);
    notifications = [];
    unreadCount = 0;
    loading = true;
    error = '';
    unreadOnly = false;
    busy = false;
    ngOnInit() { this.load(); }
    load() {
        this.loading = true;
        this.error = '';
        this.api.getNotifications(1, 50, this.unreadOnly).subscribe({ next: response => { this.notifications = response?.notifications ?? []; this.loading = false; }, error: e => { this.error = e?.error?.message || 'Unable to load notifications.'; this.loading = false; } });
        this.api.getUnreadCount().subscribe({ next: r => this.unreadCount = r.unreadCount ?? 0 });
    }
    markRead(item) { if (item.isRead)
        return; this.api.markAsRead(item.id).subscribe({ next: () => { item.isRead = true; this.unreadCount = Math.max(0, this.unreadCount - 1); } }); }
    markAll() { this.busy = true; this.api.markAllAsRead().subscribe({ next: () => { this.notifications.forEach(n => n.isRead = true); this.unreadCount = 0; this.busy = false; }, error: e => { this.error = e?.error?.message || 'Unable to mark notifications as read.'; this.busy = false; } }); }
    icon(type) { return type === 'ATTENDANCE_APPROVAL' ? '✓' : type === 'ATTENDANCE_CORRECTION' ? '◷' : 'i'; }
    static ɵfac = function Notifications_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Notifications)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Notifications, selectors: [["app-notifications"]], decls: 17, vars: 5, consts: [[1, "mx-auto", "max-w-5xl", "space-y-6", "p-4", "sm:p-6"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "text-sm", "font-semibold", "text-blue-600"], [1, "text-2xl", "font-bold", "text-slate-900"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "rounded-xl", "bg-blue-600", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "disabled:opacity-50", 3, "click", "disabled"], [1, "rounded-xl", "border", "border-red-200", "bg-red-50", "p-3", "text-sm", "text-red-700"], [1, "inline-flex", "items-center", "gap-2", "text-sm", "font-medium", "text-slate-600"], ["type", "checkbox", 3, "ngModelChange", "change", "ngModel"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-10", "text-center", "text-slate-500"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white"], [1, "flex", "gap-4", "border-b", "border-slate-100", "p-5", "last:border-0", 3, "bg-blue-50/50"], [1, "p-12", "text-center"], [1, "flex", "gap-4", "border-b", "border-slate-100", "p-5", "last:border-0"], [1, "flex", "h-10", "w-10", "shrink-0", "items-center", "justify-center", "rounded-xl", "bg-blue-100", "font-bold", "text-blue-700"], [1, "min-w-0", "flex-1"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-2"], [1, "font-semibold", "text-slate-900"], [1, "text-xs", "text-slate-400"], [1, "mt-1", "text-sm", "leading-6", "text-slate-600"], [1, "mt-3", "text-xs", "font-bold", "text-blue-700", "hover:underline"], ["class", "mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600", 4, "ngIf"], [1, "mt-3", "text-xs", "font-bold", "text-blue-700", "hover:underline", 3, "click"], [1, "mt-2", "h-2", "w-2", "shrink-0", "rounded-full", "bg-blue-600"], [1, "text-3xl"], [1, "mt-3", "font-semibold", "text-slate-800"]], template: function Notifications_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "UPDATES");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 3);
            i0.ɵɵtext(6, "Notifications");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "button", 5);
            i0.ɵɵlistener("click", function Notifications_Template_button_click_9_listener() { return ctx.markAll(); });
            i0.ɵɵtext(10, "Mark all as read");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(11, Notifications_Conditional_11_Template, 2, 1, "div", 6);
            i0.ɵɵelementStart(12, "label", 7)(13, "input", 8);
            i0.ɵɵcontrolCreate();
            i0.ɵɵtwoWayListener("ngModelChange", function Notifications_Template_input_ngModelChange_13_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.unreadOnly, $event) || (ctx.unreadOnly = $event); return $event; });
            i0.ɵɵlistener("change", function Notifications_Template_input_change_13_listener() { return ctx.load(); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(14, " Show unread only");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(15, Notifications_Conditional_15_Template, 2, 0, "div", 9)(16, Notifications_Conditional_16_Template, 4, 1, "div", 10);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1("You have ", ctx.unreadCount, " unread notifications.");
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.busy || ctx.unreadCount === 0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.error ? 11 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.unreadOnly);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading ? 15 : 16);
        } }, dependencies: [CommonModule, i1.NgIf, FormsModule, i2.CheckboxControlValueAccessor, i2.NgControlStatus, i2.NgModel, i1.DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Notifications, [{
        type: Component,
        args: [{ selector: 'app-notifications', standalone: true, imports: [CommonModule, DatePipe, FormsModule], template: "<section class=\"mx-auto max-w-5xl space-y-6 p-4 sm:p-6\">\n  <div class=\"flex flex-wrap items-center justify-between gap-3\"><div><p class=\"text-sm font-semibold text-blue-600\">UPDATES</p><h1 class=\"text-2xl font-bold text-slate-900\">Notifications</h1><p class=\"mt-1 text-sm text-slate-500\">You have {{ unreadCount }} unread notifications.</p></div><button [disabled]=\"busy || unreadCount===0\" (click)=\"markAll()\" class=\"rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50\">Mark all as read</button></div>\n  @if (error) { <div class=\"rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700\">{{ error }}</div> }\n  <label class=\"inline-flex items-center gap-2 text-sm font-medium text-slate-600\"><input type=\"checkbox\" [(ngModel)]=\"unreadOnly\" (change)=\"load()\" /> Show unread only</label>\n  @if (loading) { <div class=\"rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500\">Loading notifications\u2026</div> }\n  @else {\n    <div class=\"overflow-hidden rounded-2xl border border-slate-200 bg-white\">\n      @for (item of notifications; track item.id) {\n        <article class=\"flex gap-4 border-b border-slate-100 p-5 last:border-0\" [class.bg-blue-50/50]=\"!item.isRead\"><div class=\"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700\">{{ icon(item.type) }}</div><div class=\"min-w-0 flex-1\"><div class=\"flex flex-wrap items-center justify-between gap-2\"><h2 class=\"font-semibold text-slate-900\">{{ item.title }}</h2><time class=\"text-xs text-slate-400\">{{ item.createdAt | date:'medium' }}</time></div><p class=\"mt-1 text-sm leading-6 text-slate-600\">{{ item.message }}</p>@if (!item.isRead) { <button (click)=\"markRead(item)\" class=\"mt-3 text-xs font-bold text-blue-700 hover:underline\">Mark as read</button> }</div><span *ngIf=\"!item.isRead\" class=\"mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600\"></span></article>\n      } @empty { <div class=\"p-12 text-center\"><div class=\"text-3xl\">\u2667</div><p class=\"mt-3 font-semibold text-slate-800\">You're all caught up</p><p class=\"mt-1 text-sm text-slate-500\">New notifications will appear here.</p></div> }\n    </div>\n  }\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Notifications, { className: "Notifications", filePath: "src/app/components/notifications/notifications.ts", lineNumber: 7 }); })();
