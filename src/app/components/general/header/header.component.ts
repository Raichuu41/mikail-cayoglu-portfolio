import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations'
import {AnalyticsService} from 'src/app/services/analytics/analytics.service';
import {FormControl} from '@angular/forms';
import {Language, LanguageService} from 'src/app/services/language/language.service';
import {Location, ViewportScroller} from "@angular/common";
import {filter, first, map, take, tap} from "rxjs";

interface LanguageOption {
  text: string,
  flag: string,
  languageValue: Language,
  desktopWidth: number,
  desktopHeight: number,
  mobileWidth: number,
  mobileHeight: number
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger("animateMenu", [
      transition(":enter", [
        query("*", [
          style({opacity: 0, transform: "translateY(-50%)"}),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({opacity: 1, transform: "none"}))
          ])
        ])
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  responsiveMenuVisible: Boolean = false;
  pageYPosition!: number;
  languageFormControl: FormControl = new FormControl();
  cvName: string = "";
  cvLink: string = "";
  languageOptions: LanguageOption[] = [
    {
      text: 'English',
      flag: 'https://www.worldometers.info/img/flags/small/tn_uk-flag.gif',
      languageValue: 'en',
      desktopWidth: 20,
      desktopHeight: 10,
      mobileWidth: 35,
      mobileHeight: 18
    },
    {
      text: 'Deutsch',
      flag: 'https://www.worldometers.info/img/flags/small/tn_gm-flag.gif',
      languageValue: 'de',
      desktopWidth: 20,
      desktopHeight: 12,
      mobileWidth: 35,
      mobileHeight: 22
    },
    {
      text: 'Türkçe',
      flag: 'https://www.worldometers.info/img/flags/small/tn_tu-flag.gif',
      languageValue: 'tr',
      desktopWidth: 20,
      desktopHeight: 13,
      mobileWidth: 35,
      mobileHeight: 23
    }]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public analyticsService: AnalyticsService,
    public languageService: LanguageService,
    private location: Location,
    private viewportScroller: ViewportScroller
  ) {
  }

  ngOnInit(): void {
    this.languageFormControl.valueChanges.subscribe(val => {
      this.languageService.changeLanguage(val);
      this.updateCVLink();
    })
    this.languageFormControl.setValue(this.languageService.language)
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map((event) => event as NavigationStart),
      take(1),
      tap((event: NavigationStart) => {
        const urlTree = this.router.parseUrl(event.url);
        if (urlTree.fragment)
          this.viewportScroller.scrollToAnchor(urlTree.fragment);
      })
    )
  }

  scroll(el: string) {
    if (document.getElementById(el)) {
      document.getElementById(el)?.scrollIntoView({behavior: 'smooth'});
    }
    this.responsiveMenuVisible = false;
  }

  addFragment(fragment: string, event: MouseEvent): void {
    event.preventDefault();
    const currentPath = this.location.path(false);
    const urlWithFragment = currentPath.concat(`#${fragment}`);
    this.router.navigateByUrl(urlWithFragment).then(() => {
    });
    this.scroll(fragment);
  }

  updateCVLink(): void {
    this.languageService.translateService.get('Header.cvName').pipe(
      first()).subscribe((value: string) => {
        this.cvLink = `${location.protocol}//${location.host}/assets/cv/${value}`;
      }
    );
  }

  @HostListener('window:scroll', ['getScrollPosition($event)'])
  getScrollPosition(event: any) {
    this.pageYPosition = window.scrollY
  }

  changeLanguage(language: string) {
    this.languageFormControl.setValue(language);
  }
}
