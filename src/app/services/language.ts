import { HINDI_TRANSLATIONS } from '../shared/translation-dictionary';
import { Injectable, computed, signal } from '@angular/core';

export type SupportedLanguage = 'en' | 'hi';

/** UI-only language preference, separated for every authenticated account. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  // Do not reuse the former shared `attendease.language` key: doing so
  // would apply one employee/admin's choice to another account.
  private readonly publicStorageKey = 'attendease.language.public';
  private readonly userStoragePrefix = 'attendease.language.user.';

  readonly language = signal<SupportedLanguage>(
    this.savedLanguage(this.currentUserId())
  );
  readonly locale = computed(() => this.language() === 'hi' ? 'hi-IN' : 'en-IN');

  constructor() {
    this.updateDocumentLanguage(this.language());
    // Keep two tabs of the SAME account in sync, without affecting other users.
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.onStorage);
    }
  }

  translate(text: string | null | undefined): string {
    if (text === null || text === undefined) return '';
    return this.language() === 'hi' ? (HINDI_TRANSLATIONS[text.trim()] ?? text) : text;
  }

  setLanguage(value: string): void {
    if (value !== 'hi' && value !== 'en') return;
    this.language.set(value);
    this.updateDocumentLanguage(value);
    try {
      localStorage.setItem(this.storageKey(this.currentUserId()), value);
    } catch { /* storage may be disabled */ }
  }

  /** Call after login/logout to load ONLY that account's saved preference. */
  syncForUser(userId: string | null): void {
    const preferred = this.savedLanguage(userId);
    this.language.set(preferred);
    this.updateDocumentLanguage(preferred);
  }

  private savedLanguage(userId: string | null): SupportedLanguage {
    try {
      return localStorage.getItem(this.storageKey(userId)) === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  }

  private storageKey(userId: string | null): string {
    return userId ? `${this.userStoragePrefix}${userId}` : this.publicStorageKey;
  }

  private currentUserId(): string | null {
    try {
      const savedUser = sessionStorage.getItem('user');
      if (!savedUser) return null;
      const user: unknown = JSON.parse(savedUser);
      if (user && typeof user === 'object' && 'id' in user &&
          typeof user.id === 'string' && user.id.trim()) {
        return user.id;
      }
    } catch { /* malformed or inaccessible session storage */ }
    return null;
  }

  private readonly onStorage = (event: StorageEvent): void => {
    // Browser storage events notify OTHER tabs, not the tab that made the change.
    const userId = this.currentUserId();
    if (event.key === this.storageKey(userId)) this.syncForUser(userId);
  };

  private updateDocumentLanguage(value: SupportedLanguage): void {
    if (typeof document !== 'undefined') document.documentElement.lang = value;
  }
}
