import { Component, Input } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ApplicationContextService } from './application-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vos-fnt-ng';
  routing: boolean = false;
  userRouting : boolean = false;
  isDevMode: boolean = isDevMode();
  enableRoute = () => setTimeout(() => this.userRouting = true, 0);
  disableRoute = () => setTimeout(() => this.userRouting = false, 0);

  constructor(private router: Router, private snackBar: MatSnackBar, private ctx: ApplicationContextService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // console.log(new Date().toISOString(), 'start', event);
        setTimeout(() => this.routing = true, 0);
      }
      if ([NavigationEnd, NavigationCancel, NavigationError].some(c => event instanceof c)) {
        // console.log(new Date().toISOString(), 'endro', event);
        setTimeout(() => this.routing = false, 0);
      }
    });
    this.ctx.putValue('error-snackbar-config', {panelClass: "vos-warn", horizontalPosition: 'right'});
    this.ctx.putValue('start-loading', this.enableRoute);
    this.ctx.putValue('endroll', this.disableRoute);
    this.ctx.putValue('dev-mode?', this.isDevMode);
  }
}
