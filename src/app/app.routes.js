import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { WorkLocationsComponent } from './components/work-locations/work-locations';
import { Employees } from './components/employees/employees';
export const routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home').then(m => m.Home)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login)
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./components/dashboard-layout/dashboard-layout')
            .then(m => m.DashboardLayout),
        children: [
            {
                path: 'dashboard',
                canActivate: [roleGuard],
                data: {
                    roles: ['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']
                },
                loadComponent: () => import('./components/dashboard/dashboard')
                    .then(m => m.Dashboard)
            },
            {
                path: 'approvals',
                canActivate: [roleGuard],
                data: { roles: ['ADMIN', 'SUPER_ADMIN'] },
                loadComponent: () => import('./components/approvals/approvals').then(m => m.Approvals)
            },
            {
                path: 'notifications',
                loadComponent: () => import('./components/notifications/notifications').then(m => m.Notifications)
            },
            {
                path: 'attendance',
                canActivate: [roleGuard],
                data: {
                    roles: ['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']
                },
                loadComponent: () => import('./components/attendance/attendance')
                    .then(m => m.AttendanceComponent)
            },
            {
                path: 'admins',
                canActivate: [roleGuard],
                data: {
                    roles: ['SUPER_ADMIN']
                },
                loadComponent: () => import('./components/admins/admins')
                    .then(m => m.Admins)
            },
            {
                path: 'departments',
                canActivate: [roleGuard],
                data: { roles: ['SUPER_ADMIN', 'ADMIN'] },
                loadComponent: () => import('./components/departments/departments')
                    .then(m => m.Departments)
            },
            {
                path: 'shifts',
                canActivate: [roleGuard],
                data: { roles: ['SUPER_ADMIN', 'ADMIN'] },
                loadComponent: () => import('./components/shifts/shifts')
                    .then(m => m.Shifts)
            },
            {
                path: 'work-locations',
                component: WorkLocationsComponent,
                canActivate: [roleGuard],
                data: { roles: ['SUPER_ADMIN', 'ADMIN'] }
            },
            {
                path: 'employees',
                component: Employees
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
