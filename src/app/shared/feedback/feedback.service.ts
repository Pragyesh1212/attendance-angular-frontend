import { Injectable, signal } from '@angular/core';

export type FeedbackKind = 'error' | 'warning' | 'info' | 'confirm';
export type FeedbackTone = 'danger' | 'warning' | 'primary';

export interface FeedbackDialog {
  id: number;
  kind: FeedbackKind;
  title: string;
  message: string;
  confirmLabel: string;
  tone: FeedbackTone;
  resolve?: (confirmed: boolean) => void;
}

export interface FeedbackToast {
  id: number;
  title: string;
  message: string;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  tone?: FeedbackTone;
}

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private sequence = 0;
  private readonly queue: FeedbackDialog[] = [];
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  private readonly dialogState = signal<FeedbackDialog | null>(null);
  private readonly toastState = signal<FeedbackToast | null>(null);

  readonly dialog = this.dialogState.asReadonly();
  readonly toast = this.toastState.asReadonly();

  error(message: unknown, title = 'Something went wrong'): void {
    this.enqueue('error', title, this.asText(message), 'Got it', 'danger');
  }

  warning(message: unknown, title = 'Please review'): void {
    this.enqueue('warning', title, this.asText(message), 'Understood', 'warning');
  }

  info(message: unknown, title = 'Information'): void {
    this.enqueue('info', title, this.asText(message), 'Got it', 'primary');
  }

  success(message: unknown, title = 'Success'): void {
    const text = this.asText(message);
    if (!text) return;
    const id = ++this.sequence;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastState.set({ id, title, message: text });
    this.toastTimer = setTimeout(() => {
      if (this.toastState()?.id === id) this.toastState.set(null);
    }, 4800);
  }

  dismissToast(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastState.set(null);
  }

  confirm(options: ConfirmOptions): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const message = this.asText(options.message);
      const dialog: FeedbackDialog = {
        id: ++this.sequence,
        kind: 'confirm',
        title: options.title || 'Please confirm',
        message,
        confirmLabel: options.confirmLabel || 'Confirm',
        tone: options.tone || 'primary',
        resolve
      };
      this.push(dialog);
    });
  }

  close(confirmed = false): void {
    const current = this.dialogState();
    if (!current) return;
    this.dialogState.set(null);
    current.resolve?.(confirmed);
    const next = this.queue.shift();
    if (next) this.dialogState.set(next);
  }

  private enqueue(kind: FeedbackKind, title: string, message: string, label: string, tone: FeedbackTone): void {
    if (!message) return;
    // Avoid repeat alerts while several API requests report the same failure.
    if (this.dialogState()?.kind === kind && this.dialogState()?.message === message) return;
    if (this.queue.some(item => item.kind === kind && item.message === message)) return;
    this.push({ id: ++this.sequence, kind, title, message, confirmLabel: label, tone });
  }

  private push(dialog: FeedbackDialog): void {
    if (this.dialogState()) this.queue.push(dialog);
    else this.dialogState.set(dialog);
  }

  private asText(value: unknown): string {
    if (Array.isArray(value)) return value.map(x => String(x)).join(', ');
    if (typeof value === 'string') return value.trim();
    if (value == null) return '';
    return String(value);
  }
}
