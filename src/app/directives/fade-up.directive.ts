import {Directive, ElementRef, HostBinding, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFadeUp]'
})
export class FadeUpDirective implements OnInit {
  @HostBinding('style.opacity') private opacity = 0;
  @HostBinding('style.transform') private transform = 'translateY(40px)';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.opacity = 1;
          this.transform = 'translateY(0)';
        } else {
          this.opacity = 0;
          this.transform = 'translateY(40px)';
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
