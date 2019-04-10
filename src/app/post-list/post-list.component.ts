import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { Subject, Observable, empty, merge } from 'rxjs';
import { Post } from '../index-view/post';
import { skip, debounceTime, mapTo, tap } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [trigger("In", [
    transition(":enter", [style({ opacity: 0 }), animate('.25s', style({ opacity: 1 }))]),
    transition(":leave", animate('.5s', style({ opacity: 0 })))
  ])],
})
export class PostListComponent implements AfterViewInit {
  posts: Post[] = []
  private io: IntersectionObserver;
  private scrollToBottom$: Subject<IntersectionObserverEntry> =
    new Subject<IntersectionObserverEntry>();
  private postsComeIn$: Subject<Post> = new Subject<Post>();
  @ViewChild("Bottom", { read: ElementRef }) private articleList: ElementRef;
  /**
   * This is the delegate of 'load-more' posts.  
   * when user scroll to bottom of this list, or `forceNext` emittes, 
   * `next` will be call, injecting the `postsComeIn$` sink to this function,
   * and the posts provided by call `sink.next` will be appended to `posts` list.
   */
  @Input() next: Function = (_sink: any) => {};
  /** 
   * This is the initial posts.
   * Everytime this emittes, the list will be refreshed.
   * the old posts will disappear.
  */
  @Input() initialPosts: Observable<Post[]> = empty();
  /**
   * This is the 'red button' to load more posts.
   */
  @Input("forceNext") forceNext$: Observable<never[]> = empty();
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.initialPosts.subscribe(ps => {
      this.posts = [];
      ps.forEach(p => this.posts.push(p));
    });
  }

  ngAfterViewInit() {
    let nextSingal$ = this.scrollToBottom$.pipe(
      skip(1),
      debounceTime(500));

    merge(nextSingal$, this.forceNext$)
      .subscribe(_e => this.next(this.postsComeIn$));
      if (isPlatformBrowser(this.platformId))
      this.io = new IntersectionObserver((entries, _observer) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            this.scrollToBottom$.next(e);
          }
        });
      });
      try { (this.io as any).USE_MUTATION_OBSERVER = false; } catch (e) { console.log("Don't use safari, you're good boy."); }
      this.io.observe(this.articleList.nativeElement);

    this.postsComeIn$.subscribe(p => this.posts.push(p))
  }

}
