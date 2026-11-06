
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

  private authService = inject(Auth);
  private router = inject(Router);

  sidebarCollapsed = false;
  mobileMenuOpen = false;
  isLoggingOut = false;

  get user() {
    return this.authService.getUser();
  }

  get userName(): string {
    return this.user?.employeeProfile?.firstName
      || this.user?.email?.split('@')[0]
      || 'User';
  }

  get userInitial(): string {
    return this.userName.charAt(0).toUpperCase();
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
