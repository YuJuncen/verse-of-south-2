import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DetailedPost } from './detailed-post';
import MOCK_POST from './mock-post';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],

})
export class PostDetailComponent implements OnInit, AfterViewInit {
  @ViewChild("content", {read: ElementRef}) cont: ElementRef;
  @ViewChild("comments", {read: ElementRef}) comments : ElementRef;
  @ViewChild("title", {read: ElementRef}) title: ElementRef;
  titles: {title: string, ele: any}[] = [];
  post: DetailedPost;

  constructor() { }

  ngOnInit() {
    this.post = MOCK_POST;
  }

  goToComment() {
    this.comments.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  goToTop() {
    this.title.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.titles = [];
    this.cont.nativeElement.querySelectorAll("h1").forEach(e => {
      setTimeout(() => {
        this.titles.push({ele: e, title: e.textContent});
      }, 0)
    });
  }
}
