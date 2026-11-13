
import { Component, inject, ElementRef, HostListener } from '@angular/core';
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
  private elementRef = inject(ElementRef<HTMLElement>);

  sidebarCollapsed = false;
  mobileMenuOpen = false;
  isLoggingOut = false;
  profileMenuOpen = false;

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
