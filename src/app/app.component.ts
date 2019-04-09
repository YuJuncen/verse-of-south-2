import { Component, Input } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vos-fnt-ng';
  isDevMode$ : Observable<boolean> = of({}).pipe(map(_ => isDevMode()));
}
