import {Directive, ElementRef, HostBinding, OnInit, Renderer2} from '@angular/core';
import {fromEvent} from 'rxjs';
import {auditTime} from 'rxjs/operators';

@Directive({
  selector: '[appFadeUp]'
})
export class FadeUpDirective implements OnInit {
  @HostBinding('style.opacity') private opacity = 0;
  @HostBinding('style.transform') private transform = 'translateY(40px)';

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    fromEvent(window, 'scroll')
      .pipe(auditTime(100))
      .subscribe(() => this.checkScroll());
  }

  private checkScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const inViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    if (inViewport) {
      this.opacity = 1;
      this.transform = 'translateY(0)';
    } else {
      this.opacity = 0;
      this.transform = 'translateY(40px)';
    }
  }
}
