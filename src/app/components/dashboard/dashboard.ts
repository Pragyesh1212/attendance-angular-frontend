import { TranslateTextPipe } from '../../shared/translate-text.pipe';
import { FeedbackService } from '../../shared/feedback/feedback.service';

import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize } from 'rxjs';

import { Auth } from '../../services/auth';
import {
  OrganizationService,
  Organization
} from '../../services/organization';

import { environment } from '../../../environments/environment';

interface SummaryCard {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  color: string;
}

interface AttendanceTrend {
  date: string;
  present: number;
  late: number;
  absent: number;
  halfDay: number;
  onLeave: number;
  value: number;
}

interface Department {
  name: string;
  present: number;
  total: number;
  percentage: number;
}

interface RecentAttendance {
  date: string;
  workDate?: string;
  punchIn: string;
  punchOut: string;
  workHours: string;
  status: string;
}

interface SuperAdminStat {
  title: string;
  value: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, TranslateTextPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly uiFeedback = inject(FeedbackService);

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get errorMessage(): string { return ''; }
  set errorMessage(value: string) {
    if (value) this.uiFeedback.error(value);
  }

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get organizationSuccessMessage(): string { return ''; }
  set organizationSuccessMessage(value: string) {
    if (value) this.uiFeedback.success(value);
  }


  private http = inject(HttpClient);
  private auth = inject(Auth);
  private cdr = inject(ChangeDetectorRef);
  private organizationService = inject(OrganizationService);

  private readonly API_URL = `${environment.apiUrl}/dashboard`;

  // ==========================================
  // USER ROLE
  // ==========================================

  userRole = this.auth.getUser()?.role ?? '';

  isSuperAdmin = this.userRole === 'SUPER_ADMIN';
  isEmployee = this.userRole === 'EMPLOYEE';
  isAdmin = this.userRole === 'ADMIN';


  // ==========================================
  // COMMON PROPERTIES
  // ==========================================

  isLoading = true;
  

  summaryCards: SummaryCard[] = [];

  attendanceTrend: AttendanceTrend[] = [];

  // The overview and monthly-trend APIs finish independently.
  // Keep the raw trend until we know the active employee count for this Admin.
  private adminActiveEmployeeCount: number | null = null;
  private adminMonthlyTrendRaw: any[] = [];

  departments: Department[] = [];

  recentAttendance: RecentAttendance[] = [];

  // Employee dashboard display controls (no changes to Admin/Super Admin).
  employeeView: 'daily' | 'monthly' = 'daily';
  employeeSelectedMonth = '';

  setEmployeeView(view: 'daily' | 'monthly'): void {
    this.employeeView = view;
  }

  get employeeFilteredAttendance(): RecentAttendance[] {
    const records = this.recentAttendance.filter(record =>
      !this.employeeSelectedMonth || (record.workDate || '').startsWith(this.employeeSelectedMonth)
    );
    if (this.employeeView === 'monthly') return records;
    // Daily view shows individual records, latest first. Monthly view uses the same
    // available records grouped in the chart; no undocumented API calls are made.
    return records;
  }

  get employeeChartBars(): { status: string; count: number; percent: number }[] {
    const records = this.employeeFilteredAttendance;
    const groups = [
      { status: 'Present', code: 'PRESENT' },
      { status: 'Late', code: 'LATE' },
      { status: 'Absent', code: 'ABSENT' },
      { status: 'Half Day', code: 'HALF_DAY' }
    ];
    const counts = groups.map(group => ({
      status: group.status,
      count: records.filter(record => record.status === group.code).length
    }));
    const maximum = Math.max(1, ...counts.map(item => item.count));
    return counts.map(item => ({ ...item, percent: (item.count / maximum) * 100 }));
  }


  // ==========================================
  // SUPER ADMIN PROPERTIES
  // ==========================================

  organizations: Organization[] = [];

  organizationSearch = '';

  // Create organization modal
  showCreateOrganizationModal = false;
  isSavingOrganization = false;
  newOrganizationName = '';
  createOrganizationError = '';
  

  superAdminStats: SuperAdminStat[] = [
    {
      title: 'Total Organizations',
      value: 0,
      icon: 'building',
      color: 'blue'
    },
    {
      title: 'Total Employees',
      value: 0,
      icon: 'users',
      color: 'purple'
    },
    {
      title: 'Total Admins',
      value: 0,
      icon: 'shield',
      color: 'green'
    }
  ];


  // ==========================================
  // INITIALIZATION
  // ==========================================

