import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivateFn} from '@angular/router';
import {Observable} from 'rxjs';
import {LanguageService} from "../services/language/language.service";

export const languageGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const languageService = inject(LanguageService);  // Use `inject` function to get the service instance
  const router = inject(Router);  // Use `inject` function to get the Router instance

  const langSegments = state.url.split('/');
  const lang = langSegments[1];

  if (languageService.isLanguage(lang)) {
    languageService.changeLanguage(lang);
    return true;  // Allow navigation if the language is valid
  } else {
    // Redirect to the default language route if the language is invalid
    return router.createUrlTree([`/${languageService.language}/home`]);
  }
};
