import { FeedbackService } from '../../shared/feedback/feedback.service';

import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly uiFeedback = inject(FeedbackService);

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get errorMessage(): string { return ''; }
  set errorMessage(value: string) {
    if (value) this.uiFeedback.error(value);
  }


  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  showPassword = false;
  submitted = false;
  isLoading = false;
  

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [true]
  });

  onSubmit(): void {

    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials = {
      email: this.loginForm.controls.email.value!,
      password: this.loginForm.controls.password.value!
    };

    this.authService.login(credentials).subscribe({

      next: (response) => {

        this.isLoading = false;

        const role = response.user.role;

        if (role === 'EMPLOYEE') {
          // Employees begin at Attendance for quick punch in/out.
          this.router.navigate(['/attendance']);
        } else if (role === 'SUPER_ADMIN' || role === 'ADMIN') {
          // Preserve the existing dashboards for both admin roles.
          this.router.navigate(['/dashboard']);
        } else {
          this.authService.clearSession();
          this.errorMessage = 'Your account has an unsupported role.';
        }
      },

      error: (error) => {

        this.isLoading = false;

        if (error.status === 401) {
          this.errorMessage =
            error.error?.message || 'Invalid email or password.';
        } else if (error.status === 0) {
          this.errorMessage =
            'Unable to connect to the server. Please try again.';
        } else {
          this.errorMessage =
            error.error?.message || 'Something went wrong. Please try again.';
        }
      }

    });
  }
}
