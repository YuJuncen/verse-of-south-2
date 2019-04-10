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
export class NotFoundComponent implements OnInit, OnDestroy {

  @ViewChild("TheCircle", {read: ElementRef}) c: ElementRef;
  deg: number = 0;
  interval: any;
  constructor(private titleService: Title,
        @Optional()
        @Inject(RESPONSE)
        private response: Response,
        @Inject(PLATFORM_ID) private platformId: Object,) {
        }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.response.status(404);
    }
    if (isPlatformBrowser(this.platformId)) {
      this.interval = setInterval(() => {
        this.c.nativeElement.style.background = `linear-gradient(${this.deg}deg, #0D566E, #0B346E)`;
        this.deg += 1;
      }, 200);
    }
    this.titleService.setTitle("“无穷之地”");
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
