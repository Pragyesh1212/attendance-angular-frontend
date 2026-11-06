import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { EmployeeService } from '../../services/employee';
import { WorkLocationService } from '../../services/work-location';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = () => ({ standalone: true });
function Employees_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "button", 36);
    i0.ɵɵlistener("click", function Employees_div_9_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.successMessage = ""); });
    i0.ɵɵtext(3, "\u2715");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.successMessage, " ");
} }
function Employees_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "button", 36);
    i0.ɵɵlistener("click", function Employees_div_10_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.errorMessage = ""); });
    i0.ɵɵtext(3, "\u2715");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.errorMessage, " ");
} }
function Employees_option_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 38);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const department_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", department_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", department_r4.name, " ");
} }
function Employees_div_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵelement(1, "div", 40);
    i0.ɵɵelementEnd();
} }
function Employees_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41)(1, "div", 42);
    i0.ɵɵtext(2, "\u2659");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3", 43);
    i0.ɵɵtext(4, "No employees found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 4);
    i0.ɵɵtext(6, " Try changing your filters or add a new employee. ");
    i0.ɵɵelementEnd()();
} }
function Employees_div_59_tr_21_img_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 64);
} if (rf & 2) {
    const employee_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", employee_r6.employeeProfile.avatarUrl)("alt", ctx_r1.getFullName(employee_r6));
} }
function Employees_div_59_tr_21_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const employee_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getInitials(employee_r6), " ");
} }
function Employees_div_59_tr_21_ng_container_19_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 71);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const assignment_r7 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Until ", i0.ɵɵpipeBind2(2, 1, assignment_r7.endAt, "medium"), " ");
} }
function Employees_div_59_tr_21_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 66);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 67)(4, "span", 68);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 69);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, Employees_div_59_tr_21_ng_container_19_p_8_Template, 3, 4, "p", 70);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const assignment_r7 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", assignment_r7.location.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", assignment_r7.assignmentType === "TEMPORARY" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", assignment_r7.assignmentType, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", assignment_r7.location.type, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", assignment_r7.assignmentType === "TEMPORARY");
} }
function Employees_div_59_tr_21_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Not assigned");
    i0.ɵɵelementEnd();
} }
function Employees_div_59_tr_21_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 51)(1, "td", 52)(2, "div", 53);
    i0.ɵɵtemplate(3, Employees_div_59_tr_21_img_3_Template, 1, 2, "img", 54)(4, Employees_div_59_tr_21_div_4_Template, 2, 1, "div", 55);
    i0.ɵɵelementStart(5, "div")(6, "p", 28);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 56);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "td", 57);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 57);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 57);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 57);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td", 52);
    i0.ɵɵtemplate(19, Employees_div_59_tr_21_ng_container_19_Template, 9, 5, "ng-container", 58)(20, Employees_div_59_tr_21_ng_template_20_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 52)(23, "span", 59);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "td", 52)(26, "div", 60)(27, "div", 61)(28, "button", 62);
    i0.ɵɵlistener("click", function Employees_div_59_tr_21_Template_button_click_28_listener() { const employee_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openEditModal(employee_r6)); });
    i0.ɵɵtext(29, " Edit ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 63);
    i0.ɵɵlistener("click", function Employees_div_59_tr_21_Template_button_click_30_listener() { const employee_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openLocationModal(employee_r6)); });
    i0.ɵɵtext(31, " Assign Location ");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const employee_r6 = ctx.$implicit;
    const noWorkLocation_r8 = i0.ɵɵreference(21);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", employee_r6.employeeProfile.avatarUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !employee_r6.employeeProfile.avatarUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getFullName(employee_r6), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", employee_r6.email, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", employee_r6.employeeProfile.employeeCode, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getDepartmentName(employee_r6), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", employee_r6.employeeProfile.designation || "\u2014", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", employee_r6.employeeProfile.phone || "\u2014", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.getEffectiveWorkLocation(employee_r6))("ngIfElse", noWorkLocation_r8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", employee_r6.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", employee_r6.status, " ");
} }
function Employees_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44)(1, "table", 45)(2, "thead", 46)(3, "tr")(4, "th", 47);
    i0.ɵɵtext(5, "Employee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 47);
    i0.ɵɵtext(7, "Employee Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 47);
    i0.ɵɵtext(9, "Department");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 47);
    i0.ɵɵtext(11, "Designation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 47);
    i0.ɵɵtext(13, "Phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 47);
    i0.ɵɵtext(15, "Assigned Work Location");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 47);
    i0.ɵɵtext(17, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 48);
    i0.ɵɵtext(19, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "tbody", 49);
    i0.ɵɵtemplate(21, Employees_div_59_tr_21_Template, 32, 12, "tr", 50);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(21);
    i0.ɵɵproperty("ngForOf", ctx_r1.employees);
} }
function Employees_div_60_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 73)(1, "p", 12);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 23)(4, "button", 74);
    i0.ɵɵlistener("click", function Employees_div_60_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changePage(ctx_r1.currentPage - 1)); });
    i0.ɵɵtext(5, " Previous ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 74);
    i0.ɵɵlistener("click", function Employees_div_60_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changePage(ctx_r1.currentPage + 1)); });
    i0.ɵɵtext(7, " Next ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Page ", ctx_r1.currentPage, " of ", ctx_r1.totalPages, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.currentPage >= ctx_r1.totalPages);
} }
function Employees_div_61_p_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 101);
    i0.ɵɵtext(1, " First name is required. ");
    i0.ɵɵelementEnd();
} }
function Employees_div_61_p_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 101);
    i0.ɵɵtext(1, " Last name is required. ");
    i0.ɵɵelementEnd();
} }
function Employees_div_61_p_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 101);
    i0.ɵɵtext(1, " Employee code is required. ");
    i0.ɵɵelementEnd();
} }
function Employees_div_61_p_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 102);
    i0.ɵɵtext(1, " Employee code cannot be changed here. ");
    i0.ɵɵelementEnd();
} }
function Employees_div_61_p_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 101);
    i0.ɵɵtext(1, " Enter a valid email address. ");
    i0.ɵɵelementEnd();
} }
function Employees_div_61_div_45_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 101);
    i0.ɵɵtext(1, " Password must contain at least 12 characters. ");
    i0.ɵɵelementEnd();
} }
function Employees_div_61_div_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "label", 84);
    i0.ɵɵtext(2, " Temporary Password * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 103);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, Employees_div_61_div_45_p_4_Template, 2, 0, "p", 86);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f.password.touched && ctx_r1.f.password.invalid);
} }
function Employees_div_61_option_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 38);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const department_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", department_r11.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", department_r11.name, " ");
} }
function Employees_div_61_p_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 101);
    i0.ɵɵtext(1, " Enter a valid HTTP or HTTPS URL. ");
    i0.ɵɵelementEnd();
} }
function Employees_div_61_div_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 104);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.errorMessage, " ");
} }
function Employees_div_61_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 75);
    i0.ɵɵlistener("click", function Employees_div_61_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAddModal()); });
    i0.ɵɵelementStart(1, "div", 76);
    i0.ɵɵlistener("click", function Employees_div_61_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 77)(3, "div")(4, "h2", 78);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 4);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 79);
    i0.ɵɵlistener("click", function Employees_div_61_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAddModal()); });
    i0.ɵɵtext(9, " \u00D7 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 80);
    i0.ɵɵlistener("ngSubmit", function Employees_div_61_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveEmployee()); });
    i0.ɵɵelementStart(11, "div", 81)(12, "section")(13, "h3", 82);
    i0.ɵɵtext(14, " Personal Information ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 83)(16, "div")(17, "label", 84);
    i0.ɵɵtext(18, " First Name * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "input", 85);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, Employees_div_61_p_20_Template, 2, 0, "p", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div")(22, "label", 84);
    i0.ɵɵtext(23, " Last Name * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "input", 87);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, Employees_div_61_p_25_Template, 2, 0, "p", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div")(27, "label", 84);
    i0.ɵɵtext(28, " Employee Code * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "input", 88);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(30, Employees_div_61_p_30_Template, 2, 0, "p", 86)(31, Employees_div_61_p_31_Template, 2, 0, "p", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div")(33, "label", 84);
    i0.ɵɵtext(34, " Phone Number ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "input", 90);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(36, "section")(37, "h3", 82);
    i0.ɵɵtext(38, " Account Information ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 83)(40, "div")(41, "label", 84);
    i0.ɵɵtext(42, " Email Address * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "input", 91);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(44, Employees_div_61_p_44_Template, 2, 0, "p", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(45, Employees_div_61_div_45_Template, 5, 1, "div", 92);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "section")(47, "h3", 82);
    i0.ɵɵtext(48, " Professional Information ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "div", 83)(50, "div")(51, "label", 84);
    i0.ɵɵtext(52, " Designation ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "input", 93);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(54, "div")(55, "label", 84);
    i0.ɵɵtext(56, " Department ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "select", 94);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(58, "option", 19);
    i0.ɵɵtext(59, "Select Department");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(60, Employees_div_61_option_60_Template, 2, 2, "option", 20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "div")(62, "label", 84);
    i0.ɵɵtext(63, " Joining Date ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "input", 95);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div")(66, "label", 84);
    i0.ɵɵtext(67, " Profile Image URL ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "input", 96);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(69, Employees_div_61_p_69_Template, 2, 0, "p", 86);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(70, Employees_div_61_div_70_Template, 2, 1, "div", 97);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "div", 98)(72, "button", 99);
    i0.ɵɵlistener("click", function Employees_div_61_Template_button_click_72_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAddModal()); });
    i0.ɵɵtext(73, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(74, "button", 100);
    i0.ɵɵtext(75);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isEditMode ? "Edit Employee" : "Add New Employee", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isEditMode ? "Update employee information." : "Create a new employee account and profile.", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.employeeForm);
    i0.ɵɵadvance(9);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f.firstName.touched && ctx_r1.f.firstName.invalid);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f.lastName.touched && ctx_r1.f.lastName.invalid);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f.employeeCode.touched && ctx_r1.f.employeeCode.invalid);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isEditMode);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(8);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f.email.touched && ctx_r1.f.email.invalid);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isEditMode);
    i0.ɵɵadvance(8);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.departments);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.f.avatarUrl.touched && ctx_r1.f.avatarUrl.invalid);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.errorMessage && ctx_r1.showAddModal);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving ? ctx_r1.isEditMode ? "Saving..." : "Creating..." : ctx_r1.isEditMode ? "Save Changes" : "Create Employee", " ");
} }
function Employees_div_62_option_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 38);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const location_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", location_r13.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", location_r13.name, " \u00B7 ", location_r13.type, " ");
} }
function Employees_div_62_p_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 115);
    i0.ɵɵtext(1, " No active work locations found. Create and activate a location in the Work Locations module first. ");
    i0.ɵɵelementEnd();
} }
function Employees_div_62_div_27_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 116)(1, "div", 83)(2, "div")(3, "label", 84);
    i0.ɵɵtext(4, "Start Date & Time *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 117);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Employees_div_62_div_27_Template_input_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.temporaryStartAt, $event) || (ctx_r1.temporaryStartAt = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div")(7, "label", 84);
    i0.ɵɵtext(8, "End Date & Time *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 117);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Employees_div_62_div_27_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.temporaryEndAt, $event) || (ctx_r1.temporaryEndAt = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div")(11, "label", 84);
    i0.ɵɵtext(12, "Reason");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "textarea", 118);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Employees_div_62_div_27_Template_textarea_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.temporaryReason, $event) || (ctx_r1.temporaryReason = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.temporaryStartAt);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(6, _c0));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.temporaryEndAt);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(7, _c0));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.temporaryReason);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(8, _c0));
    i0.ɵɵcontrol();
} }
function Employees_div_62_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 104);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.locationErrorMessage, " ");
} }
function Employees_div_62_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 105);
    i0.ɵɵlistener("click", function Employees_div_62_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeLocationModal()); });
    i0.ɵɵelementStart(1, "div", 106);
    i0.ɵɵlistener("click", function Employees_div_62_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 77)(3, "div")(4, "h2", 78);
    i0.ɵɵtext(5, "Assign Work Location");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 4);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 79);
    i0.ɵɵlistener("click", function Employees_div_62_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeLocationModal()); });
    i0.ɵɵtext(9, " \u00D7 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 107)(11, "div")(12, "label", 84);
    i0.ɵɵtext(13, " Existing Work Location * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "select", 108);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtwoWayListener("ngModelChange", function Employees_div_62_Template_select_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.selectedWorkLocationId, $event) || (ctx_r1.selectedWorkLocationId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(15, "option", 19);
    i0.ɵɵtext(16, "Select a created work location");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, Employees_div_62_option_17_Template, 2, 3, "option", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, Employees_div_62_p_18_Template, 2, 0, "p", 109);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div")(20, "label", 110);
    i0.ɵɵtext(21, " Assignment Type * ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 111)(23, "button", 112);
    i0.ɵɵlistener("click", function Employees_div_62_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.locationAssignmentType = "PERMANENT"); });
    i0.ɵɵtext(24, " Permanent ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "button", 112);
    i0.ɵɵlistener("click", function Employees_div_62_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.locationAssignmentType = "TEMPORARY"); });
    i0.ɵɵtext(26, " Temporary ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(27, Employees_div_62_div_27_Template, 14, 9, "div", 113)(28, Employees_div_62_div_28_Template, 2, 1, "div", 97);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 98)(30, "button", 99);
    i0.ɵɵlistener("click", function Employees_div_62_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeLocationModal()); });
    i0.ɵɵtext(31, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 114);
    i0.ɵɵlistener("click", function Employees_div_62_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.assignWorkLocation()); });
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.selectedEmployeeForLocation ? ctx_r1.getFullName(ctx_r1.selectedEmployeeForLocation) : "", " ");
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.selectedWorkLocationId);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(12, _c0));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.workLocations);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.workLocations.length === 0);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngClass", ctx_r1.locationAssignmentType === "PERMANENT" ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.locationAssignmentType === "TEMPORARY" ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.locationAssignmentType === "TEMPORARY");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.locationErrorMessage);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.assigningLocation);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.assigningLocation || ctx_r1.workLocations.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.assigningLocation ? "Assigning..." : "Assign Location", " ");
} }
export class Employees {
    employeeService = inject(EmployeeService);
    workLocationService = inject(WorkLocationService);
    fb = inject(FormBuilder);
    cdr = inject(ChangeDetectorRef);
    // Data
    employees = [];
    departments = [];
    workLocations = [];
    // Loading states
    loading = false;
    saving = false;
    assigningLocation = false;
    // Messages
    errorMessage = '';
    successMessage = '';
    locationErrorMessage = '';
    // Filters
    searchTerm = '';
    statusFilter = '';
    departmentFilter = '';
    // Pagination
    currentPage = 1;
    pageSize = 10;
    totalEmployees = 0;
    totalPages = 0;
    // Employee modal
    showAddModal = false;
    isEditMode = false;
    selectedEmployeeId = null;
    // Work location modal
    showLocationModal = false;
    selectedEmployeeForLocation = null;
    locationAssignmentType = 'PERMANENT';
    selectedWorkLocationId = '';
    temporaryStartAt = '';
    temporaryEndAt = '';
    temporaryReason = '';
    // Employee form
    employeeForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: [
            '',
            [
                Validators.required,
                Validators.minLength(12),
                Validators.maxLength(128)
            ]
        ],
        employeeCode: [
            '',
            [
                Validators.required,
                Validators.maxLength(50)
            ]
        ],
        firstName: [
            '',
            [
                Validators.required,
                Validators.maxLength(100)
            ]
        ],
        lastName: [
            '',
            [
                Validators.required,
                Validators.maxLength(100)
            ]
        ],
        phone: ['', Validators.maxLength(20)],
        designation: ['', Validators.maxLength(100)],
        departmentId: [''],
        joiningDate: [''],
        avatarUrl: [
            '',
            Validators.pattern(/^https?:\/\/.+/i)
        ]
    });
    // ==========================================
    // INITIALIZATION
    // ==========================================
    ngOnInit() {
        this.loadDepartments();
        this.loadEmployees();
        this.loadWorkLocations();
    }
    // ==========================================
    // LOAD DEPARTMENTS
    // ==========================================
    loadDepartments() {
        this.employeeService.getDepartments().subscribe({
            next: (response) => {
                this.departments = Array.isArray(response)
                    ? response
                    : response?.data ||
                        response?.departments ||
                        [];
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Failed to load departments:', error);
            }
        });
    }
    // ==========================================
    // LOAD EMPLOYEES
    // ==========================================
    loadEmployees() {
        this.loading = true;
        this.errorMessage = '';
        this.employeeService.getEmployees(this.currentPage, this.pageSize, this.searchTerm, this.statusFilter, this.departmentFilter)
            .pipe(finalize(() => {
            this.loading = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                this.employees = response.data || [];
                this.totalEmployees =
                    response.pagination?.total || 0;
                this.totalPages =
                    response.pagination?.totalPages || 0;
                this.currentPage =
                    response.pagination?.page || this.currentPage;
            },
            error: (error) => {
                console.error('Failed to load employees:', error);
                this.errorMessage =
                    error.error?.message ||
                        'Unable to load employees. Please try again.';
            }
        });
    }
    // ==========================================
    // FILTERS
    // ==========================================
    applyFilters() {
        this.currentPage = 1;
        this.loadEmployees();
    }
    resetFilters() {
        this.searchTerm = '';
        this.statusFilter = '';
        this.departmentFilter = '';
        this.currentPage = 1;
        this.loadEmployees();
    }
    // ==========================================
    // PAGINATION
    // ==========================================
    changePage(page) {
        if (page < 1 ||
            page > this.totalPages ||
            page === this.currentPage) {
            return;
        }
        this.currentPage = page;
        this.loadEmployees();
    }
    // ==========================================
    // WORK LOCATIONS
    // ==========================================
    loadWorkLocations() {
        this.workLocationService.getAll().subscribe({
            next: (response) => {
                const locations = Array.isArray(response)
                    ? response
                    : response?.data ||
                        response?.workLocations ||
                        response?.locations ||
                        [];
                this.workLocations = locations.filter((location) => location.status === 'ACTIVE');
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Work locations loading failed:', error);
            }
        });
    }
    openLocationModal(employee) {
        this.selectedEmployeeForLocation = employee;
        this.locationAssignmentType = 'PERMANENT';
        this.selectedWorkLocationId = '';
        this.temporaryStartAt = '';
        this.temporaryEndAt = '';
        this.temporaryReason = '';
        this.locationErrorMessage = '';
        this.showLocationModal = true;
        // Refresh locations before displaying the dropdown.
        this.loadWorkLocations();
    }
    closeLocationModal() {
        if (this.assigningLocation) {
            return;
        }
        this.showLocationModal = false;
        this.selectedEmployeeForLocation = null;
        this.locationErrorMessage = '';
    }
    assignWorkLocation() {
        this.locationErrorMessage = '';
        if (!this.selectedEmployeeForLocation) {
            this.locationErrorMessage =
                'Please select an employee.';
            return;
        }
        if (!this.selectedWorkLocationId) {
            this.locationErrorMessage =
                'Please select a work location.';
            return;
        }
        const employeeProfileId = this.selectedEmployeeForLocation.employeeProfile.id;
        // Validate temporary assignment.
        if (this.locationAssignmentType === 'TEMPORARY') {
            if (!this.temporaryStartAt || !this.temporaryEndAt) {
                this.locationErrorMessage =
                    'Select both start and end date/time.';
                return;
            }
            const start = new Date(this.temporaryStartAt);
            const end = new Date(this.temporaryEndAt);
            if (Number.isNaN(start.getTime()) ||
                Number.isNaN(end.getTime()) ||
                end <= start) {
                this.locationErrorMessage =
                    'End date/time must be later than start date/time.';
                return;
            }
        }
        this.assigningLocation = true;
        // Permanent assignment.
        const request$ = this.locationAssignmentType === 'PERMANENT'
            ? this.workLocationService.assignPermanent(employeeProfileId, this.selectedWorkLocationId)
            // Temporary assignment.
            : this.workLocationService.assignTemporary(employeeProfileId, {
                workLocationId: this.selectedWorkLocationId,
                startAt: new Date(this.temporaryStartAt).toISOString(),
                endAt: new Date(this.temporaryEndAt).toISOString(),
                reason: this.temporaryReason.trim() || undefined
            });
        request$
            .pipe(finalize(() => {
            this.assigningLocation = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                this.showLocationModal = false;
                this.selectedEmployeeForLocation = null;
                this.successMessage =
                    response?.message ||
                        'Work location assigned successfully.';
                this.loadEmployees();
            },
            error: (error) => {
                this.locationErrorMessage =
                    error.error?.message ||
                        'Unable to assign work location. Please try again.';
            }
        });
    }
    // ==========================================
    // EMPLOYEE FORM RESET
    // ==========================================
    resetEmployeeForm() {
        this.employeeForm.reset({
            email: '',
            password: '',
            employeeCode: '',
            firstName: '',
            lastName: '',
            phone: '',
            designation: '',
            departmentId: '',
            joiningDate: '',
            avatarUrl: ''
        });
    }
    // ==========================================
    // OPEN ADD EMPLOYEE MODAL
    // ==========================================
    openAddModal() {
        this.isEditMode = false;
        this.selectedEmployeeId = null;
        this.resetEmployeeForm();
        this.employeeForm.get('password')?.setValidators([
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(128)
        ]);
        this.employeeForm
            .get('password')
            ?.updateValueAndValidity();
        this.employeeForm.get('employeeCode')?.enable();
        this.errorMessage = '';
        this.showAddModal = true;
    }
    // ==========================================
    // OPEN EDIT EMPLOYEE MODAL
    // ==========================================
    openEditModal(employee) {
        this.isEditMode = true;
        this.selectedEmployeeId = employee.id;
        this.errorMessage = '';
        this.employeeForm.patchValue({
            email: employee.email || '',
            password: '',
            employeeCode: employee.employeeProfile.employeeCode || '',
            firstName: employee.employeeProfile.firstName || '',
            lastName: employee.employeeProfile.lastName || '',
            phone: employee.employeeProfile.phone || '',
            designation: employee.employeeProfile.designation || '',
            departmentId: employee.employeeProfile.department?.id || '',
            joiningDate: employee.employeeProfile.joiningDate
                ? employee.employeeProfile.joiningDate.substring(0, 10)
                : '',
            avatarUrl: employee.employeeProfile.avatarUrl || ''
        });
        // Current backend update DTO does not support password
        // or employeeCode updates.
        this.employeeForm.get('password')?.clearValidators();
        this.employeeForm
            .get('password')
            ?.updateValueAndValidity();
        this.employeeForm.get('employeeCode')?.disable();
        this.showAddModal = true;
    }
    // ==========================================
    // CLOSE EMPLOYEE MODAL
    // ==========================================
    closeAddModal() {
        if (this.saving) {
            return;
        }
        this.showAddModal = false;
        this.selectedEmployeeId = null;
        this.isEditMode = false;
        this.employeeForm.get('employeeCode')?.enable();
    }
    // ==========================================
    // FORM CONTROLS
    // ==========================================
    get f() {
        return this.employeeForm.controls;
    }
    // ==========================================
    // SAVE EMPLOYEE
    // ==========================================
    saveEmployee() {
        this.employeeForm.markAllAsTouched();
        if (this.employeeForm.invalid) {
            return;
        }
        if (this.isEditMode) {
            this.updateExistingEmployee();
            return;
        }
        this.createNewEmployee();
    }
    // ==========================================
    // CREATE EMPLOYEE
    // ==========================================
    createNewEmployee() {
        this.saving = true;
        this.errorMessage = '';
        this.successMessage = '';
        const formValue = this.employeeForm.getRawValue();
        const payload = {
            email: formValue.email.trim(),
            password: formValue.password,
            employeeCode: formValue.employeeCode.trim(),
            firstName: formValue.firstName.trim(),
            lastName: formValue.lastName.trim(),
            phone: formValue.phone?.trim() || undefined,
            designation: formValue.designation?.trim() || undefined,
            departmentId: formValue.departmentId || undefined,
            joiningDate: formValue.joiningDate || undefined,
            avatarUrl: formValue.avatarUrl?.trim() || undefined
        };
        this.employeeService
            .createEmployee(payload)
            .pipe(finalize(() => {
            this.saving = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                this.showAddModal = false;
                this.successMessage =
                    response.message ||
                        'Employee created successfully.';
                this.currentPage = 1;
                this.loadEmployees();
            },
            error: (error) => {
                this.errorMessage =
                    error.error?.message ||
                        'Unable to create employee. Please try again.';
            }
        });
    }
    // ==========================================
    // UPDATE EMPLOYEE
    // ==========================================
    updateExistingEmployee() {
        if (!this.selectedEmployeeId) {
            this.errorMessage =
                'No employee selected for editing.';
            return;
        }
        this.saving = true;
        this.errorMessage = '';
        this.successMessage = '';
        const formValue = this.employeeForm.getRawValue();
        const payload = {
            email: formValue.email.trim(),
            firstName: formValue.firstName.trim(),
            lastName: formValue.lastName.trim(),
            phone: formValue.phone?.trim() || undefined,
            designation: formValue.designation?.trim() || undefined,
            departmentId: formValue.departmentId || undefined,
            joiningDate: formValue.joiningDate || undefined,
            avatarUrl: formValue.avatarUrl?.trim() || undefined
        };
        this.employeeService
            .updateEmployee(this.selectedEmployeeId, payload)
            .pipe(finalize(() => {
            this.saving = false;
            this.cdr.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                this.showAddModal = false;
                this.selectedEmployeeId = null;
                this.isEditMode = false;
                this.employeeForm.get('employeeCode')?.enable();
                this.successMessage =
                    response.message ||
                        'Employee updated successfully.';
                this.loadEmployees();
            },
            error: (error) => {
                this.errorMessage =
                    error.error?.message ||
                        'Unable to update employee. Please try again.';
            }
        });
    }
    // ==========================================
    // EMPLOYEE DISPLAY HELPERS
    // ==========================================
    getFullName(employee) {
        return `${employee.employeeProfile.firstName} ${employee.employeeProfile.lastName}`;
    }
    getInitials(employee) {
        const first = employee.employeeProfile.firstName?.charAt(0) || '';
        const last = employee.employeeProfile.lastName?.charAt(0) || '';
        return (first + last).toUpperCase();
    }
    getDepartmentName(employee) {
        return employee.employeeProfile.department?.name ||
            'Not assigned';
    }
    getStatusClass(status) {
        return status === 'ACTIVE'
            ? 'active'
            : 'inactive';
    }
    getEffectiveWorkLocation(employee) {
        const profile = employee.employeeProfile;
        const temporary = profile.temporaryLocationAssignments?.[0];
        if (temporary?.workLocation) {
            return {
                location: temporary.workLocation,
                assignmentType: 'TEMPORARY',
                startAt: temporary.startAt,
                endAt: temporary.endAt,
            };
        }
        if (profile.workLocation?.status === 'ACTIVE') {
            return {
                location: profile.workLocation,
                assignmentType: 'PERMANENT',
                startAt: null,
                endAt: null,
            };
        }
        return null;
    }
    static ɵfac = function Employees_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Employees)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Employees, selectors: [["app-employees"]], decls: 63, vars: 16, consts: [["noWorkLocation", ""], [1, "min-h-screen", "bg-slate-50", "p-4", "md:p-6"], [1, "mb-6", "flex", "flex-col", "justify-between", "gap-4", "sm:flex-row", "sm:items-center"], [1, "text-2xl", "font-bold", "text-slate-800"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "rounded-lg", "bg-blue-600", "px-5", "py-2.5", "text-sm", "font-semibold", "text-white", "shadow-sm", "transition", "hover:bg-blue-700", 3, "click"], ["class", "mb-5 flex justify-between rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700", 4, "ngIf"], ["class", "mb-5 flex justify-between rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700", 4, "ngIf"], [1, "mb-6", "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2"], [1, "rounded-xl", "border", "border-slate-200", "bg-white", "p-5", "shadow-sm"], [1, "flex", "items-center", "gap-4"], [1, "flex", "h-12", "w-12", "items-center", "justify-center", "rounded-xl", "bg-blue-50", "text-xl", "text-blue-600"], [1, "text-sm", "text-slate-500"], [1, "mt-1", "text-2xl", "font-bold", "text-slate-800"], [1, "flex", "h-12", "w-12", "items-center", "justify-center", "rounded-xl", "bg-indigo-50", "text-xl", "text-indigo-600"], [1, "mb-6", "rounded-xl", "border", "border-slate-200", "bg-white", "p-4", "shadow-sm"], [1, "grid", "grid-cols-1", "gap-3", "md:grid-cols-2", "xl:grid-cols-5"], ["type", "text", "placeholder", "Search employees...", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "transition", "focus:border-blue-500", "focus:ring-2", "focus:ring-blue-100", "xl:col-span-2", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "w-full", "rounded-lg", "border", "border-slate-300", "bg-white", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["value", "ACTIVE"], ["value", "INACTIVE"], [1, "flex", "gap-2"], [1, "flex-1", "rounded-lg", "bg-blue-600", "px-4", "py-2", "text-sm", "font-medium", "text-white", "hover:bg-blue-700", 3, "click"], [1, "flex-1", "rounded-lg", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", "text-slate-600", "hover:bg-slate-50", 3, "click"], [1, "overflow-hidden", "rounded-xl", "border", "border-slate-200", "bg-white", "shadow-sm"], [1, "flex", "items-center", "justify-between", "border-b", "border-slate-200", "px-5", "py-4"], [1, "font-semibold", "text-slate-800"], ["class", "flex justify-center py-16", 4, "ngIf"], ["class", "py-16 text-center", 4, "ngIf"], ["class", "overflow-x-auto", 4, "ngIf"], ["class", "flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4", 4, "ngIf"], ["class", "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-3 sm:p-6", 3, "click", 4, "ngIf"], ["class", "fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-900/50 p-3 sm:p-6", 3, "click", 4, "ngIf"], [1, "mb-5", "flex", "justify-between", "rounded-lg", "border", "border-green-200", "bg-green-50", "p-3", "text-sm", "text-green-700"], [3, "click"], [1, "mb-5", "flex", "justify-between", "rounded-lg", "border", "border-red-200", "bg-red-50", "p-3", "text-sm", "text-red-700"], [3, "value"], [1, "flex", "justify-center", "py-16"], [1, "h-9", "w-9", "animate-spin", "rounded-full", "border-4", "border-blue-100", "border-t-blue-600"], [1, "py-16", "text-center"], [1, "mb-3", "text-4xl", "text-slate-300"], [1, "font-semibold", "text-slate-700"], [1, "overflow-x-auto"], [1, "w-full", "min-w-[1250px]", "text-left", "text-sm"], [1, "bg-slate-50", "text-xs", "uppercase", "tracking-wide", "text-slate-500"], [1, "px-5", "py-4", "font-semibold"], [1, "px-5", "py-4", "text-right", "font-semibold"], [1, "divide-y", "divide-slate-100"], ["class", "transition hover:bg-slate-50", 4, "ngFor", "ngForOf"], [1, "transition", "hover:bg-slate-50"], [1, "px-5", "py-4"], [1, "flex", "items-center", "gap-3"], ["class", "h-10 w-10 rounded-full object-cover", 3, "src", "alt", 4, "ngIf"], ["class", "flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700", 4, "ngIf"], [1, "mt-0.5", "text-xs", "text-slate-500"], [1, "px-5", "py-4", "text-slate-600"], [4, "ngIf", "ngIfElse"], [1, "rounded-full", "px-3", "py-1", "text-xs", "font-semibold", 3, "ngClass"], [1, "flex", "justify-end"], [1, "flex", "justify-end", "gap-2"], ["type", "button", 1, "rounded-lg", "border", "border-blue-200", "px-3", "py-1.5", "text-xs", "font-semibold", "text-blue-700", "transition", "hover:bg-blue-50", 3, "click"], ["type", "button", 1, "rounded-lg", "border", "border-indigo-200", "px-3", "py-1.5", "text-xs", "font-semibold", "text-indigo-700", "transition", "hover:bg-indigo-50", 3, "click"], [1, "h-10", "w-10", "rounded-full", "object-cover", 3, "src", "alt"], [1, "flex", "h-10", "w-10", "items-center", "justify-center", "rounded-full", "bg-blue-100", "font-semibold", "text-blue-700"], [1, "font-medium", "text-slate-800"], [1, "mt-1", "flex", "flex-wrap", "items-center", "gap-2"], [1, "rounded-full", "px-2", "py-0.5", "text-xs", "font-semibold", 3, "ngClass"], [1, "text-xs", "text-slate-500"], ["class", "mt-1 max-w-xs text-xs text-slate-500", 4, "ngIf"], [1, "mt-1", "max-w-xs", "text-xs", "text-slate-500"], [1, "text-slate-400"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-200", "px-5", "py-4"], [1, "rounded-lg", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", "text-slate-600", "hover:bg-slate-50", "disabled:cursor-not-allowed", "disabled:opacity-40", 3, "click", "disabled"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "overflow-y-auto", "bg-slate-900/50", "p-3", "sm:p-6", 3, "click"], [1, "my-auto", "w-full", "max-w-3xl", "overflow-hidden", "rounded-2xl", "bg-white", "shadow-2xl", 3, "click"], [1, "flex", "items-start", "justify-between", "border-b", "border-slate-200", "px-6", "py-5"], [1, "text-xl", "font-bold", "text-slate-800"], ["type", "button", 1, "text-2xl", "text-slate-400", "hover:text-slate-700", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "max-h-[65vh]", "space-y-6", "overflow-y-auto", "p-6"], [1, "mb-4", "border-b", "border-slate-100", "pb-2", "text-sm", "font-bold", "text-blue-700"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2"], [1, "mb-1.5", "block", "text-sm", "font-medium", "text-slate-700"], ["formControlName", "firstName", "placeholder", "Enter first name", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", "focus:ring-2", "focus:ring-blue-100"], ["class", "mt-1 text-xs text-red-600", 4, "ngIf"], ["formControlName", "lastName", "placeholder", "Enter last name", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", "focus:ring-2", "focus:ring-blue-100"], ["formControlName", "employeeCode", "placeholder", "e.g. EMP001", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", "focus:ring-2", "focus:ring-blue-100", "disabled:bg-slate-100", "disabled:text-slate-500"], ["class", "mt-1 text-xs text-slate-500", 4, "ngIf"], ["formControlName", "phone", "placeholder", "Enter phone number", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", "focus:ring-2", "focus:ring-blue-100"], ["type", "email", "formControlName", "email", "placeholder", "employee@company.com", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", "focus:ring-2", "focus:ring-blue-100"], [4, "ngIf"], ["formControlName", "designation", "placeholder", "e.g. Software Developer", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", "focus:ring-2", "focus:ring-blue-100"], ["formControlName", "departmentId", 1, "w-full", "rounded-lg", "border", "border-slate-300", "bg-white", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500"], ["type", "date", "formControlName", "joiningDate", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500"], ["type", "url", "formControlName", "avatarUrl", "placeholder", "https://example.com/image.jpg", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500"], ["class", "rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700", 4, "ngIf"], [1, "flex", "justify-end", "gap-3", "border-t", "border-slate-200", "bg-slate-50", "px-6", "py-4"], ["type", "button", 1, "rounded-lg", "border", "border-slate-300", "bg-white", "px-5", "py-2.5", "text-sm", "font-medium", "text-slate-600", "hover:bg-slate-100", "disabled:opacity-50", 3, "click", "disabled"], ["type", "submit", 1, "rounded-lg", "bg-blue-600", "px-5", "py-2.5", "text-sm", "font-semibold", "text-white", "hover:bg-blue-700", "disabled:opacity-50", 3, "disabled"], [1, "mt-1", "text-xs", "text-red-600"], [1, "mt-1", "text-xs", "text-slate-500"], ["type", "password", "formControlName", "password", "placeholder", "Minimum 12 characters", 1, "w-full", "rounded-lg", "border", "border-slate-300", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", "focus:ring-2", "focus:ring-blue-100"], [1, "rounded-lg", "border", "border-red-200", "bg-red-50", "p-3", "text-sm", "text-red-700"], [1, "fixed", "inset-0", "z-[60]", "flex", "items-center", "justify-center", "overflow-y-auto", "bg-slate-900/50", "p-3", "sm:p-6", 3, "click"], [1, "my-auto", "w-full", "max-w-xl", "overflow-hidden", "rounded-2xl", "bg-white", "shadow-2xl", 3, "click"], [1, "space-y-5", "p-6"], [1, "w-full", "rounded-lg", "border", "border-slate-300", "bg-white", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", "focus:ring-2", "focus:ring-blue-100", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["class", "mt-2 text-xs text-amber-700", 4, "ngIf"], [1, "mb-2", "block", "text-sm", "font-medium", "text-slate-700"], [1, "grid", "grid-cols-2", "gap-3"], ["type", "button", 1, "rounded-lg", "border", "px-4", "py-3", "text-sm", "font-semibold", "transition", 3, "click", "ngClass"], ["class", "space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4", 4, "ngIf"], ["type", "button", 1, "rounded-lg", "bg-blue-600", "px-5", "py-2.5", "text-sm", "font-semibold", "text-white", "hover:bg-blue-700", "disabled:cursor-not-allowed", "disabled:opacity-50", 3, "click", "disabled"], [1, "mt-2", "text-xs", "text-amber-700"], [1, "space-y-4", "rounded-xl", "border", "border-slate-200", "bg-slate-50", "p-4"], ["type", "datetime-local", 1, "w-full", "rounded-lg", "border", "border-slate-300", "bg-white", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["rows", "2", "placeholder", "Optional reason for temporary assignment", 1, "w-full", "rounded-lg", "border", "border-slate-300", "bg-white", "px-3", "py-2.5", "text-sm", "outline-none", "focus:border-blue-500", 3, "ngModelChange", "ngModel", "ngModelOptions"]], template: function Employees_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h1", 3);
            i0.ɵɵtext(4, "Employee Management");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 4);
            i0.ɵɵtext(6, " Manage employees and their information. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 5);
            i0.ɵɵlistener("click", function Employees_Template_button_click_7_listener() { return ctx.openAddModal(); });
            i0.ɵɵtext(8, " + Add Employee ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, Employees_div_9_Template, 4, 1, "div", 6)(10, Employees_div_10_Template, 4, 1, "div", 7);
            i0.ɵɵelementStart(11, "div", 8)(12, "div", 9)(13, "div", 10)(14, "div", 11)(15, "span");
            i0.ɵɵtext(16, "\u2659");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div")(18, "p", 12);
            i0.ɵɵtext(19, "Total Employees");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "h2", 13);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(22, "div", 9)(23, "div", 10)(24, "div", 14)(25, "span");
            i0.ɵɵtext(26, "\u25A4");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div")(28, "p", 12);
            i0.ɵɵtext(29, "Current Page");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "h2", 13);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(32, "div", 15)(33, "div", 16)(34, "input", 17);
            i0.ɵɵcontrolCreate();
            i0.ɵɵtwoWayListener("ngModelChange", function Employees_Template_input_ngModelChange_34_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event); return $event; });
            i0.ɵɵlistener("keyup.enter", function Employees_Template_input_keyup_enter_34_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "select", 18);
            i0.ɵɵcontrolCreate();
            i0.ɵɵtwoWayListener("ngModelChange", function Employees_Template_select_ngModelChange_35_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.departmentFilter, $event) || (ctx.departmentFilter = $event); return $event; });
            i0.ɵɵelementStart(36, "option", 19);
            i0.ɵɵtext(37, "All Departments");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(38, Employees_option_38_Template, 2, 2, "option", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "select", 18);
            i0.ɵɵcontrolCreate();
            i0.ɵɵtwoWayListener("ngModelChange", function Employees_Template_select_ngModelChange_39_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event); return $event; });
            i0.ɵɵelementStart(40, "option", 19);
            i0.ɵɵtext(41, "All Statuses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "option", 21);
            i0.ɵɵtext(43, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "option", 22);
            i0.ɵɵtext(45, "Inactive");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "div", 23)(47, "button", 24);
            i0.ɵɵlistener("click", function Employees_Template_button_click_47_listener() { return ctx.applyFilters(); });
            i0.ɵɵtext(48, " Apply ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "button", 25);
            i0.ɵɵlistener("click", function Employees_Template_button_click_49_listener() { return ctx.resetFilters(); });
            i0.ɵɵtext(50, " Reset ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(51, "div", 26)(52, "div", 27)(53, "h2", 28);
            i0.ɵɵtext(54, "Employees");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "span", 12);
            i0.ɵɵtext(56);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(57, Employees_div_57_Template, 2, 0, "div", 29)(58, Employees_div_58_Template, 7, 0, "div", 30)(59, Employees_div_59_Template, 22, 1, "div", 31)(60, Employees_div_60_Template, 8, 4, "div", 32);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(61, Employees_div_61_Template, 76, 15, "div", 33)(62, Employees_div_62_Template, 34, 13, "div", 34);
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.successMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.errorMessage && !ctx.showAddModal);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.totalEmployees);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate2(" ", ctx.currentPage, " / ", ctx.totalPages || 1, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchTerm);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.departmentFilter);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.departments);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.statusFilter);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(17);
            i0.ɵɵtextInterpolate1("", ctx.totalEmployees, " records");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.employees.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.employees.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.totalPages > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showAddModal);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showLocationModal);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.NgModel, ReactiveFormsModule, i2.FormGroupDirective, i2.FormControlName, i1.DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Employees, [{
        type: Component,
        args: [{ selector: 'app-employees', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule
                ], template: "\n<div class=\"min-h-screen bg-slate-50 p-4 md:p-6\">\n\n  <!-- Header -->\n  <div class=\"mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center\">\n    <div>\n      <h1 class=\"text-2xl font-bold text-slate-800\">Employee Management</h1>\n      <p class=\"mt-1 text-sm text-slate-500\">\n        Manage employees and their information.\n      </p>\n    </div>\n\n    <button\n      (click)=\"openAddModal()\"\n      class=\"rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700\">\n      + Add Employee\n    </button>\n  </div>\n\n  <!-- Notifications -->\n  <div *ngIf=\"successMessage\"\n    class=\"mb-5 flex justify-between rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700\">\n    {{ successMessage }}\n    <button (click)=\"successMessage = ''\">\u2715</button>\n  </div>\n\n  <div *ngIf=\"errorMessage && !showAddModal\"\n    class=\"mb-5 flex justify-between rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700\">\n    {{ errorMessage }}\n    <button (click)=\"errorMessage = ''\">\u2715</button>\n  </div>\n\n  <!-- Statistics -->\n  <div class=\"mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2\">\n    <div class=\"rounded-xl border border-slate-200 bg-white p-5 shadow-sm\">\n      <div class=\"flex items-center gap-4\">\n        <div class=\"flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600\">\n          <span>\u2659</span>\n        </div>\n        <div>\n          <p class=\"text-sm text-slate-500\">Total Employees</p>\n          <h2 class=\"mt-1 text-2xl font-bold text-slate-800\">{{ totalEmployees }}</h2>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"rounded-xl border border-slate-200 bg-white p-5 shadow-sm\">\n      <div class=\"flex items-center gap-4\">\n        <div class=\"flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600\">\n          <span>\u25A4</span>\n        </div>\n        <div>\n          <p class=\"text-sm text-slate-500\">Current Page</p>\n          <h2 class=\"mt-1 text-2xl font-bold text-slate-800\">\n            {{ currentPage }} / {{ totalPages || 1 }}\n          </h2>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Filters -->\n  <div class=\"mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm\">\n    <div class=\"grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5\">\n\n      <input\n        type=\"text\"\n        [(ngModel)]=\"searchTerm\"\n        (keyup.enter)=\"applyFilters()\"\n        placeholder=\"Search employees...\"\n        class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 xl:col-span-2\"\n      />\n\n      <select\n        [(ngModel)]=\"departmentFilter\"\n        class=\"w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500\">\n        <option value=\"\">All Departments</option>\n        <option *ngFor=\"let department of departments\" [value]=\"department.id\">\n          {{ department.name }}\n        </option>\n      </select>\n\n      <select\n        [(ngModel)]=\"statusFilter\"\n        class=\"w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500\">\n        <option value=\"\">All Statuses</option>\n        <option value=\"ACTIVE\">Active</option>\n        <option value=\"INACTIVE\">Inactive</option>\n      </select>\n\n      <div class=\"flex gap-2\">\n        <button\n          (click)=\"applyFilters()\"\n          class=\"flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700\">\n          Apply\n        </button>\n\n        <button\n          (click)=\"resetFilters()\"\n          class=\"flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50\">\n          Reset\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <!-- Employee Table -->\n  <div class=\"overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm\">\n\n    <div class=\"flex items-center justify-between border-b border-slate-200 px-5 py-4\">\n      <h2 class=\"font-semibold text-slate-800\">Employees</h2>\n      <span class=\"text-sm text-slate-500\">{{ totalEmployees }} records</span>\n    </div>\n\n    <!-- Loading -->\n    <div *ngIf=\"loading\" class=\"flex justify-center py-16\">\n      <div class=\"h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600\"></div>\n    </div>\n\n    <!-- Empty State -->\n    <div *ngIf=\"!loading && employees.length === 0\"\n      class=\"py-16 text-center\">\n      <div class=\"mb-3 text-4xl text-slate-300\">\u2659</div>\n      <h3 class=\"font-semibold text-slate-700\">No employees found</h3>\n      <p class=\"mt-1 text-sm text-slate-500\">\n        Try changing your filters or add a new employee.\n      </p>\n    </div>\n\n    <!-- Table -->\n    <div *ngIf=\"!loading && employees.length > 0\" class=\"overflow-x-auto\">\n      <table class=\"w-full min-w-[1250px] text-left text-sm\">\n\n        <thead class=\"bg-slate-50 text-xs uppercase tracking-wide text-slate-500\">\n          <tr>\n            <th class=\"px-5 py-4 font-semibold\">Employee</th>\n            <th class=\"px-5 py-4 font-semibold\">Employee Code</th>\n            <th class=\"px-5 py-4 font-semibold\">Department</th>\n            <th class=\"px-5 py-4 font-semibold\">Designation</th>\n            <th class=\"px-5 py-4 font-semibold\">Phone</th>\n            <th class=\"px-5 py-4 font-semibold\">Assigned Work Location</th>\n            <th class=\"px-5 py-4 font-semibold\">Status</th>\n            <th class=\"px-5 py-4 text-right font-semibold\">Actions</th>\n          </tr>\n        </thead>\n\n        <tbody class=\"divide-y divide-slate-100\">\n          <tr *ngFor=\"let employee of employees\"\n            class=\"transition hover:bg-slate-50\">\n\n            <td class=\"px-5 py-4\">\n              <div class=\"flex items-center gap-3\">\n                <img\n                  *ngIf=\"employee.employeeProfile.avatarUrl\"\n                  [src]=\"employee.employeeProfile.avatarUrl\"\n                  [alt]=\"getFullName(employee)\"\n                  class=\"h-10 w-10 rounded-full object-cover\"\n                />\n\n                <div *ngIf=\"!employee.employeeProfile.avatarUrl\"\n                  class=\"flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700\">\n                  {{ getInitials(employee) }}\n                </div>\n\n                <div>\n                  <p class=\"font-semibold text-slate-800\">\n                    {{ getFullName(employee) }}\n                  </p>\n                  <p class=\"mt-0.5 text-xs text-slate-500\">\n                    {{ employee.email }}\n                  </p>\n                </div>\n              </div>\n            </td>\n\n            <td class=\"px-5 py-4 text-slate-600\">\n              {{ employee.employeeProfile.employeeCode }}\n            </td>\n\n            <td class=\"px-5 py-4 text-slate-600\">\n              {{ getDepartmentName(employee) }}\n            </td>\n\n            <td class=\"px-5 py-4 text-slate-600\">\n              {{ employee.employeeProfile.designation || '\u2014' }}\n            </td>\n\n            <td class=\"px-5 py-4 text-slate-600\">\n              {{ employee.employeeProfile.phone || '\u2014' }}\n            </td>\n\n            <td class=\"px-5 py-4\">\n              <ng-container *ngIf=\"getEffectiveWorkLocation(employee) as assignment; else noWorkLocation\">\n                <div class=\"font-medium text-slate-800\">\n                  {{ assignment.location.name }}\n                </div>\n                <div class=\"mt-1 flex flex-wrap items-center gap-2\">\n                  <span class=\"rounded-full px-2 py-0.5 text-xs font-semibold\"\n                    [ngClass]=\"assignment.assignmentType === 'TEMPORARY'\n                      ? 'bg-amber-100 text-amber-700'\n                      : 'bg-blue-100 text-blue-700'\">\n                    {{ assignment.assignmentType }}\n                  </span>\n                  <span class=\"text-xs text-slate-500\">\n                    {{ assignment.location.type }}\n                  </span>\n                </div>\n                <p *ngIf=\"assignment.assignmentType === 'TEMPORARY'\"\n                  class=\"mt-1 max-w-xs text-xs text-slate-500\">\n                  Until {{ assignment.endAt | date:'medium' }}\n                </p>\n              </ng-container>\n              <ng-template #noWorkLocation>\n                <span class=\"text-slate-400\">Not assigned</span>\n              </ng-template>\n            </td>\n\n            <td class=\"px-5 py-4\">\n              <span\n                class=\"rounded-full px-3 py-1 text-xs font-semibold\"\n                [ngClass]=\"employee.status === 'ACTIVE'\n                  ? 'bg-green-100 text-green-700'\n                  : 'bg-red-100 text-red-700'\">\n                {{ employee.status }}\n              </span>\n            </td>\n\n            <td class=\"px-5 py-4\">\n              <div class=\"flex justify-end\">\n                <div class=\"flex justify-end gap-2\">\n                  <button\n                    type=\"button\"\n                    (click)=\"openEditModal(employee)\"\n                    class=\"rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-50\">\n                    Edit\n                  </button>\n                  <button\n                    type=\"button\"\n                    (click)=\"openLocationModal(employee)\"\n                    class=\"rounded-lg border border-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50\">\n                    Assign Location\n                  </button>\n                </div>\n              </div>\n            </td>\n\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <!-- Pagination -->\n    <div *ngIf=\"!loading && totalPages > 0\"\n      class=\"flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4\">\n\n      <p class=\"text-sm text-slate-500\">\n        Page {{ currentPage }} of {{ totalPages }}\n      </p>\n\n      <div class=\"flex gap-2\">\n        <button\n          (click)=\"changePage(currentPage - 1)\"\n          [disabled]=\"currentPage === 1\"\n          class=\"rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40\">\n          Previous\n        </button>\n\n        <button\n          (click)=\"changePage(currentPage + 1)\"\n          [disabled]=\"currentPage >= totalPages\"\n          class=\"rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40\">\n          Next\n        </button>\n      </div>\n    </div>\n\n  </div>\n</div>\n\n\n<!-- ADD EMPLOYEE MODAL -->\n<div *ngIf=\"showAddModal\"\n  class=\"fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-3 sm:p-6\"\n  (click)=\"closeAddModal()\">\n\n  <div\n    class=\"my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl\"\n    (click)=\"$event.stopPropagation()\">\n\n    <!-- Modal Header -->\n    <div class=\"flex items-start justify-between border-b border-slate-200 px-6 py-5\">\n      <div>\n        <h2 class=\"text-xl font-bold text-slate-800\">\n          {{ isEditMode ? 'Edit Employee' : 'Add New Employee' }}\n        </h2>\n        <p class=\"mt-1 text-sm text-slate-500\">\n          {{ isEditMode ? 'Update employee information.' : 'Create a new employee account and profile.' }}\n        </p>\n      </div>\n\n      <button\n        type=\"button\"\n        (click)=\"closeAddModal()\"\n        class=\"text-2xl text-slate-400 hover:text-slate-700\">\n        \u00D7\n      </button>\n    </div>\n\n    <form [formGroup]=\"employeeForm\" (ngSubmit)=\"saveEmployee()\">\n\n      <div class=\"max-h-[65vh] space-y-6 overflow-y-auto p-6\">\n\n        <!-- Personal Information -->\n        <section>\n          <h3 class=\"mb-4 border-b border-slate-100 pb-2 text-sm font-bold text-blue-700\">\n            Personal Information\n          </h3>\n\n          <div class=\"grid grid-cols-1 gap-4 sm:grid-cols-2\">\n\n            <div>\n              <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n                First Name *\n              </label>\n              <input formControlName=\"firstName\"\n                placeholder=\"Enter first name\"\n                class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100\"/>\n\n              <p *ngIf=\"f.firstName.touched && f.firstName.invalid\"\n                class=\"mt-1 text-xs text-red-600\">\n                First name is required.\n              </p>\n            </div>\n\n            <div>\n              <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n                Last Name *\n              </label>\n              <input formControlName=\"lastName\"\n                placeholder=\"Enter last name\"\n                class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100\"/>\n\n              <p *ngIf=\"f.lastName.touched && f.lastName.invalid\"\n                class=\"mt-1 text-xs text-red-600\">\n                Last name is required.\n              </p>\n            </div>\n\n            <div>\n              <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n                Employee Code *\n              </label>\n              <input formControlName=\"employeeCode\"\n                placeholder=\"e.g. EMP001\"\n                class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-500\"/>\n\n              <p *ngIf=\"f.employeeCode.touched && f.employeeCode.invalid\"\n                class=\"mt-1 text-xs text-red-600\">\n                Employee code is required.\n              </p>\n              <p *ngIf=\"isEditMode\" class=\"mt-1 text-xs text-slate-500\">\n                Employee code cannot be changed here.\n              </p>\n            </div>\n\n            <div>\n              <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n                Phone Number\n              </label>\n              <input formControlName=\"phone\"\n                placeholder=\"Enter phone number\"\n                class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100\"/>\n            </div>\n\n          </div>\n        </section>\n\n        <!-- Account Information -->\n        <section>\n          <h3 class=\"mb-4 border-b border-slate-100 pb-2 text-sm font-bold text-blue-700\">\n            Account Information\n          </h3>\n\n          <div class=\"grid grid-cols-1 gap-4 sm:grid-cols-2\">\n\n            <div>\n              <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n                Email Address *\n              </label>\n              <input type=\"email\" formControlName=\"email\"\n                placeholder=\"employee@company.com\"\n                class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100\"/>\n\n              <p *ngIf=\"f.email.touched && f.email.invalid\"\n                class=\"mt-1 text-xs text-red-600\">\n                Enter a valid email address.\n              </p>\n            </div>\n\n            <div *ngIf=\"!isEditMode\">\n              <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n                Temporary Password *\n              </label>\n              <input type=\"password\" formControlName=\"password\"\n                placeholder=\"Minimum 12 characters\"\n                class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100\"/>\n\n              <p *ngIf=\"f.password.touched && f.password.invalid\"\n                class=\"mt-1 text-xs text-red-600\">\n                Password must contain at least 12 characters.\n              </p>\n            </div>\n\n          </div>\n        </section>\n\n        <!-- Professional Information -->\n        <section>\n          <h3 class=\"mb-4 border-b border-slate-100 pb-2 text-sm font-bold text-blue-700\">\n            Professional Information\n          </h3>\n\n          <div class=\"grid grid-cols-1 gap-4 sm:grid-cols-2\">\n\n            <div>\n              <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n                Designation\n              </label>\n              <input formControlName=\"designation\"\n                placeholder=\"e.g. Software Developer\"\n                class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100\"/>\n            </div>\n\n            <div>\n              <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n                Department\n              </label>\n              <select formControlName=\"departmentId\"\n                class=\"w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500\">\n                <option value=\"\">Select Department</option>\n                <option *ngFor=\"let department of departments\"\n                  [value]=\"department.id\">\n                  {{ department.name }}\n                </option>\n              </select>\n            </div>\n\n            <div>\n              <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n                Joining Date\n              </label>\n              <input type=\"date\" formControlName=\"joiningDate\"\n                class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500\"/>\n            </div>\n\n            <div>\n              <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n                Profile Image URL\n              </label>\n              <input type=\"url\" formControlName=\"avatarUrl\"\n                placeholder=\"https://example.com/image.jpg\"\n                class=\"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500\"/>\n\n              <p *ngIf=\"f.avatarUrl.touched && f.avatarUrl.invalid\"\n                class=\"mt-1 text-xs text-red-600\">\n                Enter a valid HTTP or HTTPS URL.\n              </p>\n            </div>\n\n          </div>\n        </section>\n\n        <div *ngIf=\"errorMessage && showAddModal\"\n          class=\"rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700\">\n          {{ errorMessage }}\n        </div>\n\n      </div>\n\n      <!-- Footer -->\n      <div class=\"flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4\">\n\n        <button type=\"button\"\n          (click)=\"closeAddModal()\"\n          [disabled]=\"saving\"\n          class=\"rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50\">\n          Cancel\n        </button>\n\n        <button type=\"submit\"\n          [disabled]=\"saving\"\n          class=\"rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50\">\n          {{ saving ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save Changes' : 'Create Employee') }}\n        </button>\n\n      </div>\n\n    </form>\n  </div>\n</div>\n\n\n<!-- ASSIGN WORK LOCATION MODAL -->\n<div *ngIf=\"showLocationModal\"\n  class=\"fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-900/50 p-3 sm:p-6\"\n  (click)=\"closeLocationModal()\">\n\n  <div\n    class=\"my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl\"\n    (click)=\"$event.stopPropagation()\">\n\n    <div class=\"flex items-start justify-between border-b border-slate-200 px-6 py-5\">\n      <div>\n        <h2 class=\"text-xl font-bold text-slate-800\">Assign Work Location</h2>\n        <p class=\"mt-1 text-sm text-slate-500\">\n          {{ selectedEmployeeForLocation ? getFullName(selectedEmployeeForLocation) : '' }}\n        </p>\n      </div>\n      <button\n        type=\"button\"\n        (click)=\"closeLocationModal()\"\n        class=\"text-2xl text-slate-400 hover:text-slate-700\">\n        \u00D7\n      </button>\n    </div>\n\n    <div class=\"space-y-5 p-6\">\n      <div>\n        <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">\n          Existing Work Location *\n        </label>\n        <select\n          [(ngModel)]=\"selectedWorkLocationId\"\n          [ngModelOptions]=\"{standalone: true}\"\n          class=\"w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100\">\n          <option value=\"\">Select a created work location</option>\n          <option *ngFor=\"let location of workLocations\" [value]=\"location.id\">\n            {{ location.name }} \u00B7 {{ location.type }}\n          </option>\n        </select>\n        <p *ngIf=\"workLocations.length === 0\" class=\"mt-2 text-xs text-amber-700\">\n          No active work locations found. Create and activate a location in the Work Locations module first.\n        </p>\n      </div>\n\n      <div>\n        <label class=\"mb-2 block text-sm font-medium text-slate-700\">\n          Assignment Type *\n        </label>\n        <div class=\"grid grid-cols-2 gap-3\">\n          <button\n            type=\"button\"\n            (click)=\"locationAssignmentType = 'PERMANENT'\"\n            [ngClass]=\"locationAssignmentType === 'PERMANENT'\n              ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100'\n              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'\"\n            class=\"rounded-lg border px-4 py-3 text-sm font-semibold transition\">\n            Permanent\n          </button>\n          <button\n            type=\"button\"\n            (click)=\"locationAssignmentType = 'TEMPORARY'\"\n            [ngClass]=\"locationAssignmentType === 'TEMPORARY'\n              ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100'\n              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'\"\n            class=\"rounded-lg border px-4 py-3 text-sm font-semibold transition\">\n            Temporary\n          </button>\n        </div>\n      </div>\n\n      <div *ngIf=\"locationAssignmentType === 'TEMPORARY'\" class=\"space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4\">\n        <div class=\"grid grid-cols-1 gap-4 sm:grid-cols-2\">\n          <div>\n            <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">Start Date & Time *</label>\n            <input\n              type=\"datetime-local\"\n              [(ngModel)]=\"temporaryStartAt\"\n              [ngModelOptions]=\"{standalone: true}\"\n              class=\"w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500\"/>\n          </div>\n          <div>\n            <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">End Date & Time *</label>\n            <input\n              type=\"datetime-local\"\n              [(ngModel)]=\"temporaryEndAt\"\n              [ngModelOptions]=\"{standalone: true}\"\n              class=\"w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500\"/>\n          </div>\n        </div>\n        <div>\n          <label class=\"mb-1.5 block text-sm font-medium text-slate-700\">Reason</label>\n          <textarea\n            [(ngModel)]=\"temporaryReason\"\n            [ngModelOptions]=\"{standalone: true}\"\n            rows=\"2\"\n            placeholder=\"Optional reason for temporary assignment\"\n            class=\"w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500\"></textarea>\n        </div>\n      </div>\n\n      <div *ngIf=\"locationErrorMessage\"\n        class=\"rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700\">\n        {{ locationErrorMessage }}\n      </div>\n    </div>\n\n    <div class=\"flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4\">\n      <button\n        type=\"button\"\n        (click)=\"closeLocationModal()\"\n        [disabled]=\"assigningLocation\"\n        class=\"rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50\">\n        Cancel\n      </button>\n      <button\n        type=\"button\"\n        (click)=\"assignWorkLocation()\"\n        [disabled]=\"assigningLocation || workLocations.length === 0\"\n        class=\"rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50\">\n        {{ assigningLocation ? 'Assigning...' : 'Assign Location' }}\n      </button>\n    </div>\n  </div>\n</div>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Employees, { className: "Employees", filePath: "src/app/components/employees/employees.ts", lineNumber: 36 }); })();
