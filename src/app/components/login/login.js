import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function Login_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "span", 42);
    i0.ɵɵtext(2, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function Login_Conditional_23_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Email address is required. ");
} }
function Login_Conditional_23_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Please enter a valid email address. ");
} }
function Login_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵconditionalCreate(1, Login_Conditional_23_Conditional_1_Template, 1, 0)(2, Login_Conditional_23_Conditional_2_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.loginForm.controls.email.errors?.["required"] ? 1 : 2);
} }
function Login_Conditional_32_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Password is required. ");
} }
function Login_Conditional_32_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Password must contain at least 8 characters. ");
} }
function Login_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵconditionalCreate(1, Login_Conditional_32_Conditional_1_Template, 1, 0)(2, Login_Conditional_32_Conditional_2_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.loginForm.controls.password.errors?.["required"] ? 1 : 2);
} }
function Login_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 43);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Signing in...");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Sign In \u2192");
    i0.ɵɵelementEnd();
} }
export class Login {
    fb = inject(FormBuilder);
    authService = inject(Auth);
    router = inject(Router);
    showPassword = false;
    submitted = false;
    isLoading = false;
    errorMessage = '';
    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        rememberMe: [true]
    });
    onSubmit() {
        this.submitted = true;
        this.errorMessage = '';
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        this.isLoading = true;
        const credentials = {
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value
        };
        this.authService.login(credentials).subscribe({
            next: (response) => {
                this.isLoading = false;
                const role = response.user.role;
                if (role === 'SUPER_ADMIN' ||
                    role === 'ADMIN' ||
                    role === 'EMPLOYEE') {
                    this.router.navigate(['/dashboard']);
                }
                else {
                    this.authService.clearSession();
                    this.errorMessage = 'Your account has an unsupported role.';
                }
            },
            error: (error) => {
                this.isLoading = false;
                if (error.status === 401) {
                    this.errorMessage =
                        error.error?.message || 'Invalid email or password.';
                }
                else if (error.status === 0) {
                    this.errorMessage =
                        'Unable to connect to the server. Please try again.';
                }
                else {
                    this.errorMessage =
                        error.error?.message || 'Something went wrong. Please try again.';
                }
            }
        });
    }
    static ɵfac = function Login_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Login)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Login, selectors: [["app-login"]], decls: 77, vars: 8, consts: [[1, "min-h-screen", "grid", "lg:grid-cols-2", "bg-white"], [1, "flex", "items-center", "justify-center", "px-6", "py-12", "sm:px-12"], [1, "w-full", "max-w-md"], ["routerLink", "/", 1, "inline-flex", "items-center", "gap-3", "mb-12"], [1, "flex", "h-11", "w-11", "items-center", "justify-center", "rounded-xl", "bg-blue-600", "text-white", "text-2xl", "font-bold", "shadow-lg", "shadow-blue-600/20"], [1, "text-2xl", "font-extrabold", "tracking-tight", "text-slate-900"], [1, "text-blue-600"], [1, "mb-8"], [1, "text-sm", "font-semibold", "text-blue-600", "mb-3"], [1, "text-3xl", "sm:text-4xl", "font-extrabold", "text-slate-900"], [1, "mt-3", "text-slate-500"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], ["role", "alert", 1, "flex", "items-start", "gap-3", "rounded-xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3.5", "text-sm", "text-red-700"], [1, "block", "text-sm", "font-semibold", "text-slate-700", "mb-2"], ["type", "email", "formControlName", "email", "placeholder", "name@company.com", "autocomplete", "username", 1, "w-full", "rounded-xl", "border", "border-slate-200", "bg-slate-50", "px-4", "py-3.5", "text-slate-900", "outline-none", "transition", "focus:border-blue-500", "focus:bg-white", "focus:ring-4", "focus:ring-blue-100"], [1, "mt-2", "text-sm", "text-red-600"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-sm", "font-semibold", "text-slate-700"], [1, "relative"], ["formControlName", "password", "placeholder", "Enter your password", "autocomplete", "current-password", 1, "w-full", "rounded-xl", "border", "border-slate-200", "bg-slate-50", "px-4", "py-3.5", "pr-16", "text-slate-900", "outline-none", "transition", "focus:border-blue-500", "focus:bg-white", "focus:ring-4", "focus:ring-blue-100", 3, "type"], ["type", "button", 1, "absolute", "right-4", "top-1/2", "-translate-y-1/2", "text-sm", "font-semibold", "text-blue-600", "hover:text-blue-800", 3, "click"], [1, "flex", "items-center", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-2", "text-sm", "text-slate-600"], ["type", "checkbox", "formControlName", "rememberMe", 1, "h-4", "w-4", "rounded", "border-slate-300", "accent-blue-600"], ["href", "mailto:support@attendease.com?subject=Password%20Reset", 1, "text-sm", "font-semibold", "text-blue-600", "hover:text-blue-800"], ["type", "submit", 1, "flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-xl", "bg-blue-600", "py-3.5", "font-semibold", "text-white", "shadow-lg", "shadow-blue-600/20", "transition", "hover:bg-blue-700", "hover:shadow-blue-600/30", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], [1, "mt-8", "text-center"], ["routerLink", "/", 1, "text-sm", "font-medium", "text-slate-500", "transition", "hover:text-blue-600"], [1, "mt-12", "text-center", "text-xs", "text-slate-400"], [1, "relative", "hidden", "lg:flex", "items-center", "justify-center", "overflow-hidden", "bg-gradient-to-br", "from-blue-700", "via-blue-600", "to-indigo-800", "p-12"], [1, "absolute", "-right-32", "-top-32", "h-96", "w-96", "rounded-full", "border", "border-white/10"], [1, "absolute", "-bottom-40", "-left-32", "h-96", "w-96", "rounded-full", "border", "border-white/10"], [1, "relative", "max-w-lg", "text-white"], [1, "mb-8", "inline-flex", "rounded-2xl", "border", "border-white/20", "bg-white/10", "p-4", "text-4xl"], [1, "text-4xl", "font-extrabold", "leading-tight"], [1, "text-blue-200"], [1, "mt-6", "text-lg", "leading-8", "text-blue-100"], [1, "mt-12", "space-y-5"], [1, "flex", "items-center", "gap-4"], [1, "flex", "h-10", "w-10", "items-center", "justify-center", "rounded-xl", "bg-white/15"], [1, "text-blue-50"], [1, "mt-16", "border-t", "border-white/20", "pt-6", "text-sm", "text-blue-200"], [1, "font-bold"], [1, "h-5", "w-5", "animate-spin", "rounded-full", "border-2", "border-white/30", "border-t-white"]], template: function Login_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3)(4, "div", 4);
            i0.ɵɵtext(5, " \u2713 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 5);
            i0.ɵɵtext(7, " Attend");
            i0.ɵɵelementStart(8, "span", 6);
            i0.ɵɵtext(9, "Ease");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(10, "div", 7)(11, "p", 8);
            i0.ɵɵtext(12, " WELCOME BACK ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "h1", 9);
            i0.ɵɵtext(14, " Sign in to your account ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p", 10);
            i0.ɵɵtext(16, " Enter your credentials to access your attendance dashboard. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "form", 11);
            i0.ɵɵlistener("ngSubmit", function Login_Template_form_ngSubmit_17_listener() { return ctx.onSubmit(); });
            i0.ɵɵconditionalCreate(18, Login_Conditional_18_Template, 5, 1, "div", 12);
            i0.ɵɵelementStart(19, "div")(20, "label", 13);
            i0.ɵɵtext(21, " Email address ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "input", 14);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(23, Login_Conditional_23_Template, 3, 1, "p", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div")(25, "div", 16)(26, "label", 17);
            i0.ɵɵtext(27, " Password ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 18)(29, "input", 19);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "button", 20);
            i0.ɵɵlistener("click", function Login_Template_button_click_30_listener() { return ctx.showPassword = !ctx.showPassword; });
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(32, Login_Conditional_32_Template, 3, 1, "p", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 21)(34, "label", 22)(35, "input", 23);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵtext(36, " Remember me ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "a", 24);
            i0.ɵɵtext(38, " Forgot password? ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "button", 25);
            i0.ɵɵconditionalCreate(40, Login_Conditional_40_Template, 3, 0)(41, Login_Conditional_41_Template, 2, 0, "span");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "div", 26)(43, "a", 27);
            i0.ɵɵtext(44, " \u2190 Back to Home ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "p", 28);
            i0.ɵɵtext(46, " \u00A9 2026 AttendEase. All rights reserved. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(47, "div", 29);
            i0.ɵɵelement(48, "div", 30)(49, "div", 31);
            i0.ɵɵelementStart(50, "div", 32)(51, "div", 33);
            i0.ɵɵtext(52, " \u2713 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "h2", 34);
            i0.ɵɵtext(54, " Smarter attendance. ");
            i0.ɵɵelementStart(55, "span", 35);
            i0.ɵɵtext(56, "Better workforce management.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(57, "p", 36);
            i0.ɵɵtext(58, " Manage employees, track attendance, monitor working hours and gain valuable insights \u2014 all from one centralized platform. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "div", 37)(60, "div", 38)(61, "div", 39);
            i0.ɵɵtext(62, " \u2713 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "span", 40);
            i0.ɵɵtext(64, "Centralized employee management");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "div", 38)(66, "div", 39);
            i0.ɵɵtext(67, " \u2713 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "span", 40);
            i0.ɵɵtext(69, "Accurate attendance tracking");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "div", 38)(71, "div", 39);
            i0.ɵɵtext(72, " \u2713 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "span", 40);
            i0.ɵɵtext(74, "Insights and attendance reports");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(75, "div", 41);
            i0.ɵɵtext(76, " Simplifying workforce management, one day at a time. ");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(17);
            i0.ɵɵproperty("formGroup", ctx.loginForm);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 18 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loginForm.controls.email.touched && ctx.loginForm.controls.email.invalid ? 23 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password");
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.showPassword ? "Hide" : "Show", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loginForm.controls.password.touched && ctx.loginForm.controls.password.invalid ? 32 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 40 : 41);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n  min-height: 100vh;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Login, [{
        type: Component,
        args: [{ selector: 'app-login', standalone: true, imports: [ReactiveFormsModule, RouterLink], template: "\n<div class=\"min-h-screen grid lg:grid-cols-2 bg-white\">\n\n  <!-- Left: Login Form -->\n  <div class=\"flex items-center justify-center px-6 py-12 sm:px-12\">\n\n    <div class=\"w-full max-w-md\">\n\n      <!-- Logo -->\n      <a routerLink=\"/\" class=\"inline-flex items-center gap-3 mb-12\">\n        <div class=\"flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white text-2xl font-bold shadow-lg shadow-blue-600/20\">\n          \u2713\n        </div>\n\n        <span class=\"text-2xl font-extrabold tracking-tight text-slate-900\">\n          Attend<span class=\"text-blue-600\">Ease</span>\n        </span>\n      </a>\n\n      <!-- Heading -->\n      <div class=\"mb-8\">\n        <p class=\"text-sm font-semibold text-blue-600 mb-3\">\n          WELCOME BACK\n        </p>\n\n        <h1 class=\"text-3xl sm:text-4xl font-extrabold text-slate-900\">\n          Sign in to your account\n        </h1>\n\n        <p class=\"mt-3 text-slate-500\">\n          Enter your credentials to access your attendance dashboard.\n        </p>\n      </div>\n\n      <!-- Login Form -->\n      <form\n        [formGroup]=\"loginForm\"\n        (ngSubmit)=\"onSubmit()\"\n        class=\"space-y-5\"\n      >\n\n        <!-- Backend Error Message -->\n        @if (errorMessage) {\n          <div\n            class=\"flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700\"\n            role=\"alert\"\n          >\n            <span class=\"font-bold\">!</span>\n            <p>{{ errorMessage }}</p>\n          </div>\n        }\n\n        <!-- Email -->\n        <div>\n          <label class=\"block text-sm font-semibold text-slate-700 mb-2\">\n            Email address\n          </label>\n\n          <input\n            type=\"email\"\n            formControlName=\"email\"\n            placeholder=\"name@company.com\"\n            autocomplete=\"username\"\n            class=\"w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100\"\n          />\n\n          @if (loginForm.controls.email.touched && loginForm.controls.email.invalid) {\n            <p class=\"mt-2 text-sm text-red-600\">\n              @if (loginForm.controls.email.errors?.['required']) {\n                Email address is required.\n              } @else {\n                Please enter a valid email address.\n              }\n            </p>\n          }\n        </div>\n\n        <!-- Password -->\n        <div>\n          <div class=\"flex items-center justify-between mb-2\">\n            <label class=\"text-sm font-semibold text-slate-700\">\n              Password\n            </label>\n          </div>\n\n          <div class=\"relative\">\n            <input\n              [type]=\"showPassword ? 'text' : 'password'\"\n              formControlName=\"password\"\n              placeholder=\"Enter your password\"\n              autocomplete=\"current-password\"\n              class=\"w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-16 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100\"\n            />\n\n            <button\n              type=\"button\"\n              (click)=\"showPassword = !showPassword\"\n              class=\"absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-800\"\n            >\n              {{ showPassword ? 'Hide' : 'Show' }}\n            </button>\n          </div>\n\n          @if (loginForm.controls.password.touched && loginForm.controls.password.invalid) {\n            <p class=\"mt-2 text-sm text-red-600\">\n              @if (loginForm.controls.password.errors?.['required']) {\n                Password is required.\n              } @else {\n                Password must contain at least 8 characters.\n              }\n            </p>\n          }\n        </div>\n\n        <!-- Remember Me / Forgot Password -->\n        <div class=\"flex items-center justify-between gap-3\">\n\n          <label class=\"flex items-center gap-2 text-sm text-slate-600\">\n            <input\n              type=\"checkbox\"\n              formControlName=\"rememberMe\"\n              class=\"h-4 w-4 rounded border-slate-300 accent-blue-600\"\n            />\n            Remember me\n          </label>\n\n          <a\n            href=\"mailto:support@attendease.com?subject=Password%20Reset\"\n            class=\"text-sm font-semibold text-blue-600 hover:text-blue-800\"\n          >\n            Forgot password?\n          </a>\n\n        </div>\n\n        <!-- Login Button -->\n        <button\n          type=\"submit\"\n          [disabled]=\"isLoading\"\n          class=\"flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60\"\n        >\n\n          @if (isLoading) {\n            <span class=\"h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white\"></span>\n            <span>Signing in...</span>\n          } @else {\n            <span>Sign In \u2192</span>\n          }\n\n        </button>\n\n      </form>\n\n      <!-- Back to Home -->\n      <div class=\"mt-8 text-center\">\n        <a\n          routerLink=\"/\"\n          class=\"text-sm font-medium text-slate-500 transition hover:text-blue-600\"\n        >\n          \u2190 Back to Home\n        </a>\n      </div>\n\n      <p class=\"mt-12 text-center text-xs text-slate-400\">\n        \u00A9 2026 AttendEase. All rights reserved.\n      </p>\n\n    </div>\n  </div>\n\n  <!-- Right: Branding Panel -->\n  <div class=\"relative hidden lg:flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-12\">\n\n    <div class=\"absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10\"></div>\n    <div class=\"absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-white/10\"></div>\n\n    <div class=\"relative max-w-lg text-white\">\n\n      <div class=\"mb-8 inline-flex rounded-2xl border border-white/20 bg-white/10 p-4 text-4xl\">\n        \u2713\n      </div>\n\n      <h2 class=\"text-4xl font-extrabold leading-tight\">\n        Smarter attendance.\n        <span class=\"text-blue-200\">Better workforce management.</span>\n      </h2>\n\n      <p class=\"mt-6 text-lg leading-8 text-blue-100\">\n        Manage employees, track attendance, monitor working hours\n        and gain valuable insights \u2014 all from one centralized platform.\n      </p>\n\n      <div class=\"mt-12 space-y-5\">\n\n        <div class=\"flex items-center gap-4\">\n          <div class=\"flex h-10 w-10 items-center justify-center rounded-xl bg-white/15\">\n            \u2713\n          </div>\n          <span class=\"text-blue-50\">Centralized employee management</span>\n        </div>\n\n        <div class=\"flex items-center gap-4\">\n          <div class=\"flex h-10 w-10 items-center justify-center rounded-xl bg-white/15\">\n            \u2713\n          </div>\n          <span class=\"text-blue-50\">Accurate attendance tracking</span>\n        </div>\n\n        <div class=\"flex items-center gap-4\">\n          <div class=\"flex h-10 w-10 items-center justify-center rounded-xl bg-white/15\">\n            \u2713\n          </div>\n          <span class=\"text-blue-50\">Insights and attendance reports</span>\n        </div>\n\n      </div>\n\n      <div class=\"mt-16 border-t border-white/20 pt-6 text-sm text-blue-200\">\n        Simplifying workforce management, one day at a time.\n      </div>\n\n    </div>\n  </div>\n\n</div>\n", styles: [":host {\r\n  display: block;\r\n  min-height: 100vh;\r\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Login, { className: "Login", filePath: "src/app/components/login/login.ts", lineNumber: 20 }); })();
