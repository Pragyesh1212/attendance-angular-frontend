import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedbackHost } from './shared/feedback/feedback-host';

@Component({
  imports: [RouterOutlet, FeedbackHost],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('attendance-angular-frontend');
}
