import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(
    public analyticsService: AnalyticsService
  ) {
  }

  ngOnInit(): void {
  }

  getImage(project: any): string {
    return project.image as string;
  }

}
