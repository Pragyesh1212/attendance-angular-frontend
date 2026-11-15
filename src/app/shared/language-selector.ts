import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language';

/** Reusable compact selector; works for logged-in and public pages. */
@Component({
  selector: 'app-language-selector',
  standalone: true,
  template: `
    <label class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 shadow-sm">
      <span aria-hidden="true">🌐</span>
      <span class="sr-only">Select language</span>
      <select [value]="language.language()" (change)="changeLanguage($event)"
              aria-label="Language / भाषा"
              class="max-w-24 cursor-pointer border-0 bg-transparent text-sm font-semibold text-slate-700 outline-none">
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </label>
  `
})
export class LanguageSelector {
  readonly language = inject(LanguageService);
  changeLanguage(event: Event): void {
    this.language.setLanguage((event.target as HTMLSelectElement).value);
  }
}
