
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize } from 'rxjs';
import { Auth } from '../../services/auth';

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
  punchIn: string;
  punchOut: string;
  workHours: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private http = inject(HttpClient);
  private auth = inject(Auth);
  private cdr = inject(ChangeDetectorRef);

  private readonly API_URL = 'http://localhost:3000/dashboard';

  userRole = this.auth.getUser()?.role ?? '';
  isEmployee = this.userRole === 'EMPLOYEE';

  isLoading = true;
  errorMessage = '';

  summaryCards: SummaryCard[] = [];
  attendanceTrend: AttendanceTrend[] = [];
  departments: Department[] = [];
  recentAttendance: RecentAttendance[] = [];

  ngOnInit(): void {
    if (this.isEmployee) {
      this.loadEmployeeDashboard();
    } else {
      this.loadAdminDashboard();
    }
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

      // Notify Angular that component data has changed.
      this.cdr.markForCheck();
    };

    // ==========================================
    // 1. COMPANY OVERVIEW
    // ==========================================

    this.http
      .get<any>(`${this.API_URL}/overview`)
      .pipe(
        finalize(() => handleRequestComplete())
      )
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

          this.attendanceTrend = trend.map((item: any) => {

            const total =
              item.present +
              item.late +
              item.absent +
              item.halfDay +
              item.onLeave;

            const attended =
              item.present +
              item.late +
              item.halfDay;

            return {
              ...item,
              value: total > 0
                ? Number(
                    ((attended / total) * 100).toFixed(1)
                  )
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
            },
          ];

          this.recentAttendance = (
            data.recentAttendance || []
          ).map((record: any) => {

            const latestSession = record.sessions?.[0];

            return {
              date: this.formatDate(record.workDate),

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
