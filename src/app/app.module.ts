import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './components/home/home.module';
import {GeneralModule} from './components/general/general.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpLoaderFactory} from "./factory/translate-loader.factory";
import {SharedModule} from "./shared/shared.module";
import {NgcCookieConsentConfig, NgcCookieConsentModule} from "ngx-cookieconsent";

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.production ? 'mikail-cayoglu.de' : 'localhost'
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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    HomeModule,
    GeneralModule,

    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,

  ],
  providers: [TranslateService, provideHttpClient()],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
