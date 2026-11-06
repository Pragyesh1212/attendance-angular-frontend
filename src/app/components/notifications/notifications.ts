import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';

@Component({ selector: 'app-notifications', standalone: true, imports: [CommonModule, DatePipe, FormsModule], templateUrl: './notifications.html' })
export class Notifications implements OnInit {
  private readonly api = inject(NotificationService);
  notifications: any[] = []; unreadCount = 0; loading = true; error = ''; unreadOnly = false; busy = false;
  ngOnInit(): void { this.load(); }
  load(): void {
    this.loading = true; this.error = '';
    this.api.getNotifications(1, 50, this.unreadOnly).subscribe({ next: response => { this.notifications = response?.notifications ?? []; this.loading = false; }, error: e => { this.error = e?.error?.message || 'Unable to load notifications.'; this.loading = false; } });
    this.api.getUnreadCount().subscribe({ next: r => this.unreadCount = r.unreadCount ?? 0 });
  }
  markRead(item: any): void { if (item.isRead) return; this.api.markAsRead(item.id).subscribe({ next: () => { item.isRead = true; this.unreadCount = Math.max(0, this.unreadCount - 1); } }); }
  markAll(): void { this.busy = true; this.api.markAllAsRead().subscribe({ next: () => { this.notifications.forEach(n => n.isRead = true); this.unreadCount = 0; this.busy = false; }, error: e => { this.error = e?.error?.message || 'Unable to mark notifications as read.'; this.busy = false; } }); }
  icon(type: string): string { return type === 'ATTENDANCE_APPROVAL' ? '✓' : type === 'ATTENDANCE_CORRECTION' ? '◷' : 'i'; }
}
