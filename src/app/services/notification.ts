import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/notifications`;
  getNotifications(page = 1, limit = 30, unreadOnly = false): Observable<any> {
    return this.http.get<any>(this.base, { params: { page, limit, unreadOnly } });
  }
  getUnreadCount(): Observable<{ unreadCount: number }> { return this.http.get<{ unreadCount: number }>(`${this.base}/unread-count`); }
  markAsRead(id: string): Observable<any> { return this.http.patch(`${this.base}/${id}/read`, {}); }
  markAllAsRead(): Observable<any> { return this.http.patch(`${this.base}/read-all`, {}); }
}
