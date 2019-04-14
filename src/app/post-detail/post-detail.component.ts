import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Inject, PLATFORM_ID } from '@angular/core';
import { DetailedPost } from './detailed-post';
import MOCK_POST from './mock-post';
import { Title } from '@angular/platform-browser';
import { format } from 'timeago.js';
import { Observable, of, from } from 'rxjs';
import { map, tap, switchMap, share, take, flatMap, publishReplay, refCount } from 'rxjs/operators';
import {Comment} from '../comment-section/comment';
import { isPlatformBrowser } from '@angular/common';
import { PostReadService } from '../post-read.service';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],

})
export class PostDetailComponent implements OnInit {
  @ViewChild("content", {read: ElementRef}) cont: ElementRef;
  @ViewChild("comments", {read: ElementRef}) comments : ElementRef;
  @ViewChild("title", {read: ElementRef}) title: ElementRef;
  titles: {title: string, ele: any}[] = [];
  comments$: Observable<Comment[]>;
  post$: Observable<DetailedPost>;

  constructor(private titleService : Title,
      @Inject(PLATFORM_ID) private platformId: Object,
      private read : PostReadService,
      private route: ActivatedRoute) { }

  getPublishTimeago() {
    return this.post$.pipe(
      map(p => p.publishTime),
      map(time => time instanceof DateTime ? time : DateTime.fromISO(time)),
      map(time => format(time.toJSDate(), 'zh_CN'))
    );
  }

  ngOnInit() {
    this.post$ = this.route.params.pipe(flatMap(({id}) => this.read.getArticleFromId(Number.parseInt(id))),tap(console.log), publishReplay(1), refCount());
    this.comments$ = this.post$.pipe(tap(p => this.titleService.setTitle(p.title)), map(p => p.comments));
  }

  goToComment() {
    this.comments.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  goToTop() {
    this.title.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  onDOMLoaded = () => {
    this.titles = [];
    if (isPlatformBrowser(this.platformId)) {
      this.cont.nativeElement.querySelectorAll("h1").forEach(e => {
        setTimeout(() => {
          this.titles.push({ele: e, title: e.textContent});
        }, 0)
      });
    }
  }
}
