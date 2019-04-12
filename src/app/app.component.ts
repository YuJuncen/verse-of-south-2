import { Component, Input } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vos-fnt-ng';
  routing = false;
  isDevMode$ : Observable<boolean> = of({}).pipe(map(_ => isDevMode()));
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // console.log("routing!");
        this.routing = true;
      }
      if ([NavigationEnd, NavigationCancel, NavigationError].some(c => event instanceof c)) {
        // console.log("endro!");
        this.routing = false;
      }
    });
  }
}
