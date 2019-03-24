import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  @ViewChild("TheCircle", {read: ElementRef}) c: ElementRef;
  deg: number = 0;
  interval: any;
  constructor() { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.c.nativeElement.style.background = `linear-gradient(${this.deg}deg, #0D566E, #0B346E)`;
      this.deg += 4;
    }, 100);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
