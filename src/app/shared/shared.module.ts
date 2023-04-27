import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FadeUpDirective} from '../directives/fade-up.directive';

@NgModule({
  declarations: [
    FadeUpDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FadeUpDirective
  ]
})
export class SharedModule {
}
