
import {
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';

import { inject } from '@angular/core';

import {
  catchError,
  switchMap,
  throwError,
  Observable,
  shareReplay,
  finalize
} from 'rxjs';

import { Auth } from '../services/auth';

// Shared refresh request for simultaneous API failures.
let refreshInFlight$: Observable<any> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Auth);

  // Skip authentication and refresh endpoints.
  if (
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/refresh')
  ) {
    return next(req);
  }

  const accessToken = authService.getAccessToken();

  const authReq = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    : req;

  return next(authReq).pipe(

    catchError((error: HttpErrorResponse) => {

      const refreshToken = authService.getRefreshToken();

      if (error.status !== 401 || !refreshToken) {
        return throwError(() => error);
      }

      // Another request may already have refreshed the token.
      const latestToken = authService.getAccessToken();

      if (latestToken && latestToken !== accessToken) {
        return next(req.clone({
          setHeaders: {
            Authorization: `Bearer ${latestToken}`
          }
        }));
      }

      // Start only one refresh request.
      if (!refreshInFlight$) {

        refreshInFlight$ = authService.refreshToken().pipe(

          shareReplay(1),

          finalize(() => {
            refreshInFlight$ = null;
          })
        );
      }

      // All failed requests wait for the same refresh operation.
      return refreshInFlight$.pipe(

        switchMap(response => {

          const retryRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });

          return next(retryRequest);
        }),

        catchError(refreshError => {
          authService.clearSession();
          return throwError(() => refreshError);
        })
      );
    })
  );
};
