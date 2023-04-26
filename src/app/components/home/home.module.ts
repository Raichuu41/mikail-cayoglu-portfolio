import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HomeComponent} from './home.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {AboutComponent} from './about/about.component';
import {BannerComponent} from './banner/banner.component';
import {ContactComponent} from './contact/contact.component';
import {JobsComponent} from './jobs/jobs.component';
import {MoreProjectsComponent} from './more-projects/more-projects.component';
import {ProjectsComponent} from './projects/projects.component';
import {HttpLoaderFactory} from "../../factory/translate-loader.factory";

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    AboutComponent,
    JobsComponent,
    ProjectsComponent,
    MoreProjectsComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgOptimizedImage,
  ]
})
export class HomeModule {
}
