import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Inject, PLATFORM_ID } from '@angular/core';
import { DetailedPost } from './detailed-post';
import MOCK_POST from './mock-post';
import { Title } from '@angular/platform-browser';
import { format } from 'timeago.js';
import { Observable, of } from 'rxjs';
import { map, tap, flatMap, publishReplay, refCount, catchError, finalize } from 'rxjs/operators';
import {Comment} from '../comment-section/comment';
import { isPlatformBrowser } from '@angular/common';
import { PostReadService } from '../post-read.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ApplicationContextService } from '../application-context.service';
import { UnexpectedAjaxResult } from '../ajax.error';
import { MatSnackBar } from '@angular/material';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],

})
export class PostDetailComponent implements OnInit {
  @ViewChild('content', {read: ElementRef}) cont: ElementRef;
  @ViewChild('comments', {read: ElementRef}) comments: ElementRef;
  @ViewChild('title', {read: ElementRef}) title: ElementRef;
  titles: {title: string, ele: any}[] = [];
  comments$: Observable<Comment[]>;
  post$: Observable<DetailedPost>;

  constructor(private titleService: Title,
              @Inject(PLATFORM_ID) private platformId: Object,
              private read: PostReadService,
              private route: ActivatedRoute,
              private router: Router,
              private ctx: ApplicationContextService,
              private snack: MatSnackBar,
              private seo: SeoService) { }

  getLuxonTime = time => time instanceof DateTime ? time : DateTime.fromISO(time, {
    zone: 'utc'
  }) 

  getPublishTimeago() {
    return this.post$.pipe(
      map(p => p.publishTime),
      map(this.getLuxonTime),
      map(time => format(time.toJSDate(), 'zh_CN'))
    );
  }

  onError(e: Error): Observable<null> {
    try {
      const s = this.snack.open(e.message, '回到首页', this.ctx.getValue('error-snackbar-config'));
      s.onAction().subscribe(_ => this.router.navigate(['/']));
    } catch (e) {}
    return of(null);
  }

  ngOnInit() {
    this.ctx.getValue<() => void>('start-loading')();
    this.post$ = this.route.params.pipe(
      flatMap(({id}) => this.read.getArticleFromId(Number.parseInt(id))
        .pipe(
          finalize(this.ctx.getValue('endroll')),
          catchError(e => this.onError(e)))),
      catchError(e => this.onError(e)),
      publishReplay(1),
      refCount());
    this.comments$ = this.post$.pipe(tap(p => this.titleService.setTitle(p.title)), map(p => p.comments));
    this.post$.subscribe(p => {
      this.seo.generateTags({
        title: p.title,
        description: p.intro || "这是一篇不知所云的文章。",
        type: 'article',
        post: { 
          publishTime: this.getLuxonTime(p.publishTime),
          postId: p.id,
          tags: p.tags.map(t => t.name),
        }
      })
    })
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
      this.cont.nativeElement.querySelectorAll('h1').forEach(e => {
        setTimeout(() => {
          this.titles.push({ele: e, title: e.textContent});
        }, 0);
      });
    }
  }
}
