import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function Departments_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function Departments_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreateModal()); });
    i0.ɵɵtext(1, " + Add Department ");
    i0.ɵɵelementEnd();
} }
function Departments_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.successMessage, " ");
} }
function Departments_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.errorMessage, " ");
} }
function Departments_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1, " Loading departments... ");
    i0.ɵɵelementEnd();
} }
function Departments_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "div", 23);
    i0.ɵɵtext(2, "\uD83C\uDFE2");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3", 24);
    i0.ɵɵtext(4, " No departments found ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 3);
    i0.ɵɵtext(6, " Try a different search or create a department. ");
    i0.ɵɵelementEnd()();
} }
function Departments_Conditional_31_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 28);
    i0.ɵɵtext(1, "Actions");
    i0.ɵɵelementEnd();
} }
function Departments_Conditional_31_For_13_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 27)(1, "div", 34)(2, "button", 35);
    i0.ɵɵlistener("click", function Departments_Conditional_31_For_13_Conditional_11_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r3); const department_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openEditModal(department_r4)); });
    i0.ɵɵtext(3, " Edit ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 36);
    i0.ɵɵlistener("click", function Departments_Conditional_31_For_13_Conditional_11_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const department_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deleteDepartment(department_r4)); });
    i0.ɵɵtext(5, " Delete ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const department_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", department_r4._count.employees > 0)("title", department_r4._count.employees > 0 ? "Reassign employees before deleting" : "Delete department");
} }
function Departments_Conditional_31_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 30)(1, "td", 27)(2, "div", 16);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 31);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 32);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 27)(9, "span", 33);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(11, Departments_Conditional_31_For_13_Conditional_11_Template, 6, 2, "td", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const department_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", department_r4.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ID: ", department_r4.id, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", department_r4.description || "No description", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", department_r4._count.employees, " employees ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isSuperAdmin ? 11 : -1);
} }
function Departments_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "table", 25)(2, "thead", 26)(3, "tr")(4, "th", 27);
    i0.ɵɵtext(5, "Department");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 27);
    i0.ɵɵtext(7, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 27);
    i0.ɵɵtext(9, "Employees");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(10, Departments_Conditional_31_Conditional_10_Template, 2, 0, "th", 28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "tbody", 29);
    i0.ɵɵrepeaterCreate(12, Departments_Conditional_31_For_13_Template, 12, 5, "tr", 30, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵconditional(ctx_r1.isSuperAdmin ? 10 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.filteredDepartments);
} }
function Departments_Conditional_32_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.errorMessage, " ");
} }
function Departments_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 37)(2, "div", 38)(3, "div")(4, "h2", 39);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 3);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 40);
    i0.ɵɵlistener("click", function Departments_Conditional_32_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeModal()); });
    i0.ɵɵtext(9, " \u00D7 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 41);
    i0.ɵɵlistener("ngSubmit", function Departments_Conditional_32_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveDepartment()); });
    i0.ɵɵconditionalCreate(11, Departments_Conditional_32_Conditional_11_Template, 2, 1, "div", 42);
    i0.ɵɵelementStart(12, "div")(13, "label", 43);
    i0.ɵɵtext(14, " Department Name * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "input", 44);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Departments_Conditional_32_Template_input_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.formData.name, $event) || (ctx_r1.formData.name = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div")(17, "label", 43);
    i0.ɵɵtext(18, " Description ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "textarea", 45);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Departments_Conditional_32_Template_textarea_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.formData.description, $event) || (ctx_r1.formData.description = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtext(20, "          ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 46)(22, "button", 47);
    i0.ɵɵlistener("click", function Departments_Conditional_32_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeModal()); });
    i0.ɵɵtext(23, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "button", 48);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isEditMode ? "Edit Department" : "Create Department", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isEditMode ? "Update department information." : "Add a new department to your organization.", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.saving);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.errorMessage ? 11 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.formData.name);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.formData.description);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.saving);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving ? "Saving..." : ctx_r1.isEditMode ? "Save Changes" : "Create Department", " ");
} }
export class Departments {
    departmentService = inject(DepartmentService);
    cdr = inject(ChangeDetectorRef);
    departments = [];
    filteredDepartments = [];
    loading = false;
    saving = false;
    searchTerm = '';
    showModal = false;
    isEditMode = false;
    selectedDepartmentId = null;
    formData = {
        name: '',
        description: ''
    };
    errorMessage = '';
    successMessage = '';
    userRole = '';
    get isSuperAdmin() {
        return this.userRole === 'SUPER_ADMIN';
    }
    get totalEmployees() {
        return this.departments.reduce((total, department) => total + department._count.employees, 0);
    }
    ngOnInit() {
        this.getUserRole();
        this.loadDepartments();
    }
    getUserRole() {
        try {
            const user = JSON.parse(sessionStorage.getItem('user') || '{}');
            this.userRole = user.role || '';
        }
        catch {
            this.userRole = '';
        }
    }
    loadDepartments() {
        this.loading = true;
        this.errorMessage = '';
        this.cdr.detectChanges();
        console.log('Loading departments started');
        this.departmentService.getDepartments().subscribe({
            next: (response) => {
                console.log('API response:', response);
                this.departments = response.data || [];
                this.applySearch();
                this.loading = false;
                this.cdr.detectChanges();
                console.log('Departments loaded:', this.departments);
            },
            error: (error) => {
                console.error('Department API error:', error);
                this.errorMessage = this.getErrorMessage(error, 'Unable to load departments.');
                this.loading = false;
                this.cdr.detectChanges();
            },
            complete: () => {
                console.log('Department request completed');
            }
        });
    }
    applySearch() {
        const search = this.searchTerm.trim().toLowerCase();
        this.filteredDepartments = this.departments.filter(department => department.name.toLowerCase().includes(search) ||
            (department.description || '').toLowerCase().includes(search));
    }
    openCreateModal() {
        this.isEditMode = false;
        this.selectedDepartmentId = null;
        this.formData = {
            name: '',
            description: ''
        };
        this.errorMessage = '';
        this.showModal = true;
        this.cdr.detectChanges();
    }
    openEditModal(department) {
        this.isEditMode = true;
        this.selectedDepartmentId = department.id;
        this.formData = {
            name: department.name,
            description: department.description || ''
        };
        this.errorMessage = '';
        this.showModal = true;
        this.cdr.detectChanges();
    }
    closeModal() {
        if (this.saving)
            return;
        this.showModal = false;
        this.errorMessage = '';
        this.cdr.detectChanges();
    }
    saveDepartment() {
        const name = this.formData.name?.trim();
        if (!name) {
            this.errorMessage = 'Department name is required.';
            return;
        }
        const payload = {
            name,
            description: this.formData.description?.trim() || ''
        };
        this.saving = true;
        this.errorMessage = '';
        this.cdr.detectChanges();
        const request = this.isEditMode && this.selectedDepartmentId
            ? this.departmentService.updateDepartment(this.selectedDepartmentId, payload)
            : this.departmentService.createDepartment(payload);
        request.subscribe({
            next: (response) => {
                console.log('Department saved:', response);
                this.saving = false;
                this.showModal = false;
                this.successMessage = this.isEditMode
                    ? 'Department updated successfully.'
                    : 'Department created successfully.';
                this.cdr.detectChanges();
                this.loadDepartments();
            },
            error: (error) => {
                console.error('Save department error:', error);
                this.saving = false;
                this.errorMessage = this.getErrorMessage(error, 'Unable to save department.');
                this.cdr.detectChanges();
            }
        });
    }
    deleteDepartment(department) {
        if (!this.isSuperAdmin)
            return;
        if (department._count.employees > 0) {
            this.errorMessage =
                'This department has assigned employees. Reassign them before deleting.';
            this.cdr.detectChanges();
            return;
        }
        const confirmed = window.confirm(`Are you sure you want to delete "${department.name}"?`);
        if (!confirmed)
            return;
        this.errorMessage = '';
        this.successMessage = '';
        this.departmentService.deleteDepartment(department.id).subscribe({
            next: (response) => {
                console.log('Department deleted:', response);
                this.successMessage =
                    response.message || 'Department deleted successfully.';
                this.cdr.detectChanges();
                this.loadDepartments();
            },
            error: (error) => {
                console.error('Delete department error:', error);
                this.errorMessage = this.getErrorMessage(error, 'Unable to delete department.');
                this.cdr.detectChanges();
            }
        });
    }
    getErrorMessage(error, fallback) {
        const message = error.error?.message;
        if (Array.isArray(message)) {
            return message.join(', ');
        }
        return typeof message === 'string'
            ? message
            : fallback;
    }
    static ɵfac = function Departments_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Departments)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Departments, selectors: [["app-departments"]], decls: 33, vars: 9, consts: [[1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "text-slate-800"], [1, "text-sm", "text-slate-500", "mt-1"], [1, "bg-blue-600", "hover:bg-blue-700", "text-white", "px-5", "py-2.5", "rounded-lg", "text-sm", "font-semibold", "shadow-sm", "transition"], [1, "bg-green-50", "border", "border-green-200", "text-green-700", "rounded-lg", "px-4", "py-3", "text-sm"], [1, "bg-red-50", "border", "border-red-200", "text-red-700", "rounded-lg", "px-4", "py-3", "text-sm"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], [1, "bg-white", "border", "border-slate-200", "rounded-xl", "p-5", "shadow-sm"], [1, "text-sm", "text-slate-500"], [1, "text-3xl", "font-bold", "text-slate-800", "mt-2"], [1, "text-3xl", "font-bold", "text-blue-600", "mt-2"], [1, "bg-white", "border", "border-slate-200", "rounded-xl", "p-4", "shadow-sm"], ["type", "text", "placeholder", "Search departments...", 1, "w-full", "sm:max-w-md", "border", "border-slate-300", "rounded-lg", "px-4", "py-2.5", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], [1, "bg-white", "border", "border-slate-200", "rounded-xl", "shadow-sm", "overflow-hidden"], [1, "px-5", "py-4", "border-b", "border-slate-200"], [1, "font-semibold", "text-slate-800"], [1, "text-xs", "text-slate-500", "mt-1"], [1, "p-12", "text-center", "text-slate-500"], [1, "p-12", "text-center"], [1, "overflow-x-auto"], [1, "fixed", "inset-0", "z-50", "bg-slate-900/50", "flex", "items-center", "justify-center", "p-4"], [1, "bg-blue-600", "hover:bg-blue-700", "text-white", "px-5", "py-2.5", "rounded-lg", "text-sm", "font-semibold", "shadow-sm", "transition", 3, "click"], [1, "text-4xl", "mb-3"], [1, "font-semibold", "text-slate-700"], [1, "w-full", "text-sm", "text-left"], [1, "bg-slate-50", "text-slate-500", "uppercase", "text-xs"], [1, "px-6", "py-4"], [1, "px-6", "py-4", "text-right"], [1, "divide-y", "divide-slate-100"], [1, "hover:bg-slate-50", "transition"], [1, "text-xs", "text-slate-400", "mt-1"], [1, "px-6", "py-4", "text-slate-600", "max-w-xs"], [1, "inline-flex", "items-center", "rounded-full", "bg-blue-50", "text-blue-700", "px-3", "py-1", "text-xs", "font-semibold"], [1, "flex", "justify-end", "gap-3"], [1, "text-blue-600", "hover:text-blue-800", "font-medium", 3, "click"], [1, "text-red-600", "hover:text-red-800", "font-medium", "disabled:text-slate-300", "disabled:cursor-not-allowed", 3, "click", "disabled", "title"], [1, "bg-white", "rounded-2xl", "shadow-xl", "w-full", "max-w-lg", "overflow-hidden"], [1, "px-6", "py-5", "border-b", "border-slate-200", "flex", "justify-between", "items-center"], [1, "text-lg", "font-bold", "text-slate-800"], [1, "text-slate-400", "hover:text-slate-700", "text-2xl", 3, "click", "disabled"], [1, "p-6", "space-y-5", 3, "ngSubmit"], [1, "bg-red-50", "border", "border-red-200", "text-red-700", "rounded-lg", "p-3", "text-sm"], [1, "block", "text-sm", "font-medium", "text-slate-700", "mb-2"], ["type", "text", "name", "name", "maxlength", "100", "required", "", "placeholder", "e.g. Engineering", 1, "w-full", "border", "border-slate-300", "rounded-lg", "px-4", "py-2.5", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["name", "description", "rows", "4", "placeholder", "Enter department description...", 1, "w-full", "border", "border-slate-300", "rounded-lg", "px-4", "py-3", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", "resize-none", 3, "ngModelChange", "ngModel"], [1, "flex", "justify-end", "gap-3", "pt-3", "border-t", "border-slate-100"], ["type", "button", 1, "px-5", "py-2.5", "rounded-lg", "border", "border-slate-300", "text-slate-600", "hover:bg-slate-50", "text-sm", "font-medium", 3, "click", "disabled"], ["type", "submit", 1, "px-5", "py-2.5", "rounded-lg", "bg-blue-600", "hover:bg-blue-700", "text-white", "text-sm", "font-semibold", "disabled:opacity-60", 3, "disabled"]], template: function Departments_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, " Departments ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, " Manage your organization's departments. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(7, Departments_Conditional_7_Template, 2, 0, "button", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(8, Departments_Conditional_8_Template, 2, 1, "div", 5);
            i0.ɵɵconditionalCreate(9, Departments_Conditional_9_Template, 2, 1, "div", 6);
            i0.ɵɵelementStart(10, "div", 7)(11, "div", 8)(12, "p", 9);
            i0.ɵɵtext(13, "Total Departments");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "h2", 10);
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 8)(17, "p", 9);
            i0.ɵɵtext(18, "Total Assigned Employees");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "h2", 11);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(21, "div", 12)(22, "input", 13);
            i0.ɵɵcontrolCreate();
            i0.ɵɵtwoWayListener("ngModelChange", function Departments_Template_input_ngModelChange_22_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function Departments_Template_input_ngModelChange_22_listener() { return ctx.applySearch(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "div", 14)(24, "div", 15)(25, "h2", 16);
            i0.ɵɵtext(26, " Department List ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "p", 17);
            i0.ɵɵtext(28);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(29, Departments_Conditional_29_Template, 2, 0, "div", 18)(30, Departments_Conditional_30_Template, 7, 0, "div", 19)(31, Departments_Conditional_31_Template, 14, 1, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(32, Departments_Conditional_32_Template, 26, 9, "div", 21);
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.isSuperAdmin ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage && !ctx.showModal ? 9 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.departments.length, " ");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ctx.totalEmployees, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchTerm);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.filteredDepartments.length, " departments found ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading ? 29 : ctx.filteredDepartments.length === 0 ? 30 : 31);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.showModal ? 32 : -1);
        } }, dependencies: [CommonModule, FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.MaxLengthValidator, i1.NgModel, i1.NgForm], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Departments, [{
        type: Component,
        args: [{ selector: 'app-departments', standalone: true, imports: [CommonModule, FormsModule], template: "\n<div class=\"space-y-6\">\n\n  <!-- Header -->\n  <div class=\"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4\">\n    <div>\n      <h1 class=\"text-2xl font-bold text-slate-800\">\n        Departments\n      </h1>\n      <p class=\"text-sm text-slate-500 mt-1\">\n        Manage your organization's departments.\n      </p>\n    </div>\n\n    @if (isSuperAdmin) {\n      <button\n        (click)=\"openCreateModal()\"\n        class=\"bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition\">\n        + Add Department\n      </button>\n    }\n  </div>\n\n  <!-- Alerts -->\n  @if (successMessage) {\n    <div class=\"bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm\">\n      {{ successMessage }}\n    </div>\n  }\n\n  @if (errorMessage && !showModal) {\n    <div class=\"bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm\">\n      {{ errorMessage }}\n    </div>\n  }\n\n  <!-- Statistics -->\n  <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-4\">\n\n    <div class=\"bg-white border border-slate-200 rounded-xl p-5 shadow-sm\">\n      <p class=\"text-sm text-slate-500\">Total Departments</p>\n      <h2 class=\"text-3xl font-bold text-slate-800 mt-2\">\n        {{ departments.length }}\n      </h2>\n    </div>\n\n    <div class=\"bg-white border border-slate-200 rounded-xl p-5 shadow-sm\">\n      <p class=\"text-sm text-slate-500\">Total Assigned Employees</p>\n      <h2 class=\"text-3xl font-bold text-blue-600 mt-2\">\n        {{ totalEmployees }}\n      </h2>\n    </div>\n\n  </div>\n\n  <!-- Search -->\n  <div class=\"bg-white border border-slate-200 rounded-xl p-4 shadow-sm\">\n    <input\n      type=\"text\"\n      [(ngModel)]=\"searchTerm\"\n      (ngModelChange)=\"applySearch()\"\n      placeholder=\"Search departments...\"\n      class=\"w-full sm:max-w-md border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500\"\n    />\n  </div>\n\n  <!-- Department Table -->\n  <div class=\"bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden\">\n\n    <div class=\"px-5 py-4 border-b border-slate-200\">\n      <h2 class=\"font-semibold text-slate-800\">\n        Department List\n      </h2>\n      <p class=\"text-xs text-slate-500 mt-1\">\n        {{ filteredDepartments.length }} departments found\n      </p>\n    </div>\n\n    @if (loading) {\n      <div class=\"p-12 text-center text-slate-500\">\n        Loading departments...\n      </div>\n    } @else if (filteredDepartments.length === 0) {\n      <div class=\"p-12 text-center\">\n        <div class=\"text-4xl mb-3\">\uD83C\uDFE2</div>\n        <h3 class=\"font-semibold text-slate-700\">\n          No departments found\n        </h3>\n        <p class=\"text-sm text-slate-500 mt-1\">\n          Try a different search or create a department.\n        </p>\n      </div>\n    } @else {\n\n      <div class=\"overflow-x-auto\">\n        <table class=\"w-full text-sm text-left\">\n\n          <thead class=\"bg-slate-50 text-slate-500 uppercase text-xs\">\n            <tr>\n              <th class=\"px-6 py-4\">Department</th>\n              <th class=\"px-6 py-4\">Description</th>\n              <th class=\"px-6 py-4\">Employees</th>\n              @if (isSuperAdmin) {\n                <th class=\"px-6 py-4 text-right\">Actions</th>\n              }\n            </tr>\n          </thead>\n\n          <tbody class=\"divide-y divide-slate-100\">\n\n            @for (department of filteredDepartments; track department.id) {\n              <tr class=\"hover:bg-slate-50 transition\">\n\n                <td class=\"px-6 py-4\">\n                  <div class=\"font-semibold text-slate-800\">\n                    {{ department.name }}\n                  </div>\n                  <div class=\"text-xs text-slate-400 mt-1\">\n                    ID: {{ department.id }}\n                  </div>\n                </td>\n\n                <td class=\"px-6 py-4 text-slate-600 max-w-xs\">\n                  {{ department.description || 'No description' }}\n                </td>\n\n                <td class=\"px-6 py-4\">\n                  <span class=\"inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold\">\n                    {{ department._count.employees }} employees\n                  </span>\n                </td>\n\n                @if (isSuperAdmin) {\n                  <td class=\"px-6 py-4\">\n                    <div class=\"flex justify-end gap-3\">\n\n                      <button\n                        (click)=\"openEditModal(department)\"\n                        class=\"text-blue-600 hover:text-blue-800 font-medium\">\n                        Edit\n                      </button>\n\n                      <button\n                        (click)=\"deleteDepartment(department)\"\n                        [disabled]=\"department._count.employees > 0\"\n                        [title]=\"department._count.employees > 0 ? 'Reassign employees before deleting' : 'Delete department'\"\n                        class=\"text-red-600 hover:text-red-800 font-medium disabled:text-slate-300 disabled:cursor-not-allowed\">\n                        Delete\n                      </button>\n\n                    </div>\n                  </td>\n                }\n\n              </tr>\n            }\n\n          </tbody>\n        </table>\n      </div>\n    }\n\n  </div>\n\n</div>\n\n<!-- Create / Edit Modal -->\n@if (showModal) {\n\n  <div class=\"fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4\">\n\n    <div class=\"bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden\">\n\n      <div class=\"px-6 py-5 border-b border-slate-200 flex justify-between items-center\">\n\n        <div>\n          <h2 class=\"text-lg font-bold text-slate-800\">\n            {{ isEditMode ? 'Edit Department' : 'Create Department' }}\n          </h2>\n\n          <p class=\"text-sm text-slate-500 mt-1\">\n            {{ isEditMode ? 'Update department information.' : 'Add a new department to your organization.' }}\n          </p>\n        </div>\n\n        <button\n          (click)=\"closeModal()\"\n          [disabled]=\"saving\"\n          class=\"text-slate-400 hover:text-slate-700 text-2xl\">\n          &times;\n        </button>\n\n      </div>\n\n      <form (ngSubmit)=\"saveDepartment()\" class=\"p-6 space-y-5\">\n\n        @if (errorMessage) {\n          <div class=\"bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm\">\n            {{ errorMessage }}\n          </div>\n        }\n\n        <div>\n          <label class=\"block text-sm font-medium text-slate-700 mb-2\">\n            Department Name *\n          </label>\n\n          <input\n            type=\"text\"\n            name=\"name\"\n            [(ngModel)]=\"formData.name\"\n            maxlength=\"100\"\n            required\n            placeholder=\"e.g. Engineering\"\n            class=\"w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500\"\n          />\n        </div>\n\n        <div>\n          <label class=\"block text-sm font-medium text-slate-700 mb-2\">\n            Description\n          </label>\n\n          <textarea\n            name=\"description\"\n            [(ngModel)]=\"formData.description\"\n            rows=\"4\"\n            placeholder=\"Enter department description...\"\n            class=\"w-full border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none\">\n          </textarea>\n        </div>\n\n        <div class=\"flex justify-end gap-3 pt-3 border-t border-slate-100\">\n\n          <button\n            type=\"button\"\n            (click)=\"closeModal()\"\n            [disabled]=\"saving\"\n            class=\"px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-sm font-medium\">\n            Cancel\n          </button>\n\n          <button\n            type=\"submit\"\n            [disabled]=\"saving\"\n            class=\"px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60\">\n            {{ saving ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Create Department') }}\n          </button>\n\n        </div>\n\n      </form>\n\n    </div>\n\n  </div>\n\n}\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Departments, { className: "Departments", filePath: "src/app/components/departments/departments.ts", lineNumber: 25 }); })();
