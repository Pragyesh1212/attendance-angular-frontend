import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback-host',
  standalone: true,
  templateUrl: './feedback-host.html',
  styleUrl: './feedback-host.css'
})
export class FeedbackHost {
  readonly feedback = inject(FeedbackService);
  private readonly previousFocus: { element: HTMLElement | null } = { element: null };
  private lastDialogId: number | null = null;

  @ViewChild('primaryAction') primaryAction?: ElementRef<HTMLButtonElement>;

  // Restore focus on dismissal and focus the dialog's primary action when shown.
  ngAfterViewChecked(): void {
    const dialog = this.feedback.dialog();
    if (dialog?.id !== this.lastDialogId) {
      if (dialog && this.lastDialogId === null) {
        this.previousFocus.element = document.activeElement instanceof HTMLElement
          ? document.activeElement : null;
      }
      this.lastDialogId = dialog?.id ?? null;
      if (dialog) this.primaryAction?.nativeElement.focus();
      else this.previousFocus.element?.focus();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    if (!this.feedback.dialog()) return;
    event.preventDefault();
    this.feedback.close(false);
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTab(event: Event): void {
    const keyEvent = event as KeyboardEvent;
    if (!this.feedback.dialog()) return;
    const container = document.querySelector<HTMLElement>('.ae-feedback-dialog');
    const buttons = Array.from(container?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? []);
    if (!buttons.length) return;
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (keyEvent.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!keyEvent.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }
}
