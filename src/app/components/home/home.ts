import { LanguageSelector } from '../../shared/language-selector';
import { TranslateTextPipe } from '../../shared/translate-text.pipe';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslateTextPipe, LanguageSelector],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}