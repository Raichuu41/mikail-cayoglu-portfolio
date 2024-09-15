import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable} from 'rxjs';
import {LanguageService} from "../services/language/language.service";

@Injectable({
  providedIn: 'root'
})
export class LanguageGuard  {
  constructor(private languageService: LanguageService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const langSegments = state.url.split('/');
    const lang = langSegments[1];
    if (this.languageService.isLanguage(lang)) {
      this.languageService.changeLanguage(lang);
    } else {
      this.router.navigateByUrl(`/${this.languageService.language}/home`).then(r => {
      });
    }
    return true;
  }
}
