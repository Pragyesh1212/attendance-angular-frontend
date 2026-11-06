import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize } from 'rxjs';
import { Auth } from '../../services/auth';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.title;
const _forTrack1 = ($index, $item) => $item.name;
const _forTrack2 = ($index, $item) => $item.date;
function Dashboard_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1);
    i0.ɵɵdomElement(1, "div", 3);
    i0.ɵɵdomElementStart(2, "p", 4);
    i0.ɵɵtext(3, "Loading dashboard...");
    i0.ɵɵdomElementEnd()();
} }
function Dashboard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.errorMessage, " ");
} }
function Dashboard_Conditional_3_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" Welcome back, ", ctx_r0.employeeName, ". Here's your attendance summary. ");
} }
function Dashboard_Conditional_3_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Monitor company-wide workforce and attendance performance. ");
} }
function Dashboard_Conditional_3_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 9)(1, "div", 12)(2, "p", 13);
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "div", 14);
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(6, "h3", 15);
    i0.ɵɵtext(7);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "p", 16);
    i0.ɵɵtext(9);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const card_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", card_r2.title, " ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bg-blue-50", card_r2.color === "blue")("text-blue-600", card_r2.color === "blue")("bg-green-50", card_r2.color === "green")("text-green-600", card_r2.color === "green")("bg-red-50", card_r2.color === "red")("text-red-600", card_r2.color === "red")("bg-purple-50", card_r2.color === "purple")("text-purple-600", card_r2.color === "purple");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", card_r2.icon, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", card_r2.value, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", card_r2.change, " ");
} }
function Dashboard_Conditional_3_Conditional_10_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 26)(1, "span", 27);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "div", 28);
    i0.ɵɵdomElement(4, "div", 29);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "span", 30);
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r3.value, "% ");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("height", item_r3.value, "%");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", item_r3.date.substring(8, 10), " ");
} }
function Dashboard_Conditional_3_Conditional_10_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 22);
    i0.ɵɵrepeaterCreate(1, Dashboard_Conditional_3_Conditional_10_Conditional_10_For_2_Template, 7, 4, "div", 26, _forTrack2);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.attendanceTrend);
} }
function Dashboard_Conditional_3_Conditional_10_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 23)(1, "p", 25);
    i0.ɵɵtext(2, " No attendance trend data available. ");
    i0.ɵɵdomElementEnd()();
} }
function Dashboard_Conditional_3_Conditional_10_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div")(1, "div", 31)(2, "span", 32);
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "span", 30);
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(6, "div", 33);
    i0.ɵɵdomElement(7, "div", 34);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const department_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", department_r4.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", department_r4.present, "/", department_r4.total, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", department_r4.percentage, "%");
} }
function Dashboard_Conditional_3_Conditional_10_ForEmpty_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 25);
    i0.ɵɵtext(1, " No department data available. ");
    i0.ɵɵdomElementEnd();
} }
function Dashboard_Conditional_3_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 10)(1, "div", 17)(2, "div", 18)(3, "div")(4, "h3", 19);
    i0.ɵɵtext(5, " Attendance Overview ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "p", 20);
    i0.ɵɵtext(7, " Daily attendance percentage for the selected month ");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(8, "span", 21);
    i0.ɵɵtext(9, " This Month ");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵconditionalCreate(10, Dashboard_Conditional_3_Conditional_10_Conditional_10_Template, 3, 0, "div", 22)(11, Dashboard_Conditional_3_Conditional_10_Conditional_11_Template, 3, 0, "div", 23);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(12, "div", 9)(13, "h3", 19);
    i0.ɵɵtext(14, " Department Attendance ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(15, "p", 20);
    i0.ɵɵtext(16, " Present employees by department ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(17, "div", 24);
    i0.ɵɵrepeaterCreate(18, Dashboard_Conditional_3_Conditional_10_For_19_Template, 8, 5, "div", null, _forTrack1, false, Dashboard_Conditional_3_Conditional_10_ForEmpty_20_Template, 2, 0, "p", 25);
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵconditional(ctx_r0.attendanceTrend.length > 0 ? 10 : 11);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r0.departments);
} }
function Dashboard_Conditional_3_Conditional_11_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "tr", 41)(1, "td", 42);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "td", 43);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "td", 43);
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(7, "td", 43);
    i0.ɵɵtext(8);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "td", 44)(10, "span", 45);
    i0.ɵɵtext(11);
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const record_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", record_r5.date, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", record_r5.punchIn, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", record_r5.punchOut, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", record_r5.workHours, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-green-50", record_r5.status === "PRESENT")("text-green-700", record_r5.status === "PRESENT")("bg-red-50", record_r5.status === "ABSENT")("text-red-700", record_r5.status === "ABSENT")("bg-yellow-50", record_r5.status === "LATE")("text-yellow-700", record_r5.status === "LATE")("bg-purple-50", record_r5.status === "HALF_DAY")("text-purple-700", record_r5.status === "HALF_DAY");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", record_r5.status.replace("_", " "), " ");
} }
function Dashboard_Conditional_3_Conditional_11_ForEmpty_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "tr")(1, "td", 46);
    i0.ɵɵtext(2, " No attendance records found. ");
    i0.ɵɵdomElementEnd()();
} }
function Dashboard_Conditional_3_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 11)(1, "div", 35)(2, "h3", 19);
    i0.ɵɵtext(3, " My Recent Attendance ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "p", 20);
    i0.ɵɵtext(5, " Your latest attendance records ");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(6, "div", 36)(7, "table", 37)(8, "thead", 38)(9, "tr")(10, "th", 39);
    i0.ɵɵtext(11, "Date");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(12, "th", 39);
    i0.ɵɵtext(13, "Punch In");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(14, "th", 39);
    i0.ɵɵtext(15, "Punch Out");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(16, "th", 39);
    i0.ɵɵtext(17, "Work Hours");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(18, "th", 39);
    i0.ɵɵtext(19, "Status");
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(20, "tbody", 40);
    i0.ɵɵrepeaterCreate(21, Dashboard_Conditional_3_Conditional_11_For_22_Template, 12, 21, "tr", 41, _forTrack2, false, Dashboard_Conditional_3_Conditional_11_ForEmpty_23_Template, 3, 0, "tr");
    i0.ɵɵdomElementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(21);
    i0.ɵɵrepeater(ctx_r0.recentAttendance);
} }
function Dashboard_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 5)(1, "div")(2, "h2", 6);
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "p", 7);
    i0.ɵɵconditionalCreate(5, Dashboard_Conditional_3_Conditional_5_Template, 1, 1)(6, Dashboard_Conditional_3_Conditional_6_Template, 1, 0);
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(7, "div", 8);
    i0.ɵɵrepeaterCreate(8, Dashboard_Conditional_3_For_9_Template, 10, 20, "div", 9, _forTrack0);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(10, Dashboard_Conditional_3_Conditional_10_Template, 21, 2, "div", 10);
    i0.ɵɵconditionalCreate(11, Dashboard_Conditional_3_Conditional_11_Template, 24, 1, "div", 11);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.isEmployee ? "My Dashboard" : "Company Overview", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.isEmployee ? 5 : 6);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.summaryCards);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r0.isEmployee ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.isEmployee ? 11 : -1);
} }
export class Dashboard {
    http = inject(HttpClient);
    auth = inject(Auth);
    cdr = inject(ChangeDetectorRef);
    API_URL = '/attendance-api/dashboard';
    userRole = this.auth.getUser()?.role ?? '';
    isEmployee = this.userRole === 'EMPLOYEE';
    isLoading = true;
    errorMessage = '';
    summaryCards = [];
    attendanceTrend = [];
    departments = [];
    recentAttendance = [];
    ngOnInit() {
        if (this.isEmployee) {
            this.loadEmployeeDashboard();
        }
        else {
            this.loadAdminDashboard();
        }
    }
    loadAdminDashboard() {
        const now = new Date();
        const params = new HttpParams()
            .set('month', now.getMonth() + 1)
            .set('year', now.getFullYear());
        let completedRequests = 0;
        const handleRequestComplete = () => {
            completedRequests++;
            if (completedRequests === 3) {
                this.isLoading = false;
            }
            // Notify Angular that component data has changed.
            this.cdr.markForCheck();
        };
        // ==========================================
        // 1. COMPANY OVERVIEW
        // ==========================================
        this.http
            .get(`${this.API_URL}/overview`)
            .pipe(finalize(() => handleRequestComplete()))
            .subscribe({
            next: (data) => {
                const attendance = data.attendance;
                this.summaryCards = [
                    {
                        title: 'Total Admins',
                        value: data.totalAdmins,
                        change: 'Active administrators',
                        icon: '♟',
                        color: 'purple',
                    },
                    {
                        title: 'Total Employees',
                        value: data.totalEmployees,
                        change: 'Active employees across departments',
                        icon: '👥',
                        color: 'blue',
                    },
                    {
                        title: 'Present Today',
                        value: attendance.present + attendance.late,
                        change: `${attendance.present} present, ${attendance.late} late`,
                        icon: '✓',
                        color: 'green',
                    },
                    {
                        title: 'Attendance Rate',
                        value: `${attendance.attendancePercentage}%`,
                        change: 'Based on today’s attendance',
                        icon: '↗',
                        color: 'purple',
                    },
                ];
                this.cdr.markForCheck();
            },
            error: (error) => {
                console.error('Overview API error:', error);
                this.errorMessage = 'Unable to load company overview.';
                this.cdr.markForCheck();
            }
        });
        // ==========================================
        // 2. ATTENDANCE TREND
        // ==========================================
        this.http
            .get(`${this.API_URL}/attendance-trend`, { params })
            .pipe(finalize(() => handleRequestComplete()))
            .subscribe({
            next: (data) => {
                const trend = Array.isArray(data?.trend)
                    ? data.trend
                    : [];
                this.attendanceTrend = trend.map((item) => {
                    const total = item.present +
                        item.late +
                        item.absent +
                        item.halfDay +
                        item.onLeave;
                    const attended = item.present +
                        item.late +
                        item.halfDay;
                    return {
                        ...item,
                        value: total > 0
                            ? Number(((attended / total) * 100).toFixed(1))
                            : 0
                    };
                });
                this.cdr.markForCheck();
            },
            error: (error) => {
                console.error('Attendance trend API error:', error);
                this.errorMessage = 'Unable to load attendance trend.';
                this.cdr.markForCheck();
            }
        });
        // ==========================================
        // 3. DEPARTMENT STATISTICS
        // ==========================================
        this.http
            .get(`${this.API_URL}/department-stats`)
            .pipe(finalize(() => handleRequestComplete()))
            .subscribe({
            next: (data) => {
                const departmentData = Array.isArray(data)
                    ? data
                    : [];
                this.departments = departmentData.map((department) => ({
                    name: department.departmentName,
                    present: department.present,
                    total: department.totalEmployees,
                    percentage: department.totalEmployees > 0
                        ? Number(((department.present /
                            department.totalEmployees) * 100).toFixed(1))
                        : 0
                }));
                this.cdr.markForCheck();
            },
            error: (error) => {
                console.error('Department statistics API error:', error);
                this.errorMessage =
                    'Unable to load department statistics.';
                this.cdr.markForCheck();
            }
        });
    }
    // ==========================================
    // EMPLOYEE DASHBOARD
    // ==========================================
    loadEmployeeDashboard() {
        this.http
            .get(`${this.API_URL}/my-stats`)
            .pipe(finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }))
            .subscribe({
            next: (data) => {
                const summary = data.summary;
                this.summaryCards = [
                    {
                        title: 'Recorded Days',
                        value: summary.totalRecordedDays,
                        change: 'Total attendance records',
                        icon: '📅',
                        color: 'blue',
                    },
                    {
                        title: 'Present Days',
                        value: summary.present,
                        change: 'Days marked present',
                        icon: '✓',
                        color: 'green',
                    },
                    {
                        title: 'Late Days',
                        value: summary.late,
                        change: 'Days marked late',
                        icon: '⏰',
                        color: 'purple',
                    },
                    {
                        title: 'Attendance Rate',
                        value: `${summary.attendancePercentage}%`,
                        change: `${summary.totalWorkHours} total work hours`,
                        icon: '↗',
                        color: 'blue',
                    },
                ];
                this.recentAttendance = (data.recentAttendance || []).map((record) => {
                    const latestSession = record.sessions?.[0];
                    return {
                        date: this.formatDate(record.workDate),
                        punchIn: this.formatTime(latestSession?.punchInAt),
                        punchOut: this.formatTime(latestSession?.punchOutAt),
                        workHours: `${(record.totalWorkMinutes / 60).toFixed(2)} hrs`,
                        status: record.status,
                    };
                });
                this.cdr.markForCheck();
            },
            error: (error) => {
                console.error('Employee dashboard API error:', error);
                this.errorMessage =
                    'Unable to load your attendance details.';
                this.cdr.markForCheck();
            }
        });
    }
    // ==========================================
    // DATE FORMATTING
    // ==========================================
    formatDate(value) {
        if (!value)
            return '--';
        return new Date(value).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    }
    // ==========================================
    // TIME FORMATTING
    // ==========================================
    formatTime(value) {
        if (!value)
            return '--';
        return new Date(value).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    }
    // ==========================================
    // EMPLOYEE NAME
    // ==========================================
    get employeeName() {
        const user = this.auth.getUser();
        return user?.employeeProfile?.firstName
            || user?.email?.split('@')[0]
            || 'Employee';
    }
    static ɵfac = function Dashboard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Dashboard)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Dashboard, selectors: [["app-dashboard"]], decls: 4, vars: 3, consts: [[1, "space-y-6"], [1, "rounded-xl", "border", "border-slate-200", "bg-white", "p-10", "text-center", "shadow-sm"], [1, "rounded-xl", "border", "border-red-200", "bg-red-50", "p-4", "text-sm", "text-red-700"], [1, "mx-auto", "h-8", "w-8", "animate-spin", "rounded-full", "border-4", "border-blue-100", "border-t-blue-600"], [1, "mt-4", "text-sm", "text-slate-500"], [1, "flex", "flex-col", "justify-between", "gap-3", "sm:flex-row", "sm:items-center"], [1, "text-2xl", "font-bold", "text-slate-800"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2", "xl:grid-cols-4"], [1, "rounded-xl", "border", "border-slate-200", "bg-white", "p-5", "shadow-sm"], [1, "grid", "grid-cols-1", "gap-6", "xl:grid-cols-3"], [1, "overflow-hidden", "rounded-xl", "border", "border-slate-200", "bg-white", "shadow-sm"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "h-10", "w-10", "items-center", "justify-center", "rounded-lg", "text-lg", "font-bold"], [1, "mt-4", "text-3xl", "font-bold", "text-slate-800"], [1, "mt-2", "text-xs", "text-slate-500"], [1, "rounded-xl", "border", "border-slate-200", "bg-white", "p-5", "shadow-sm", "xl:col-span-2"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "font-semibold", "text-slate-800"], [1, "mt-1", "text-xs", "text-slate-500"], [1, "rounded-lg", "bg-blue-50", "px-3", "py-2", "text-xs", "font-medium", "text-blue-700"], [1, "mt-8", "flex", "h-56", "items-end", "justify-around", "gap-2", "overflow-x-auto", "border-b", "border-slate-100", "pb-2"], [1, "py-16", "text-center"], [1, "mt-6", "space-y-5"], [1, "text-sm", "text-slate-400"], [1, "flex", "h-full", "min-w-8", "flex-1", "flex-col", "items-center", "justify-end", "gap-2"], [1, "text-xs", "font-medium", "text-slate-500"], [1, "flex", "w-full", "max-w-12", "items-end", "overflow-hidden", "rounded-t-md", "bg-blue-100"], [1, "h-full", "w-full", "rounded-t-md", "bg-blue-600"], [1, "text-xs", "text-slate-500"], [1, "mb-2", "flex", "items-center", "justify-between", "gap-2"], [1, "text-sm", "font-medium", "text-slate-700"], [1, "h-2", "overflow-hidden", "rounded-full", "bg-slate-100"], [1, "h-full", "rounded-full", "bg-blue-600"], [1, "border-b", "border-slate-100", "p-5"], [1, "overflow-x-auto"], [1, "w-full", "min-w-[650px]", "text-left"], [1, "bg-slate-50", "text-xs", "uppercase", "text-slate-500"], [1, "px-5", "py-4", "font-semibold"], [1, "divide-y", "divide-slate-100"], [1, "hover:bg-slate-50"], [1, "px-5", "py-4", "text-sm", "font-medium", "text-slate-700"], [1, "px-5", "py-4", "text-sm", "text-slate-600"], [1, "px-5", "py-4"], [1, "rounded-full", "px-3", "py-1", "text-xs", "font-medium"], ["colspan", "5", 1, "px-5", "py-10", "text-center", "text-sm", "text-slate-400"]], template: function Dashboard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, Dashboard_Conditional_1_Template, 4, 0, "div", 1);
            i0.ɵɵconditionalCreate(2, Dashboard_Conditional_2_Template, 2, 1, "div", 2);
            i0.ɵɵconditionalCreate(3, Dashboard_Conditional_3_Template, 12, 4);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isLoading ? 3 : -1);
        } }, styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Dashboard, [{
        type: Component,
        args: [{ selector: 'app-dashboard', standalone: true, imports: [], template: "\n<div class=\"space-y-6\">\n\n  <!-- Loading State -->\n  @if (isLoading) {\n    <div class=\"rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm\">\n      <div class=\"mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600\"></div>\n      <p class=\"mt-4 text-sm text-slate-500\">Loading dashboard...</p>\n    </div>\n  }\n\n  <!-- Error Message -->\n  @if (errorMessage) {\n    <div class=\"rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700\">\n      {{ errorMessage }}\n    </div>\n  }\n\n  @if (!isLoading) {\n\n    <!-- Page Heading -->\n    <div class=\"flex flex-col justify-between gap-3 sm:flex-row sm:items-center\">\n      <div>\n        <h2 class=\"text-2xl font-bold text-slate-800\">\n          {{ isEmployee ? 'My Dashboard' : 'Company Overview' }}\n        </h2>\n\n        <p class=\"mt-1 text-sm text-slate-500\">\n          @if (isEmployee) {\n            Welcome back, {{ employeeName }}. Here's your attendance summary.\n          } @else {\n            Monitor company-wide workforce and attendance performance.\n          }\n        </p>\n      </div>\n    </div>\n\n    <!-- Summary Cards -->\n    <div class=\"grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4\">\n\n      @for (card of summaryCards; track card.title) {\n        <div class=\"rounded-xl border border-slate-200 bg-white p-5 shadow-sm\">\n\n          <div class=\"flex items-center justify-between\">\n            <p class=\"text-sm font-medium text-slate-500\">\n              {{ card.title }}\n            </p>\n\n            <div\n              class=\"flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold\"\n              [class.bg-blue-50]=\"card.color === 'blue'\"\n              [class.text-blue-600]=\"card.color === 'blue'\"\n              [class.bg-green-50]=\"card.color === 'green'\"\n              [class.text-green-600]=\"card.color === 'green'\"\n              [class.bg-red-50]=\"card.color === 'red'\"\n              [class.text-red-600]=\"card.color === 'red'\"\n              [class.bg-purple-50]=\"card.color === 'purple'\"\n              [class.text-purple-600]=\"card.color === 'purple'\">\n\n              {{ card.icon }}\n            </div>\n          </div>\n\n          <h3 class=\"mt-4 text-3xl font-bold text-slate-800\">\n            {{ card.value }}\n          </h3>\n\n          <p class=\"mt-2 text-xs text-slate-500\">\n            {{ card.change }}\n          </p>\n\n        </div>\n      }\n\n    </div>\n\n    <!-- ADMIN / SUPER ADMIN DASHBOARD -->\n    @if (!isEmployee) {\n\n      <div class=\"grid grid-cols-1 gap-6 xl:grid-cols-3\">\n\n        <!-- Attendance Trend -->\n        <div class=\"rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2\">\n\n          <div class=\"flex flex-wrap items-center justify-between gap-3\">\n            <div>\n              <h3 class=\"font-semibold text-slate-800\">\n                Attendance Overview\n              </h3>\n\n              <p class=\"mt-1 text-xs text-slate-500\">\n                Daily attendance percentage for the selected month\n              </p>\n            </div>\n\n            <span class=\"rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700\">\n              This Month\n            </span>\n          </div>\n\n          @if (attendanceTrend.length > 0) {\n\n            <div class=\"mt-8 flex h-56 items-end justify-around gap-2 overflow-x-auto border-b border-slate-100 pb-2\">\n\n              @for (item of attendanceTrend; track item.date) {\n\n                <div class=\"flex h-full min-w-8 flex-1 flex-col items-center justify-end gap-2\">\n\n                  <span class=\"text-xs font-medium text-slate-500\">\n                    {{ item.value }}%\n                  </span>\n\n                  <div\n                    class=\"flex w-full max-w-12 items-end overflow-hidden rounded-t-md bg-blue-100\"\n                    [style.height.%]=\"item.value\">\n\n                    <div class=\"h-full w-full rounded-t-md bg-blue-600\">\n                    </div>\n\n                  </div>\n\n                  <span class=\"text-xs text-slate-500\">\n                    {{ item.date.substring(8, 10) }}\n                  </span>\n\n                </div>\n\n              }\n\n            </div>\n\n          } @else {\n\n            <div class=\"py-16 text-center\">\n              <p class=\"text-sm text-slate-400\">\n                No attendance trend data available.\n              </p>\n            </div>\n\n          }\n\n        </div>\n\n        <!-- Department Statistics -->\n        <div class=\"rounded-xl border border-slate-200 bg-white p-5 shadow-sm\">\n\n          <h3 class=\"font-semibold text-slate-800\">\n            Department Attendance\n          </h3>\n\n          <p class=\"mt-1 text-xs text-slate-500\">\n            Present employees by department\n          </p>\n\n          <div class=\"mt-6 space-y-5\">\n\n            @for (department of departments; track department.name) {\n\n              <div>\n\n                <div class=\"mb-2 flex items-center justify-between gap-2\">\n\n                  <span class=\"text-sm font-medium text-slate-700\">\n                    {{ department.name }}\n                  </span>\n\n                  <span class=\"text-xs text-slate-500\">\n                    {{ department.present }}/{{ department.total }}\n                  </span>\n\n                </div>\n\n                <div class=\"h-2 overflow-hidden rounded-full bg-slate-100\">\n\n                  <div\n                    class=\"h-full rounded-full bg-blue-600\"\n                    [style.width.%]=\"department.percentage\">\n                  </div>\n\n                </div>\n\n              </div>\n\n            } @empty {\n\n              <p class=\"text-sm text-slate-400\">\n                No department data available.\n              </p>\n\n            }\n\n          </div>\n\n        </div>\n\n      </div>\n\n    }\n\n    <!-- EMPLOYEE DASHBOARD -->\n    @if (isEmployee) {\n\n      <div class=\"overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm\">\n\n        <!-- Table Heading -->\n        <div class=\"border-b border-slate-100 p-5\">\n\n          <h3 class=\"font-semibold text-slate-800\">\n            My Recent Attendance\n          </h3>\n\n          <p class=\"mt-1 text-xs text-slate-500\">\n            Your latest attendance records\n          </p>\n\n        </div>\n\n        <!-- Attendance Table -->\n        <div class=\"overflow-x-auto\">\n\n          <table class=\"w-full min-w-[650px] text-left\">\n\n            <thead class=\"bg-slate-50 text-xs uppercase text-slate-500\">\n\n              <tr>\n                <th class=\"px-5 py-4 font-semibold\">Date</th>\n                <th class=\"px-5 py-4 font-semibold\">Punch In</th>\n                <th class=\"px-5 py-4 font-semibold\">Punch Out</th>\n                <th class=\"px-5 py-4 font-semibold\">Work Hours</th>\n                <th class=\"px-5 py-4 font-semibold\">Status</th>\n              </tr>\n\n            </thead>\n\n            <tbody class=\"divide-y divide-slate-100\">\n\n              @for (record of recentAttendance; track record.date) {\n\n                <tr class=\"hover:bg-slate-50\">\n\n                  <td class=\"px-5 py-4 text-sm font-medium text-slate-700\">\n                    {{ record.date }}\n                  </td>\n\n                  <td class=\"px-5 py-4 text-sm text-slate-600\">\n                    {{ record.punchIn }}\n                  </td>\n\n                  <td class=\"px-5 py-4 text-sm text-slate-600\">\n                    {{ record.punchOut }}\n                  </td>\n\n                  <td class=\"px-5 py-4 text-sm text-slate-600\">\n                    {{ record.workHours }}\n                  </td>\n\n                  <td class=\"px-5 py-4\">\n\n                    <span\n                      class=\"rounded-full px-3 py-1 text-xs font-medium\"\n                      [class.bg-green-50]=\"record.status === 'PRESENT'\"\n                      [class.text-green-700]=\"record.status === 'PRESENT'\"\n                      [class.bg-red-50]=\"record.status === 'ABSENT'\"\n                      [class.text-red-700]=\"record.status === 'ABSENT'\"\n                      [class.bg-yellow-50]=\"record.status === 'LATE'\"\n                      [class.text-yellow-700]=\"record.status === 'LATE'\"\n                      [class.bg-purple-50]=\"record.status === 'HALF_DAY'\"\n                      [class.text-purple-700]=\"record.status === 'HALF_DAY'\">\n\n                      {{ record.status.replace('_', ' ') }}\n\n                    </span>\n\n                  </td>\n\n                </tr>\n\n              } @empty {\n\n                <tr>\n                  <td colspan=\"5\" class=\"px-5 py-10 text-center text-sm text-slate-400\">\n                    No attendance records found.\n                  </td>\n                </tr>\n\n              }\n\n            </tbody>\n\n          </table>\n\n        </div>\n\n      </div>\n\n    }\n\n  }\n\n</div>\n", styles: ["\r\n:host {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Dashboard, { className: "Dashboard", filePath: "src/app/components/dashboard/dashboard.ts", lineNumber: 53 }); })();
