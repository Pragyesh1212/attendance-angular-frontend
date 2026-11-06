import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
export const roleGuard = (route) => {
    const authService = inject(Auth);
    const router = inject(Router);
    const user = authService.getUser();
    console.log('ROLE GUARD:', {
        userRole: user?.role,
        allowedRoles: route.data['roles']
    });
    // Check whether the user is authenticated.
    if (!authService.isAuthenticated() || !user) {
        return router.createUrlTree(['/login']);
    }
    // Get the roles allowed for this route.
    const allowedRoles = route.data['roles'];
    // Allow access only when the user's role matches.
    if (allowedRoles && allowedRoles.includes(user.role)) {
        return true;
    }
    // Redirect users who don't have permission.
    return router.createUrlTree(['/dashboard']);
};
