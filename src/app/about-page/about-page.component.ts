import { Component, OnInit, Input, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { ApplicationContextService } from '../application-context.service';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  post: string;
  @Input() aboutFileLink: string = `${ isPlatformBrowser(this.platformId) ? "" : this.ctx.getValue('this-site')}/assets/about.md`;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, 
    private ctx: ApplicationContextService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.aboutFileLink, {responseType: "text"})
      .pipe(
        catchError(error => {
          console.error(
            `type of error: ${typeof error}\n` +
            `proto: ${error.prototype}\n` +
            `name? " ${error.name}\n` +
            `message? " ${error.message}\n` + 
            `[BEFORE SHARE_REPLAY]Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
          return of("");
        }),
        shareReplay(1)
        , catchError(error => {
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
        return of("");
      })).subscribe(p => this.post = p);
  }
}
