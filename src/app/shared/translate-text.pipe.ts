import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language';

/** Fallback to the original English string for missing translations. */
@Pipe({ name: 't', standalone: true, pure: false })
export class TranslateTextPipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return '';
    const text = String(value);
    return this.language.translate(text);
  }
}
