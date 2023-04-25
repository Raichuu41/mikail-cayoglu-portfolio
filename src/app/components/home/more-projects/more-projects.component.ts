import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-more-projects',
  templateUrl: './more-projects.component.html',
  styleUrls: ['./more-projects.component.scss']
})
export class MoreProjectsComponent implements OnInit {

  constructor(
    public analyticsService: AnalyticsService
  ) {
  }

  ngOnInit() {
  }
}