  ngOnInit(): void {

    if (this.isSuperAdmin) {

      this.loadSuperAdminDashboard();

    } else if (this.isEmployee) {

      this.loadEmployeeDashboard();

    } else {

      this.loadAdminDashboard();

    }

  }


  // ==========================================
  // SUPER ADMIN DASHBOARD
  // ==========================================

  private loadSuperAdminDashboard(): void {

    let completedRequests = 0;

    const handleComplete = (): void => {

      completedRequests++;

      if (completedRequests === 2) {
        this.isLoading = false;
      }

      this.cdr.markForCheck();

    };


    // 1. ORGANIZATION LIST

    this.organizationService
      .getOrganizations()
      .pipe(
        finalize(() => handleComplete())
      )
      .subscribe({

        next: (response) => {

          this.organizations = Array.isArray(response?.data)
            ? response.data
            : [];

          this.superAdminStats[0].value =
            this.organizations.length;

          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error('Organization API error:', error);

          this.errorMessage =
            'Unable to load organizations.';

          this.cdr.markForCheck();

        }

      });


    // 2. PLATFORM STATISTICS

    this.http
      .get<any>(`${this.API_URL}/overview`)
      .pipe(
        finalize(() => handleComplete())
      )
      .subscribe({

        next: (data) => {

          const overview = data?.data ?? data ?? {};

          this.superAdminStats[1].value =
            overview.totalEmployees ?? 0;

          this.superAdminStats[2].value =
            overview.totalAdmins ?? 0;

          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error('Platform statistics API error:', error);

          this.errorMessage =
            'Unable to load platform statistics.';

          this.cdr.markForCheck();

        }

      });

  }


  // ==========================================
  // ORGANIZATION SEARCH
  // ==========================================

  get filteredOrganizations(): Organization[] {

    const search = this.organizationSearch
      .trim()
      .toLowerCase();

    if (!search) {
      return this.organizations;
    }

    return this.organizations.filter(org =>
      org.name.toLowerCase().includes(search)
    );

  }


  // ==========================================
  // ADD ORGANIZATION
  // ==========================================

  openCreateOrganization(): void {
    this.newOrganizationName = '';
    this.createOrganizationError = '';
    this.showCreateOrganizationModal = true;
  }

  closeCreateOrganization(): void {
    if (this.isSavingOrganization) return;

    this.showCreateOrganizationModal = false;
    this.newOrganizationName = '';
    this.createOrganizationError = '';
  }

  createOrganization(): void {
    const name = this.newOrganizationName.trim();

    if (name.length < 2 || name.length > 150) {
      this.createOrganizationError =
        'Organization name must contain 2–150 characters.';
      return;
    }

    this.isSavingOrganization = true;
    this.createOrganizationError = '';
    this.organizationSuccessMessage = '';

    this.organizationService.createOrganization(name).subscribe({
      next: (response) => {
        const createdOrganization = response?.data;

        if (createdOrganization) {
          // Add the new organization immediately without leaving the dashboard.
          this.organizations = [
            createdOrganization,
            ...this.organizations.filter(
              organization => organization.id !== createdOrganization.id
            )
          ];

          this.superAdminStats[0].value = this.organizations.length;
        }

        this.organizationSuccessMessage =
          response?.message || 'Organization created successfully.';

        this.isSavingOrganization = false;
        this.showCreateOrganizationModal = false;
        this.newOrganizationName = '';
        this.cdr.markForCheck();
      },
      error: (error) => {
        const message = error?.error?.message;
        this.createOrganizationError = Array.isArray(message)
          ? message.join(', ')
          : message || 'Unable to create organization. Please try again.';

        this.isSavingOrganization = false;
        this.cdr.markForCheck();
      }
    });
  }

  // Kept as an alias so any existing template references continue to work.
  goToOrganizations(): void {
    this.openCreateOrganization();
  }


  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================

  // Use the same attendance-rate denominator as the overview card:
  // all active employees in this Admin's organization (not only employees
  // with attendance records). Recalculate when either API finishes, so the
  // result does not depend on which HTTP response arrives first.
  private updateAdminAttendanceTrend(): void {
    const activeEmployees = this.adminActiveEmployeeCount ?? 0;

    this.attendanceTrend = this.adminMonthlyTrendRaw.map((item: any) => {
      const attended =
        Number(item.present ?? 0) +
        Number(item.late ?? 0) +
        Number(item.halfDay ?? 0);

      // Allows a future backend version to return per-date headcounts,
      // without requiring this UI calculation to change again.
      const eligibleEmployees = Number(item.totalEmployees ?? activeEmployees);

      return {
        ...item,
        value: eligibleEmployees > 0
          ? Number((Math.min(attended / eligibleEmployees, 1) * 100).toFixed(2))
          : 0,
      };
    });

    this.cdr.markForCheck();
  }

