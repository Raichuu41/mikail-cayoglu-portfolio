import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Location} from '@angular/common';


type Language = 'de-DE' | 'en-EN';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: Language = 'en-EN';

  constructor(
    public translateService: TranslateService,
    private location: Location,
  ) {
  }

  initLanguage(): void {
    this.translateService.addLangs(['en-EN', 'de-DE']);
    let language = navigator.language || (navigator as any).userLanguage;
    this.translateService.setDefaultLang(language);

    // Change the URL without navigate:
    this.location.go(language);

    this.language = language;
  }

  changeLanguage(language: Language): void {
    this.translateService.setDefaultLang(language);
    this.location.go(language);
    this.language = language;
  }
}
