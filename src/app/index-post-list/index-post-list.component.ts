import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../index-view/post';
import { Observable, fromEvent, Subject, from } from 'rxjs';
import { finalize, mapTo, tap, flatMap } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApplicationContextService } from '../application-context.service';

@Component({
  selector: 'app-index-post-list',
  templateUrl: './index-post-list.component.html',
  styleUrls: ['./index-post-list.component.scss'],
  animations: [trigger('In', [
    transition(':enter', [style({ opacity: 0, transform: 'translateY(10%)' }), animate('.25s', style({ opacity: 1, transform: 'translateY(0)' }))]),
    transition(':leave', animate('.5s', style({ opacity: 0 })))
  ])],
})
export class IndexPostListComponent implements OnInit, AfterViewInit {
  initialPosts$: Observable<Post[]>;
  endro = false;
  loading = false;
  private offset = 0;
  private total = -1;
  private DEFAULT_LIMIT = 3;
  @ViewChild('LoadMore', {read: ElementRef}) private ld: ElementRef;
  loadMore$: Subject<{}> = new Subject<{}>();
  constructor(private postService: PostService, private ctx: ApplicationContextService) { }

  get isEnd(): boolean {
    console.log(this.offset, this.postService.totalPostCount);
    return this.offset >= this.postService.totalPostCount;
  }

  next = (sink: any) => {
    // Do you hear the people sing?
    // 你听到命令式（人民）在歌唱了吗？
    if (this.endro) { return; }

    this.ctx.getValue<() => void>('start-loading')();
    this.loading = true;
    const posts$ = this.postService.getBreifPosts(this.DEFAULT_LIMIT, this.offset);
    this.offset += this.DEFAULT_LIMIT;
    posts$.pipe(
        tap(ps => {if (this.isEnd) { this.endro = true; }}),
        finalize(() => {
          this.ctx.getValue<() => void>('endroll')();
          this.loading = false;
        }),
        flatMap(ps => from(ps))
      )
      .subscribe(p => sink.next(p));
  }

  ngAfterViewInit() {
    fromEvent(this.ld.nativeElement, 'click').pipe(mapTo({})).subscribe(e => this.loadMore$.next(e));
  }

  ngOnInit() {
    this.ctx.getValue<() => void>('start-loading')();
    this.offset += this.DEFAULT_LIMIT;
    this.initialPosts$ =
      this.postService.getBreifPosts(this.DEFAULT_LIMIT).pipe(
        tap(ps => {if (this.isEnd) { this.endro = true; }}),
        finalize(() => this.ctx.getValue<() => void>('endroll')()),
      );
  }

}