  private loadAdminDashboard(): void {

    const now = new Date();

    const params = new HttpParams()
      .set('month', now.getMonth() + 1)
      .set('year', now.getFullYear());

    let completedRequests = 0;

    const handleRequestComplete = (): void => {

      completedRequests++;

      if (completedRequests === 3) {
        this.isLoading = false;
      }

      this.cdr.markForCheck();

    };


    // 1. COMPANY OVERVIEW

    this.http
      .get<any>(`${this.API_URL}/overview`)
      .pipe(
        finalize(() => handleRequestComplete())
      )
      .subscribe({

        next: (data) => {

          const attendance = data.attendance;

          this.adminActiveEmployeeCount = Number(data.totalEmployees ?? 0);
          this.updateAdminAttendanceTrend();

          this.summaryCards = [

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
            }

          ];

          this.cdr.markForCheck();

        },

        error: (error) => {

          console.error('Overview API error:', error);

          this.errorMessage =
            'Unable to load company overview.';

          this.cdr.markForCheck();

        }

      });


    // 2. ATTENDANCE TREND

    this.http
      .get<any>(
        `${this.API_URL}/attendance-trend`,
        { params }
      )
      .pipe(
        finalize(() => handleRequestComplete())
      )
      .subscribe({

        next: (data) => {

          const trend = Array.isArray(data?.trend)
            ? data.trend
            : [];

          this.adminMonthlyTrendRaw = trend;
          this.updateAdminAttendanceTrend();

        },

        error: (error) => {

          console.error('Attendance trend API error:', error);

          this.errorMessage =
            'Unable to load attendance trend.';

          this.cdr.markForCheck();

        }

      });


    // 3. DEPARTMENT STATISTICS

    this.http
      .get<any[]>(
        `${this.API_URL}/department-stats`
      )
      .pipe(
        finalize(() => handleRequestComplete())
      )
      .subscribe({

        next: (data) => {

          const departmentData = Array.isArray(data)
            ? data
            : [];

          this.departments = departmentData.map(
            (department) => ({

              name: department.departmentName,

              present: department.present,

              total: department.totalEmployees,

              percentage: department.totalEmployees > 0
                ? Number(
                    (
                      (department.present /
                        department.totalEmployees) * 100
                    ).toFixed(1)
                  )
                : 0

            })
          );

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

  private loadEmployeeDashboard(): void {

    this.http
      .get<any>(`${this.API_URL}/my-stats`)
      .pipe(
        finalize(() => {

          this.isLoading = false;

          this.cdr.markForCheck();

        })
      )
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
            }

          ];

          this.recentAttendance = (
            data.recentAttendance || []
          ).map((record: any) => {

            const latestSession = record.sessions?.[0];

            return {

              date: this.formatDate(record.workDate),
              workDate: typeof record.workDate === 'string'
                ? record.workDate.substring(0, 10)
                : new Date(record.workDate).toISOString().substring(0, 10),

              punchIn: this.formatTime(
                latestSession?.punchInAt
              ),

              punchOut: this.formatTime(
                latestSession?.punchOutAt
              ),

              workHours: `${
                (record.totalWorkMinutes / 60).toFixed(2)
              } hrs`,

              status: record.status,

            };

          });

          if (this.recentAttendance.length && !this.employeeSelectedMonth) {
            this.employeeSelectedMonth = (this.recentAttendance[0].workDate || '').substring(0, 7);
          }
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

  private formatDate(value: string | Date): string {

    if (!value) return '--';

    return new Date(value).toLocaleDateString('en-IN', {

      day: '2-digit',
      month: 'short',
      year: 'numeric',

    });

  }


  // ==========================================
  // TIME FORMATTING
  // ==========================================

  private formatTime(value?: string | Date): string {

    if (!value) return '--';

    return new Date(value).toLocaleTimeString('en-IN', {

      hour: '2-digit',
      minute: '2-digit',
      hour12: true,

    });

  }


  // ==========================================
  // EMPLOYEE NAME
  // ==========================================

  get employeeName(): string {

    const user = this.auth.getUser();

    return user?.employeeProfile?.firstName
      || user?.email?.split('@')[0]
      || 'Employee';

  }

}
