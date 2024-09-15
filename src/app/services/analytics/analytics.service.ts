declare const gtag: Function;
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() {
  }

  sendAnalyticEvent(action: string, category: string, label: string): void {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }

  sendAnalyticPageView(path: string, title: string): void {
    gtag('event', 'page_view', {
      page_path: path,
      page_title: title
    });
  }

}
