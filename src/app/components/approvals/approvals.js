import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApprovalService } from '../../services/approval';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.id;
function Approvals_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function Approvals_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtext(1, "Loading requests\u2026");
    i0.ɵɵelementEnd();
} }
function Approvals_Conditional_22_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 15)(1, "div", 17)(2, "div")(3, "h2", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 4);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 19);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "span", 20);
    i0.ɵɵtext(11, "Pending");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 21)(13, "button", 22);
    i0.ɵɵlistener("click", function Approvals_Conditional_22_For_1_Template_button_click_13_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.review("late", item_r3, "APPROVE")); });
    i0.ɵɵtext(14, "Approve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 23);
    i0.ɵɵlistener("click", function Approvals_Conditional_22_For_1_Template_button_click_15_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.review("late", item_r3, "REJECT")); });
    i0.ɵɵtext(16, "Reject");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.employee(item_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Late arrival \u00B7 ", i0.ɵɵpipeBind2(7, 5, ctx_r0.date(item_r3), "medium"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.attendanceRecord?.employeeProfile?.designation || "Attendance approval request");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r0.busyId === item_r3.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.busyId === item_r3.id);
} }
function Approvals_Conditional_22_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtext(1, "No pending late-arrival approvals.");
    i0.ɵɵelementEnd();
} }
function Approvals_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, Approvals_Conditional_22_For_1_Template, 17, 8, "article", 15, _forTrack0, false, Approvals_Conditional_22_ForEmpty_2_Template, 2, 0, "div", 16);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r0.approvals);
} }
function Approvals_Conditional_23_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 15)(1, "div", 17)(2, "div")(3, "h2", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 4);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 19);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 24);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "span", 20);
    i0.ɵɵtext(15, "Pending");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 21)(17, "button", 22);
    i0.ɵɵlistener("click", function Approvals_Conditional_23_For_1_Template_button_click_17_listener() { const item_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.review("correction", item_r5, "APPROVE")); });
    i0.ɵɵtext(18, "Approve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 23);
    i0.ɵɵlistener("click", function Approvals_Conditional_23_For_1_Template_button_click_19_listener() { const item_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.review("correction", item_r5, "REJECT")); });
    i0.ɵɵtext(20, "Reject");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.employee(item_r5));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Correction requested \u00B7 ", i0.ɵɵpipeBind2(7, 7, ctx_r0.date(item_r5), "medium"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r5.reason || item_r5.requestReason || "Attendance time correction");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Requested punch-in: ", i0.ɵɵpipeBind2(12, 10, item_r5.requestedPunchInAt, "short"), " \u00B7 Punch-out: ", item_r5.requestedPunchOutAt ? i0.ɵɵpipeBind2(13, 13, item_r5.requestedPunchOutAt, "short") : "Not provided");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", ctx_r0.busyId === item_r5.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.busyId === item_r5.id);
} }
function Approvals_Conditional_23_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtext(1, "No pending correction requests.");
    i0.ɵɵelementEnd();
} }
function Approvals_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, Approvals_Conditional_23_For_1_Template, 21, 16, "article", 15, _forTrack0, false, Approvals_Conditional_23_ForEmpty_2_Template, 2, 0, "div", 16);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r0.corrections);
} }
export class Approvals {
    api = inject(ApprovalService);
    activeTab = 'late';
    approvals = [];
    corrections = [];
    loading = true;
    error = '';
    busyId = '';
    rejectionReason = '';
    ngOnInit() { this.load(); }
    load() {
        this.loading = true;
        this.error = '';
        this.api.getPendingApprovals().subscribe({ next: rows => { this.approvals = rows ?? []; this.loadCorrections(); }, error: e => { this.error = e?.error?.message || 'Unable to load pending approvals.'; this.loading = false; } });
    }
    loadCorrections() {
        this.api.getPendingCorrections().subscribe({ next: rows => { this.corrections = rows ?? []; this.loading = false; }, error: e => { this.error = e?.error?.message || 'Unable to load correction requests.'; this.loading = false; } });
    }
    review(kind, item, action) {
        const reason = this.rejectionReason.trim();
        if (action === 'REJECT' && !reason) {
            this.error = 'Please enter a rejection reason.';
            return;
        }
        const id = kind === 'late' ? item.id : item.id;
        this.busyId = id;
        this.error = '';
        const request = kind === 'late' ? this.api.reviewApproval(id, { action, rejectionReason: action === 'REJECT' ? reason : undefined }) : this.api.reviewCorrection(id, { action, rejectionReason: action === 'REJECT' ? reason : undefined });
        request.subscribe({ next: () => { this.busyId = ''; this.rejectionReason = ''; this.load(); }, error: e => { this.busyId = ''; this.error = e?.error?.message || 'Unable to submit this decision.'; } });
    }
    employee(item) { const p = item?.attendanceRecord?.employeeProfile ?? item?.employeeProfile; return [p?.firstName, p?.lastName].filter(Boolean).join(' ') || p?.user?.email || 'Employee'; }
    date(item) { return item?.punchInAt ?? item?.requestedPunchInAt ?? item?.createdAt; }
    static ɵfac = function Approvals_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Approvals)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Approvals, selectors: [["app-approvals"]], decls: 30, vars: 13, consts: [[1, "mx-auto", "max-w-7xl", "space-y-6", "p-4", "sm:p-6"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "text-sm", "font-semibold", "text-blue-600"], [1, "text-2xl", "font-bold", "text-slate-900"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "rounded-xl", "border", "border-slate-200", "px-4", "py-2", "text-sm", "font-semibold", "text-slate-700", "hover:bg-slate-50", 3, "click"], [1, "rounded-xl", "border", "border-red-200", "bg-red-50", "p-3", "text-sm", "text-red-700"], [1, "flex", "gap-2", "border-b", "border-slate-200"], [1, "border-b-2", "px-4", "py-3", "text-sm", "font-semibold", 3, "click"], [1, "ml-1", "rounded-full", "bg-slate-100", "px-2", "py-0.5"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-10", "text-center", "text-slate-500"], [1, "text-xs", "text-slate-400"], [1, "rounded-xl", "border", "border-slate-200", "bg-white", "p-4"], [1, "mb-2", "block", "text-sm", "font-semibold", "text-slate-700"], ["placeholder", "Reason required when rejecting a request", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-5", "shadow-sm"], [1, "rounded-2xl", "border", "border-dashed", "border-slate-300", "p-10", "text-center", "text-slate-500"], [1, "flex", "flex-wrap", "items-start", "justify-between", "gap-3"], [1, "font-bold", "text-slate-900"], [1, "mt-2", "text-sm", "text-slate-600"], [1, "rounded-full", "bg-amber-50", "px-3", "py-1", "text-xs", "font-bold", "text-amber-700"], [1, "mt-4", "flex", "flex-wrap", "gap-2"], [1, "rounded-lg", "bg-emerald-600", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "disabled:opacity-50", 3, "click", "disabled"], [1, "rounded-lg", "bg-red-600", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "disabled:opacity-50", 3, "click", "disabled"], [1, "mt-2", "text-xs", "text-slate-500"]], template: function Approvals_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "WORKFLOW");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 3);
            i0.ɵɵtext(6, "Approvals");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Review late-arrival approvals and employee attendance corrections.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "button", 5);
            i0.ɵɵlistener("click", function Approvals_Template_button_click_9_listener() { return ctx.load(); });
            i0.ɵɵtext(10, "Refresh");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(11, Approvals_Conditional_11_Template, 2, 1, "div", 6);
            i0.ɵɵelementStart(12, "div", 7)(13, "button", 8);
            i0.ɵɵlistener("click", function Approvals_Template_button_click_13_listener() { return ctx.activeTab = "late"; });
            i0.ɵɵtext(14, "Late arrivals ");
            i0.ɵɵelementStart(15, "span", 9);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "button", 8);
            i0.ɵɵlistener("click", function Approvals_Template_button_click_17_listener() { return ctx.activeTab = "corrections"; });
            i0.ɵɵtext(18, "Corrections ");
            i0.ɵɵelementStart(19, "span", 9);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(21, Approvals_Conditional_21_Template, 2, 0, "div", 10)(22, Approvals_Conditional_22_Template, 3, 1)(23, Approvals_Conditional_23_Template, 3, 1);
            i0.ɵɵelementStart(24, "p", 11);
            i0.ɵɵtext(25, "For rejection, enter a reason in the form below before selecting Reject.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 12)(27, "label", 13);
            i0.ɵɵtext(28, "Rejection reason");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "input", 14);
            i0.ɵɵcontrolCreate();
            i0.ɵɵtwoWayListener("ngModelChange", function Approvals_Template_input_ngModelChange_29_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.rejectionReason, $event) || (ctx.rejectionReason = $event); return $event; });
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(ctx.error ? 11 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-blue-600", ctx.activeTab === "late")("text-blue-700", ctx.activeTab === "late");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.approvals.length);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("border-blue-600", ctx.activeTab === "corrections")("text-blue-700", ctx.activeTab === "corrections");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.corrections.length);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading ? 21 : ctx.activeTab === "late" ? 22 : 23);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.rejectionReason);
            i0.ɵɵcontrol();
        } }, dependencies: [CommonModule, FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, i2.DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Approvals, [{
        type: Component,
        args: [{ selector: 'app-approvals', standalone: true, imports: [CommonModule, FormsModule, DatePipe], template: "<section class=\"mx-auto max-w-7xl space-y-6 p-4 sm:p-6\">\n  <div class=\"flex flex-wrap items-center justify-between gap-3\">\n    <div><p class=\"text-sm font-semibold text-blue-600\">WORKFLOW</p><h1 class=\"text-2xl font-bold text-slate-900\">Approvals</h1><p class=\"mt-1 text-sm text-slate-500\">Review late-arrival approvals and employee attendance corrections.</p></div>\n    <button (click)=\"load()\" class=\"rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50\">Refresh</button>\n  </div>\n  @if (error) { <div class=\"rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700\">{{ error }}</div> }\n  <div class=\"flex gap-2 border-b border-slate-200\">\n    <button (click)=\"activeTab='late'\" [class.border-blue-600]=\"activeTab==='late'\" [class.text-blue-700]=\"activeTab==='late'\" class=\"border-b-2 px-4 py-3 text-sm font-semibold\">Late arrivals <span class=\"ml-1 rounded-full bg-slate-100 px-2 py-0.5\">{{ approvals.length }}</span></button>\n    <button (click)=\"activeTab='corrections'\" [class.border-blue-600]=\"activeTab==='corrections'\" [class.text-blue-700]=\"activeTab==='corrections'\" class=\"border-b-2 px-4 py-3 text-sm font-semibold\">Corrections <span class=\"ml-1 rounded-full bg-slate-100 px-2 py-0.5\">{{ corrections.length }}</span></button>\n  </div>\n  @if (loading) { <div class=\"rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500\">Loading requests\u2026</div> }\n  @else if (activeTab==='late') {\n    @for (item of approvals; track item.id) {\n      <article class=\"rounded-2xl border border-slate-200 bg-white p-5 shadow-sm\">\n        <div class=\"flex flex-wrap items-start justify-between gap-3\"><div><h2 class=\"font-bold text-slate-900\">{{ employee(item) }}</h2><p class=\"mt-1 text-sm text-slate-500\">Late arrival \u00B7 {{ date(item) | date:'medium' }}</p><p class=\"mt-2 text-sm text-slate-600\">{{ item.attendanceRecord?.employeeProfile?.designation || 'Attendance approval request' }}</p></div><span class=\"rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700\">Pending</span></div>\n        <div class=\"mt-4 flex flex-wrap gap-2\"><button [disabled]=\"busyId===item.id\" (click)=\"review('late',item,'APPROVE')\" class=\"rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50\">Approve</button><button [disabled]=\"busyId===item.id\" (click)=\"review('late',item,'REJECT')\" class=\"rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50\">Reject</button></div>\n      </article>\n    } @empty { <div class=\"rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500\">No pending late-arrival approvals.</div> }\n  } @else {\n    @for (item of corrections; track item.id) {\n      <article class=\"rounded-2xl border border-slate-200 bg-white p-5 shadow-sm\">\n        <div class=\"flex flex-wrap items-start justify-between gap-3\"><div><h2 class=\"font-bold text-slate-900\">{{ employee(item) }}</h2><p class=\"mt-1 text-sm text-slate-500\">Correction requested \u00B7 {{ date(item) | date:'medium' }}</p><p class=\"mt-2 text-sm text-slate-600\">{{ item.reason || item.requestReason || 'Attendance time correction' }}</p><p class=\"mt-2 text-xs text-slate-500\">Requested punch-in: {{ item.requestedPunchInAt | date:'short' }} \u00B7 Punch-out: {{ item.requestedPunchOutAt ? (item.requestedPunchOutAt | date:'short') : 'Not provided' }}</p></div><span class=\"rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700\">Pending</span></div>\n        <div class=\"mt-4 flex flex-wrap gap-2\"><button [disabled]=\"busyId===item.id\" (click)=\"review('correction',item,'APPROVE')\" class=\"rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50\">Approve</button><button [disabled]=\"busyId===item.id\" (click)=\"review('correction',item,'REJECT')\" class=\"rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50\">Reject</button></div>\n      </article>\n    } @empty { <div class=\"rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500\">No pending correction requests.</div> }\n  }\n  <p class=\"text-xs text-slate-400\">For rejection, enter a reason in the form below before selecting Reject.</p>\n  <div class=\"rounded-xl border border-slate-200 bg-white p-4\"><label class=\"mb-2 block text-sm font-semibold text-slate-700\">Rejection reason</label><input [(ngModel)]=\"rejectionReason\" class=\"w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500\" placeholder=\"Reason required when rejecting a request\" /></div>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Approvals, { className: "Approvals", filePath: "src/app/components/approvals/approvals.ts", lineNumber: 10 }); })();
