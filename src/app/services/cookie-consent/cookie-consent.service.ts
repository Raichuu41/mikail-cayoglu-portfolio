import {Injectable} from '@angular/core';
import {NgcCookieConsentConfig} from 'ngx-cookieconsent';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {

  public cookieConfig: NgcCookieConsentConfig = {
    cookie: {
      domain: environment.production ? 'https://mikail-cayoglu.de' : 'localhost'
    },
    palette: {
      popup: {
        background: '#000'
      },
      button: {
        background: '#f1d600'
      }
    },
    theme: 'edgeless',
    type: 'opt-in',
    content: {
      message: '{{ "cookie.message" | translate }}',
      dismiss: '{{ "cookie.dismiss" | translate }}',
      deny: '{{ "cookie.deny" | translate }}',
      link: '{{ "cookie.link" | translate }}',
      // href: 'https://cookiesandyou.com', // Update the link for more information about cookies
      policy: '{{ "cookie.policy" | translate }}'
    }
  }

  constructor() {
  }

  loadGoogleAnalytics(): void {

  }
}
