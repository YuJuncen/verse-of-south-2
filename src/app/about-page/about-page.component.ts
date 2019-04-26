import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import { ApplicationContextService } from '../application-context.service';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  post$: Observable<string>;
  @Input() aboutFileLink: string = "/assets/about.md";
  constructor(private ctx: ApplicationContextService, private http: HttpClient) { }

  ngOnInit() {
    this.post$ = this.http.get(this.aboutFileLink, {responseType: "text"})
      .pipe(
        shareReplay(1)
        , catchError(e => {
        console.error("Failed to load about file: ", e);
        return of("");
      }))
  }

}
