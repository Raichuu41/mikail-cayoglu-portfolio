import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {languageGuard} from "./guards/language-prefix.guard";


const routes: Routes = [
  {
    path: ':lang',
    pathMatch: 'full',
    redirectTo: ':lang/home',
  },
  {
    path: ':lang/home',
    component: HomeComponent,
    canActivate: [languageGuard],
  },
  {
    path: '**',
    pathMatch: 'prefix',
    canActivate: [languageGuard],
    redirectTo: '',
  },
];
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
