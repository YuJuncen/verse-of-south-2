import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { connect } from 'net';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  @ViewChild('TheCircle', {read: ElementRef}) c: ElementRef;
  deg = 0;
  constructor(private titleService: Title,
              @Optional()
        @Inject(RESPONSE)
        private response: Response,
              @Inject(PLATFORM_ID) private platformId: Object, ) {
        }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.response.status(404);
    }
    this.titleService.setTitle('“无穷之地”');
  }

}
