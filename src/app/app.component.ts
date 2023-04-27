import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {LanguageService} from 'src/app/services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mikailcayoglu-portfolio';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private languageService: LanguageService
  ) {
  }

  ngOnInit(): void {

    this.languageService.initLanguage();
    this.titleService.setTitle('Mikail Cayoglu | Computer Scientist');
    this.metaService.addTags([
      {name: 'keywords', content: 'computer scientist, software, developer'},
      {
        name: 'description',
        content: 'I have 5 years of experience in developing technological solutions as Cloud Engineer, Data Engineer and Software Developer. I am dedicated to writing and refactoring clean, reusable, and scalable code in Angular, Node.js, Python and sometimes in C++ while following good practices and development standards.'
      },
    ]);
  }
}
