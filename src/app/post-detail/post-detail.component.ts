import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DetailedPost } from './detailed-post';
import MOCK_POST from './mock-post';
import { Title } from '@angular/platform-browser';
import { format } from 'timeago.js';
import { Observable, of, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {Comment} from '../comment-section/comment';

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
  comments$: Observable<Comment[]>;
  post$: Observable<DetailedPost>;

  constructor(private titleService : Title) { }

  getPublishTimeago() {
    return this.post$.pipe(map(p => format(p.publishTime.toJSDate(), 'zh_CN')));
  }

  ngOnInit() {
    this.post$ = of(MOCK_POST as DetailedPost);
    this.comments$ = this.post$.pipe(tap(p => this.titleService.setTitle(p.title)), map(p => p.comments));
  }

  goToComment() {
    this.comments.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  goToTop() {
    this.title.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  ngAfterViewInit(): void {
    this.titles = [];
    this.cont.nativeElement.querySelectorAll("h1").forEach(e => {
      setTimeout(() => {
        this.titles.push({ele: e, title: e.textContent});
      }, 0)
    });
  }
}
