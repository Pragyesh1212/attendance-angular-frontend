import { LanguageSelector } from '../../shared/language-selector';
import { TranslateTextPipe } from '../../shared/translate-text.pipe';

import { Component, inject, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';
import { EmployeeLocationMonitor } from '../../services/employee-location-monitor';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TranslateTextPipe, LanguageSelector],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout implements OnInit, OnDestroy {

  private authService = inject(Auth);
  private readonly locationMonitor = inject(EmployeeLocationMonitor);
  private router = inject(Router);
  private elementRef = inject(ElementRef<HTMLElement>);
  private readonly http = inject(HttpClient);
  employeeAvatarSrc: string | null = null;
  private avatarRequest: Subscription | null = null;

  sidebarCollapsed = false;
  mobileMenuOpen = false;
  isLoggingOut = false;
  profileMenuOpen = false;

  ngOnInit(): void {
    if (this.user?.role === 'EMPLOYEE') {
      this.locationMonitor.start();
      this.loadOwnAvatar();
    }
  }

  private loadOwnAvatar(): void {
    // Private S3 objects cannot be loaded directly by <img>. The API checks the
    // employee's JWT and returns only that employee's photo as an image Blob.
    this.avatarRequest = this.http.get(`${environment.apiUrl}/users/me/avatar`, {
      responseType: 'blob',
    }).subscribe({
      next: (blob) => {
        if (!blob.type.startsWith('image/')) return;
        if (this.employeeAvatarSrc) URL.revokeObjectURL(this.employeeAvatarSrc);
        this.employeeAvatarSrc = URL.createObjectURL(blob);
      },
      // An employee with no uploaded photo keeps their existing initial avatar.
      error: () => {},
    });
  }

  ngOnDestroy(): void {
    this.avatarRequest?.unsubscribe();
    if (this.employeeAvatarSrc) URL.revokeObjectURL(this.employeeAvatarSrc);
    if (this.user?.role === 'EMPLOYEE') this.locationMonitor.stop();
  }

  get locationAlert() {
    return this.locationMonitor.warning();
  }

  dismissLocationAlert(): void {
    this.locationMonitor.dismissWarning();
  }

  get user() {
    return this.authService.getUser();
  }

  get userName(): string {
    return this.user?.employeeProfile?.firstName
      || this.user?.email?.split('@')[0]
      || 'User';
  }

  get employeeDisplayName(): string {
    const profile = this.user?.employeeProfile;
    const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ').trim();
    return fullName || this.userName;
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeMenuWhenClickingOutside(event: MouseEvent): void {
    if (!this.profileMenuOpen) return;
    const target = event.target;
    const profileControl = this.elementRef.nativeElement.querySelector('.employee-profile-control');
    if (target instanceof Node && profileControl && !profileControl.contains(target)) {
      this.profileMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  closeProfileMenu(): void {
    this.profileMenuOpen = false;
  }

  get userInitial(): string {
    return this.userName.charAt(0).toUpperCase();
  }

  get pageTitle(): string {
    return this.router.url.startsWith('/attendance-alerts') ? 'Attendance Alerts' : 'Dashboard';
  }

  get roleName(): string {
    switch (this.user?.role) {
      case 'SUPER_ADMIN':
        return 'Super Admin';
      case 'ADMIN':
        return 'Administrator';
      case 'EMPLOYEE':
        return 'Employee';
      default:
        return 'User';
    }
  }

  hasRole(...roles: string[]): boolean {
    return !!this.user && roles.includes(this.user.role);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  logout(): void {
    if (this.isLoggingOut) return;

    this.isLoggingOut = true;
    this.profileMenuOpen = false;
    // Stop the employee's GPS watcher immediately on logout.
    if (this.user?.role === 'EMPLOYEE') this.locationMonitor.stop();

    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        // Auth service clears the session even if API logout fails.
        this.router.navigate(['/login']);
      }
    });
  }
}
