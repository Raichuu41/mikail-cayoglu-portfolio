import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalyticsService} from 'src/app/services/analytics/analytics.service';
import {NgcCookieConsentService, NgcStatusChangeEvent} from 'ngx-cookieconsent';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private analyticsService: AnalyticsService,
    private ccService: NgcCookieConsentService // Inject NgcCookieConsentService
  ) {
  }

  ngOnInit(): void {
    // Listen for the initialization event of the consent popup
    this.ccService.initialized$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // Now it's safe to check for consent and subscribe to status changes
        this.subscribeToConsentStatus();

        // Check initial consent status reactively
        if (this.ccService.hasConsented()) {
          this.analyticsService.enableAnalytics();
          this.analyticsService.sendAnalyticPageView('/home', 'Visited Home Page');
        }
      });
  }

  private subscribeToConsentStatus(): void {
    this.ccService.statusChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: NgcStatusChangeEvent) => {
        if (event.status === 'allow') {
          // Consent given, enable Google Analytics
          this.analyticsService.enableAnalytics();
          this.analyticsService.sendAnalyticPageView('/home', 'Visited Home Page');
        } else {
          // Consent denied, disable Google Analytics
          this.analyticsService.disableAnalytics();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
