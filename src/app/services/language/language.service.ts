import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Location} from '@angular/common';


export type Language = 'de' | 'en' | 'tr';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: Language = 'en';
  allowedLanguages: Language[] = ['de', 'en', 'tr'];


  constructor(
    public translateService: TranslateService,
    private location: Location
  ) {
  }

  isLanguage(language: string): language is Language {
    return this.allowedLanguages.includes(language as Language);
  }

  initLanguage(): void {
    this.translateService.addLangs(this.allowedLanguages);
    // Check if language is set in the URL
    const langSegments = this.location.path().split('/');
    const langFromUrl = langSegments[1];
    if (this.isLanguage(langFromUrl)) {
      this.language = langFromUrl;
    } else {
      const languages = navigator.languages;
      for (let language of languages) {
        language = language.split('-')[0];
        if (this.isLanguage(language)) {
          this.language = language;
          break;
        }
      }
    }
    this.translateService.setDefaultLang(this.language);
  }

  changeLanguage(language: Language): void {
    if (this.isLanguage(language)) {
      this.language = language;
      this.translateService.use(language);
      // replace language code in the URL path
      const url = this.location.path(true).split('/');
      url[1] = language;
      this.location.replaceState(url.join('/'));
    }
  }
}
