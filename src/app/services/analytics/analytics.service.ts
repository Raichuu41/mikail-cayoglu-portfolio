declare const gtag: Function;
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, tap, distinctUntilChanged} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private isTrackingEnabledSubject = new BehaviorSubject<boolean>(false);
  public isTrackingEnabled$: Observable<boolean> = this.isTrackingEnabledSubject.asObservable().pipe(
    distinctUntilChanged() // Emit only when the value changes
  );

  constructor() {
  }

  enableAnalytics(): void {
    console.log("Enabling Google Analytics");
    this.isTrackingEnabledSubject.next(true);
  }

  disableAnalytics(): void {
    console.log("Disabling Google Analytics");
    this.isTrackingEnabledSubject.next(false);
  }

  sendAnalyticEvent(action: string, category: string, label: string): void {
    this.isTrackingEnabled$
      .pipe(
        filter((enabled) => enabled), // only send event if tracking is enabled
        tap(() => {
          console.log("Sending event to Google Analytics");
          gtag('event', action, {
            event_category: category,
            event_label: label
          });
        })
      )
      .subscribe();
  }

  sendAnalyticPageView(path: string, title: string): void {
    this.isTrackingEnabled$
      .pipe(
        filter((enabled) => enabled), // only send event if tracking is enabled
        tap(() => {
          console.log("Sending event to Google Analytics");
          gtag('event', 'page_view', {
            page_path: path,
            page_title: title
          });
        })
      )
      .subscribe();
  }

}
