import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function Admins_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.successMessage, " ");
} }
function Admins_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.errorMessage, " ");
} }
function Admins_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1, "Loading administrators...");
    i0.ɵɵelementEnd();
} }
function Admins_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "p", 28);
    i0.ɵɵtext(2, "No administrators found.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 4);
    i0.ɵɵtext(4, "Create a new administrator or change your filters.");
    i0.ɵɵelementEnd()();
} }
function Admins_div_30_tr_19_button_19_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function Admins_div_30_tr_19_button_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const admin_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.deactivateAdmin(admin_r3)); });
    i0.ɵɵtext(1, "Deactivate");
    i0.ɵɵelementEnd();
} }
function Admins_div_30_tr_19_button_20_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵlistener("click", function Admins_div_30_tr_19_button_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const admin_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.reactivateAdmin(admin_r3)); });
    i0.ɵɵtext(1, "Reactivate");
    i0.ɵɵelementEnd();
} }
function Admins_div_30_tr_19_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 35)(1, "td", 36);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 37);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 37);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 37);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 32)(10, "span", 38);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td", 37);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 32)(16, "div", 39)(17, "button", 40);
    i0.ɵɵlistener("click", function Admins_div_30_tr_19_Template_button_click_17_listener() { const admin_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openEditModal(admin_r3)); });
    i0.ɵɵtext(18, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, Admins_div_30_tr_19_button_19_Template, 2, 0, "button", 41)(20, Admins_div_30_tr_19_button_20_Template, 2, 0, "button", 42);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const admin_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getAdminName(admin_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(admin_r3.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(admin_r3.adminProfile?.phone || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(admin_r3.adminProfile?.designation || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r0.statusClass(admin_r3.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(admin_r3.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(14, 9, admin_r3.createdAt, "dd MMM yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", admin_r3.status === "ACTIVE");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", admin_r3.status !== "ACTIVE");
} }
function Admins_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "table", 30)(2, "thead", 31)(3, "tr")(4, "th", 32);
    i0.ɵɵtext(5, "Administrator");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 32);
    i0.ɵɵtext(7, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 32);
    i0.ɵɵtext(9, "Phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 32);
    i0.ɵɵtext(11, "Designation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 32);
    i0.ɵɵtext(13, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 32);
    i0.ɵɵtext(15, "Created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 32);
    i0.ɵɵtext(17, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "tbody", 33);
    i0.ɵɵtemplate(19, Admins_div_30_tr_19_Template, 21, 12, "tr", 34);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("ngForOf", ctx_r0.admins);
} }
function Admins_div_31_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 45)(1, "p", 46);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 16)(4, "button", 47);
    i0.ɵɵlistener("click", function Admins_div_31_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.changePage(ctx_r0.page - 1)); });
    i0.ɵɵtext(5, "Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 47);
    i0.ɵɵlistener("click", function Admins_div_31_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.changePage(ctx_r0.page + 1)); });
    i0.ɵɵtext(7, "Next");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("Page ", ctx_r0.page, " of ", ctx_r0.totalPages, " \u00B7 ", ctx_r0.total, " administrators");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.page === 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.page >= ctx_r0.totalPages);
} }
function Admins_div_32_ng_container_33_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div")(2, "label", 55);
    i0.ɵɵtext(3, "Password *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 66);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Admins_div_32_ng_container_33_Template_input_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.form.password, $event) || (ctx_r0.form.password = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 67);
    i0.ɵɵtext(6, "Password must contain 12\u2013128 characters.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div")(8, "label", 55);
    i0.ɵɵtext(9, "Confirm Password *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "input", 68);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Admins_div_32_ng_container_33_Template_input_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.form.confirmPassword, $event) || (ctx_r0.form.confirmPassword = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.form.password);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.form.confirmPassword);
    i0.ɵɵcontrol();
} }
function Admins_div_32_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function Admins_div_32_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 48)(1, "div", 49)(2, "div", 50)(3, "div")(4, "h2", 51);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 4);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 52);
    i0.ɵɵlistener("click", function Admins_div_32_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeModal()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 53, 0);
    i0.ɵɵlistener("ngSubmit", function Admins_div_32_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submitForm()); });
    i0.ɵɵelementStart(12, "div", 54)(13, "div")(14, "label", 55);
    i0.ɵɵtext(15, "First Name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "input", 56);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Admins_div_32_Template_input_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.form.firstName, $event) || (ctx_r0.form.firstName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div")(18, "label", 55);
    i0.ɵɵtext(19, "Last Name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "input", 57);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Admins_div_32_Template_input_ngModelChange_20_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.form.lastName, $event) || (ctx_r0.form.lastName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div")(22, "label", 55);
    i0.ɵɵtext(23, "Email Address *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "input", 58);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Admins_div_32_Template_input_ngModelChange_24_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.form.email, $event) || (ctx_r0.form.email = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div")(26, "label", 55);
    i0.ɵɵtext(27, "Phone Number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "input", 59);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Admins_div_32_Template_input_ngModelChange_28_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.form.phone, $event) || (ctx_r0.form.phone = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div")(30, "label", 55);
    i0.ɵɵtext(31, "Designation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "input", 60);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Admins_div_32_Template_input_ngModelChange_32_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.form.designation, $event) || (ctx_r0.form.designation = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(33, Admins_div_32_ng_container_33_Template, 11, 2, "ng-container", 61)(34, Admins_div_32_div_34_Template, 2, 1, "div", 62);
    i0.ɵɵelementStart(35, "div", 63)(36, "button", 64);
    i0.ɵɵlistener("click", function Admins_div_32_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeModal()); });
    i0.ɵɵtext(37, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "button", 65);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const adminForm_r9 = i0.ɵɵreference(11);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.isEditMode ? "Edit Administrator" : "Create Administrator");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.isEditMode ? "Update administrator information." : "Create a new administrator account.");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.isSaving);
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.form.firstName);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.form.lastName);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.form.email);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.form.phone);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.form.designation);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.isEditMode);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.errorMessage);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || adminForm_r9.invalid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.isSaving ? "Saving..." : ctx_r0.isEditMode ? "Save Changes" : "Create Admin", " ");
} }
export class Admins {
    adminService = inject(AdminService);
    cdr = inject(ChangeDetectorRef);
    admins = [];
    isLoading = false;
    isSaving = false;
    errorMessage = '';
    successMessage = '';
    search = '';
    selectedStatus = '';
    page = 1;
    limit = 10;
    total = 0;
    totalPages = 0;
    showModal = false;
    isEditMode = false;
    selectedAdmin = null;
    form = this.emptyForm();
    emptyForm() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phone: '',
            designation: ''
        };
    }
    ngOnInit() {
        this.loadAdmins();
    }
    loadAdmins() {
        this.isLoading = true;
        this.errorMessage = '';
        this.adminService.getAdmins(this.page, this.limit, this.search, this.selectedStatus).subscribe({
            next: response => {
                this.admins = response.data || [];
                this.total = response.pagination?.total ?? 0;
                this.totalPages = response.pagination?.totalPages ?? 0;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
            error: error => {
                this.isLoading = false;
                this.errorMessage = this.getError(error);
                this.cdr.markForCheck();
            }
        });
    }
    openCreateModal() {
        this.form = this.emptyForm();
        this.isEditMode = false;
        this.selectedAdmin = null;
        this.errorMessage = '';
        this.showModal = true;
    }
    openEditModal(admin) {
        this.form = {
            email: admin.email,
            password: '',
            confirmPassword: '',
            firstName: admin.adminProfile?.firstName || '',
            lastName: admin.adminProfile?.lastName || '',
            phone: admin.adminProfile?.phone || '',
            designation: admin.adminProfile?.designation || ''
        };
        this.isEditMode = true;
        this.selectedAdmin = admin;
        this.errorMessage = '';
        this.showModal = true;
    }
    closeModal() {
        if (this.isSaving)
            return;
        this.showModal = false;
        this.selectedAdmin = null;
        this.form = this.emptyForm();
    }
    submitForm() {
        this.errorMessage = '';
        this.successMessage = '';
        const email = this.form.email.trim().toLowerCase();
        const firstName = this.form.firstName.trim();
        const lastName = this.form.lastName.trim();
        const phone = this.form.phone.trim();
        const designation = this.form.designation.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.errorMessage = 'Please enter a valid email address.';
            return;
        }
        if (firstName.length < 2 || firstName.length > 100 ||
            lastName.length < 2 || lastName.length > 100) {
            this.errorMessage = 'First name and last name must contain 2–100 characters.';
            return;
        }
        if (phone.length > 20 || designation.length > 100) {
            this.errorMessage = 'Phone must be at most 20 characters and designation at most 100 characters.';
            return;
        }
        if (!this.isEditMode) {
            if (this.form.password.length < 12 || this.form.password.length > 128) {
                this.errorMessage = 'Password must contain between 12 and 128 characters.';
                return;
            }
            if (this.form.password !== this.form.confirmPassword) {
                this.errorMessage = 'Password and confirm password do not match.';
                return;
            }
        }
        this.isSaving = true;
        if (this.isEditMode && this.selectedAdmin) {
            const payload = {
                email,
                firstName,
                lastName,
                phone,
                designation
            };
            this.adminService.updateAdmin(this.selectedAdmin.id, payload).subscribe({
                next: response => this.finishSave(response.message || 'Administrator updated successfully.'),
                error: error => this.handleSaveError(error)
            });
            return;
        }
        const payload = {
            email,
            password: this.form.password,
            firstName,
            lastName,
            ...(phone ? { phone } : {}),
            ...(designation ? { designation } : {})
        };
        this.adminService.createAdmin(payload).subscribe({
            next: response => this.finishSave(response.message || 'Administrator created successfully.'),
            error: error => this.handleSaveError(error)
        });
    }
    finishSave(message) {
        this.isSaving = false;
        this.showModal = false;
        this.selectedAdmin = null;
        this.form = this.emptyForm();
        this.successMessage = message;
        this.loadAdmins();
        this.cdr.markForCheck();
    }
    handleSaveError(error) {
        this.isSaving = false;
        this.errorMessage = this.getError(error);
        this.cdr.markForCheck();
    }
    deactivateAdmin(admin) {
        if (!confirm(`Deactivate admin account ${admin.email}?`))
            return;
        this.adminService.deactivateAdmin(admin.id).subscribe({
            next: response => {
                this.successMessage = response.message || 'Admin deactivated successfully.';
                this.loadAdmins();
            },
            error: error => {
                this.errorMessage = this.getError(error);
                this.cdr.markForCheck();
            }
        });
    }
    reactivateAdmin(admin) {
        if (!confirm(`Reactivate admin account ${admin.email}?`))
            return;
        this.adminService.reactivateAdmin(admin.id).subscribe({
            next: response => {
                this.successMessage = response.message || 'Admin reactivated successfully.';
                this.loadAdmins();
            },
            error: error => {
                this.errorMessage = this.getError(error);
                this.cdr.markForCheck();
            }
        });
    }
    applyFilters() {
        this.page = 1;
        this.loadAdmins();
    }
    clearFilters() {
        this.search = '';
        this.selectedStatus = '';
        this.page = 1;
        this.loadAdmins();
    }
    changePage(page) {
        if (page < 1 || page > this.totalPages)
            return;
        this.page = page;
        this.loadAdmins();
    }
    getAdminName(admin) {
        const profile = admin.adminProfile;
        if (!profile)
            return 'Profile not completed';
        return `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Admin';
    }
    statusClass(status) {
        switch (status) {
            case 'ACTIVE': return 'bg-green-100 text-green-700';
            case 'INACTIVE': return 'bg-red-100 text-red-700';
            case 'SUSPENDED': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-slate-100 text-slate-600';
        }
    }
    getError(error) {
        const message = error?.error?.message;
        return Array.isArray(message)
            ? message.join(', ')
            : message || 'Something went wrong. Please try again.';
    }
    static ɵfac = function Admins_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Admins)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Admins, selectors: [["app-admins"]], decls: 33, vars: 9, consts: [["adminForm", "ngForm"], [1, "min-h-screen", "bg-slate-50", "p-4", "sm:p-6", "lg:p-8"], [1, "mb-6", "flex", "flex-wrap", "items-center", "justify-between", "gap-4"], [1, "text-2xl", "font-bold", "text-slate-800"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "rounded-lg", "bg-blue-600", "px-5", "py-2.5", "text-sm", "font-semibold", "text-white", "hover:bg-blue-700", 3, "click"], ["class", "mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700", 4, "ngIf"], ["class", "mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700", 4, "ngIf"], [1, "overflow-hidden", "rounded-xl", "border", "border-slate-200", "bg-white", "shadow-sm"], [1, "grid", "grid-cols-1", "gap-3", "border-b", "border-slate-200", "p-5", "sm:grid-cols-3"], ["type", "text", "placeholder", "Search name or email...", 1, "rounded-lg", "border", "border-slate-300", "px-4", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "rounded-lg", "border", "border-slate-300", "px-4", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "ACTIVE"], ["value", "INACTIVE"], ["value", "SUSPENDED"], [1, "flex", "gap-2"], [1, "flex-1", "rounded-lg", "bg-blue-600", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "hover:bg-blue-700", 3, "click"], [1, "rounded-lg", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", 3, "click"], ["class", "p-12 text-center text-slate-500", 4, "ngIf"], ["class", "p-12 text-center", 4, "ngIf"], ["class", "overflow-x-auto", 4, "ngIf"], ["class", "flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4", 4, "ngIf"], ["class", "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4", 4, "ngIf"], [1, "mb-4", "rounded-lg", "border", "border-green-200", "bg-green-50", "p-3", "text-sm", "text-green-700"], [1, "mb-4", "rounded-lg", "border", "border-red-200", "bg-red-50", "p-3", "text-sm", "text-red-700"], [1, "p-12", "text-center", "text-slate-500"], [1, "p-12", "text-center"], [1, "font-semibold", "text-slate-700"], [1, "overflow-x-auto"], [1, "w-full", "min-w-[850px]", "text-left", "text-sm"], [1, "bg-slate-50", "text-xs", "uppercase", "text-slate-500"], [1, "px-5", "py-4"], [1, "divide-y", "divide-slate-100"], ["class", "hover:bg-slate-50", 4, "ngFor", "ngForOf"], [1, "hover:bg-slate-50"], [1, "px-5", "py-4", "font-semibold", "text-slate-800"], [1, "px-5", "py-4", "text-slate-600"], [1, "rounded-full", "px-3", "py-1", "text-xs", "font-semibold", 3, "ngClass"], [1, "flex", "items-center", "gap-3"], [1, "font-semibold", "text-blue-600", "hover:text-blue-800", 3, "click"], ["class", "font-semibold text-red-600 hover:text-red-800", 3, "click", 4, "ngIf"], ["class", "font-semibold text-green-600 hover:text-green-800", 3, "click", 4, "ngIf"], [1, "font-semibold", "text-red-600", "hover:text-red-800", 3, "click"], [1, "font-semibold", "text-green-600", "hover:text-green-800", 3, "click"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-200", "px-5", "py-4"], [1, "text-sm", "text-slate-500"], [1, "rounded-lg", "border", "border-slate-300", "px-4", "py-2", "text-sm", "disabled:opacity-40", 3, "click", "disabled"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "overflow-y-auto", "bg-slate-900/50", "p-4"], [1, "my-auto", "max-h-[92vh]", "w-full", "max-w-2xl", "overflow-y-auto", "rounded-2xl", "bg-white", "shadow-xl"], [1, "sticky", "top-0", "flex", "items-center", "justify-between", "border-b", "border-slate-200", "bg-white", "p-5"], [1, "text-xl", "font-bold", "text-slate-800"], [1, "text-2xl", "text-slate-400", "hover:text-slate-700", 3, "click", "disabled"], [1, "space-y-4", "p-5", 3, "ngSubmit"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2"], [1, "mb-1", "block", "text-sm", "font-medium", "text-slate-700"], ["type", "text", "name", "firstName", "required", "", "minlength", "2", "maxlength", "100", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "lastName", "required", "", "minlength", "2", "maxlength", "100", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "email", "required", "", "email", "", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], ["type", "tel", "name", "phone", "maxlength", "20", "placeholder", "Enter phone number", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "designation", "maxlength", "100", "placeholder", "e.g. HR Manager", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], [4, "ngIf"], ["class", "rounded-lg bg-red-50 p-3 text-sm text-red-700", 4, "ngIf"], [1, "flex", "justify-end", "gap-3", "border-t", "border-slate-100", "pt-4"], ["type", "button", 1, "rounded-lg", "border", "border-slate-300", "px-5", "py-2.5", "text-sm", "font-semibold", "text-slate-700", "hover:bg-slate-50", 3, "click", "disabled"], ["type", "submit", 1, "rounded-lg", "bg-blue-600", "px-5", "py-2.5", "text-sm", "font-semibold", "text-white", "hover:bg-blue-700", "disabled:opacity-50", 3, "disabled"], ["type", "password", "name", "password", "required", "", "minlength", "12", "maxlength", "128", "placeholder", "Minimum 12 characters", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], [1, "mt-1", "text-xs", "text-slate-500"], ["type", "password", "name", "confirmPassword", "required", "", "minlength", "12", "maxlength", "128", "placeholder", "Re-enter password", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], [1, "rounded-lg", "bg-red-50", "p-3", "text-sm", "text-red-700"]], template: function Admins_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h1", 3);
            i0.ɵɵtext(4, "Admin Management");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 4);
            i0.ɵɵtext(6, "Create and manage administrator accounts.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 5);
            i0.ɵɵlistener("click", function Admins_Template_button_click_7_listener() { return ctx.openCreateModal(); });
            i0.ɵɵtext(8, " + Add Admin ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, Admins_div_9_Template, 2, 1, "div", 6)(10, Admins_div_10_Template, 2, 1, "div", 7);
            i0.ɵɵelementStart(11, "div", 8)(12, "div", 9)(13, "input", 10);
            i0.ɵɵcontrolCreate();
            i0.ɵɵtwoWayListener("ngModelChange", function Admins_Template_input_ngModelChange_13_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.search, $event) || (ctx.search = $event); return $event; });
            i0.ɵɵlistener("keyup.enter", function Admins_Template_input_keyup_enter_13_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "select", 11);
            i0.ɵɵcontrolCreate();
            i0.ɵɵtwoWayListener("ngModelChange", function Admins_Template_select_ngModelChange_14_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event); return $event; });
            i0.ɵɵelementStart(15, "option", 12);
            i0.ɵɵtext(16, "All Statuses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "option", 13);
            i0.ɵɵtext(18, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "option", 14);
            i0.ɵɵtext(20, "Inactive");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "option", 15);
            i0.ɵɵtext(22, "Suspended");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "div", 16)(24, "button", 17);
            i0.ɵɵlistener("click", function Admins_Template_button_click_24_listener() { return ctx.applyFilters(); });
            i0.ɵɵtext(25, "Search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "button", 18);
            i0.ɵɵlistener("click", function Admins_Template_button_click_26_listener() { return ctx.clearFilters(); });
            i0.ɵɵtext(27, "Clear");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(28, Admins_div_28_Template, 2, 0, "div", 19)(29, Admins_div_29_Template, 5, 0, "div", 20)(30, Admins_div_30_Template, 20, 1, "div", 21)(31, Admins_div_31_Template, 8, 5, "div", 22);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(32, Admins_div_32_Template, 40, 13, "div", 23);
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.successMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.search);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedStatus);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.admins.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.admins.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.totalPages > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showModal);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.MinLengthValidator, i2.MaxLengthValidator, i2.EmailValidator, i2.NgModel, i2.NgForm, i1.DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Admins, [{
        type: Component,
        args: [{ selector: 'app-admins', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8\">\n  <div class=\"mb-6 flex flex-wrap items-center justify-between gap-4\">\n    <div>\n      <h1 class=\"text-2xl font-bold text-slate-800\">Admin Management</h1>\n      <p class=\"mt-1 text-sm text-slate-500\">Create and manage administrator accounts.</p>\n    </div>\n    <button (click)=\"openCreateModal()\"\n      class=\"rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700\">\n      + Add Admin\n    </button>\n  </div>\n\n  <div *ngIf=\"successMessage\" class=\"mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700\">\n    {{ successMessage }}\n  </div>\n  <div *ngIf=\"errorMessage\" class=\"mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700\">\n    {{ errorMessage }}\n  </div>\n\n  <div class=\"overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm\">\n    <div class=\"grid grid-cols-1 gap-3 border-b border-slate-200 p-5 sm:grid-cols-3\">\n      <input type=\"text\" [(ngModel)]=\"search\" (keyup.enter)=\"applyFilters()\"\n        placeholder=\"Search name or email...\"\n        class=\"rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500\">\n      <select [(ngModel)]=\"selectedStatus\"\n        class=\"rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500\">\n        <option value=\"\">All Statuses</option>\n        <option value=\"ACTIVE\">Active</option>\n        <option value=\"INACTIVE\">Inactive</option>\n        <option value=\"SUSPENDED\">Suspended</option>\n      </select>\n      <div class=\"flex gap-2\">\n        <button (click)=\"applyFilters()\" class=\"flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700\">Search</button>\n        <button (click)=\"clearFilters()\" class=\"rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50\">Clear</button>\n      </div>\n    </div>\n\n    <div *ngIf=\"isLoading\" class=\"p-12 text-center text-slate-500\">Loading administrators...</div>\n    <div *ngIf=\"!isLoading && admins.length === 0\" class=\"p-12 text-center\">\n      <p class=\"font-semibold text-slate-700\">No administrators found.</p>\n      <p class=\"mt-1 text-sm text-slate-500\">Create a new administrator or change your filters.</p>\n    </div>\n\n    <div *ngIf=\"!isLoading && admins.length > 0\" class=\"overflow-x-auto\">\n      <table class=\"w-full min-w-[850px] text-left text-sm\">\n        <thead class=\"bg-slate-50 text-xs uppercase text-slate-500\">\n          <tr>\n            <th class=\"px-5 py-4\">Administrator</th>\n            <th class=\"px-5 py-4\">Email</th>\n            <th class=\"px-5 py-4\">Phone</th>\n            <th class=\"px-5 py-4\">Designation</th>\n            <th class=\"px-5 py-4\">Status</th>\n            <th class=\"px-5 py-4\">Created</th>\n            <th class=\"px-5 py-4\">Actions</th>\n          </tr>\n        </thead>\n        <tbody class=\"divide-y divide-slate-100\">\n          <tr *ngFor=\"let admin of admins\" class=\"hover:bg-slate-50\">\n            <td class=\"px-5 py-4 font-semibold text-slate-800\">{{ getAdminName(admin) }}</td>\n            <td class=\"px-5 py-4 text-slate-600\">{{ admin.email }}</td>\n            <td class=\"px-5 py-4 text-slate-600\">{{ admin.adminProfile?.phone || '\u2014' }}</td>\n            <td class=\"px-5 py-4 text-slate-600\">{{ admin.adminProfile?.designation || '\u2014' }}</td>\n            <td class=\"px-5 py-4\">\n              <span class=\"rounded-full px-3 py-1 text-xs font-semibold\" [ngClass]=\"statusClass(admin.status)\">{{ admin.status }}</span>\n            </td>\n            <td class=\"px-5 py-4 text-slate-600\">{{ admin.createdAt | date:'dd MMM yyyy' }}</td>\n            <td class=\"px-5 py-4\">\n              <div class=\"flex items-center gap-3\">\n                <button (click)=\"openEditModal(admin)\" class=\"font-semibold text-blue-600 hover:text-blue-800\">Edit</button>\n                <button *ngIf=\"admin.status === 'ACTIVE'\" (click)=\"deactivateAdmin(admin)\" class=\"font-semibold text-red-600 hover:text-red-800\">Deactivate</button>\n                <button *ngIf=\"admin.status !== 'ACTIVE'\" (click)=\"reactivateAdmin(admin)\" class=\"font-semibold text-green-600 hover:text-green-800\">Reactivate</button>\n              </div>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <div *ngIf=\"!isLoading && totalPages > 0\" class=\"flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4\">\n      <p class=\"text-sm text-slate-500\">Page {{ page }} of {{ totalPages }} \u00B7 {{ total }} administrators</p>\n      <div class=\"flex gap-2\">\n        <button (click)=\"changePage(page - 1)\" [disabled]=\"page === 1\"\n          class=\"rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-40\">Previous</button>\n        <button (click)=\"changePage(page + 1)\" [disabled]=\"page >= totalPages\"\n          class=\"rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-40\">Next</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div *ngIf=\"showModal\" class=\"fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4\">\n  <div class=\"my-auto max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl\">\n    <div class=\"sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white p-5\">\n      <div>\n        <h2 class=\"text-xl font-bold text-slate-800\">{{ isEditMode ? 'Edit Administrator' : 'Create Administrator' }}</h2>\n        <p class=\"mt-1 text-sm text-slate-500\">{{ isEditMode ? 'Update administrator information.' : 'Create a new administrator account.' }}</p>\n      </div>\n      <button (click)=\"closeModal()\" [disabled]=\"isSaving\" class=\"text-2xl text-slate-400 hover:text-slate-700\">\u00D7</button>\n    </div>\n\n    <form (ngSubmit)=\"submitForm()\" #adminForm=\"ngForm\" class=\"space-y-4 p-5\">\n      <div class=\"grid grid-cols-1 gap-4 sm:grid-cols-2\">\n        <div>\n          <label class=\"mb-1 block text-sm font-medium text-slate-700\">First Name *</label>\n          <input type=\"text\" name=\"firstName\" [(ngModel)]=\"form.firstName\" required minlength=\"2\" maxlength=\"100\"\n            class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500\">\n        </div>\n        <div>\n          <label class=\"mb-1 block text-sm font-medium text-slate-700\">Last Name *</label>\n          <input type=\"text\" name=\"lastName\" [(ngModel)]=\"form.lastName\" required minlength=\"2\" maxlength=\"100\"\n            class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500\">\n        </div>\n      </div>\n\n      <div>\n        <label class=\"mb-1 block text-sm font-medium text-slate-700\">Email Address *</label>\n        <input type=\"email\" name=\"email\" [(ngModel)]=\"form.email\" required email\n          class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500\">\n      </div>\n\n      <div>\n        <label class=\"mb-1 block text-sm font-medium text-slate-700\">Phone Number</label>\n        <input type=\"tel\" name=\"phone\" [(ngModel)]=\"form.phone\" maxlength=\"20\" placeholder=\"Enter phone number\"\n          class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500\">\n      </div>\n\n      <div>\n        <label class=\"mb-1 block text-sm font-medium text-slate-700\">Designation</label>\n        <input type=\"text\" name=\"designation\" [(ngModel)]=\"form.designation\" maxlength=\"100\" placeholder=\"e.g. HR Manager\"\n          class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500\">\n      </div>\n\n      <ng-container *ngIf=\"!isEditMode\">\n        <div>\n          <label class=\"mb-1 block text-sm font-medium text-slate-700\">Password *</label>\n          <input type=\"password\" name=\"password\" [(ngModel)]=\"form.password\" required minlength=\"12\" maxlength=\"128\"\n            placeholder=\"Minimum 12 characters\"\n            class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500\">\n          <p class=\"mt-1 text-xs text-slate-500\">Password must contain 12\u2013128 characters.</p>\n        </div>\n        <div>\n          <label class=\"mb-1 block text-sm font-medium text-slate-700\">Confirm Password *</label>\n          <input type=\"password\" name=\"confirmPassword\" [(ngModel)]=\"form.confirmPassword\" required minlength=\"12\" maxlength=\"128\"\n            placeholder=\"Re-enter password\"\n            class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500\">\n        </div>\n      </ng-container>\n\n      <div *ngIf=\"errorMessage\" class=\"rounded-lg bg-red-50 p-3 text-sm text-red-700\">{{ errorMessage }}</div>\n\n      <div class=\"flex justify-end gap-3 border-t border-slate-100 pt-4\">\n        <button type=\"button\" (click)=\"closeModal()\" [disabled]=\"isSaving\"\n          class=\"rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50\">Cancel</button>\n        <button type=\"submit\" [disabled]=\"isSaving || adminForm.invalid\"\n          class=\"rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50\">\n          {{ isSaving ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Create Admin') }}\n        </button>\n      </div>\n    </form>\n  </div>\n</div>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Admins, { className: "Admins", filePath: "src/app/components/admins/admins.ts", lineNumber: 19 }); })();
