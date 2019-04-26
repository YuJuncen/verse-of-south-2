import { Component, OnInit, Input } from '@angular/core';
import { ApplicationContextService } from '../application-context.service';

@Component({
  selector: 'app-favicon',
  templateUrl: './app-favicon.component.html',
  styleUrls: ['./app-favicon.component.scss']
})
export class AppFaviconComponent implements OnInit {
  
  constructor(private ctx: ApplicationContextService) { }
  @Input() githubPath = this.ctx.getValue<string>('github-repo', null);
  @Input() mailAddr = this.ctx.getValue<string>('mail-addr', null);
  @Input() version = this.ctx.getValue<string>('app-version', null);
  @Input() faviconWidth : string | number = '128px';
  ngOnInit() {
  }

}
