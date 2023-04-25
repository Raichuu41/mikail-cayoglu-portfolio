import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LanguageGuard} from "./guards/language-prefix.guard";


const routes: Routes = [
  {
    path: ':lang/home',
    component: HomeComponent,
    canActivate: [LanguageGuard],
  },
  {
    path: '**',
    pathMatch: 'prefix',
    canActivate: [LanguageGuard],
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
  providers: [LanguageGuard]
})
export class AppRoutingModule {
}
