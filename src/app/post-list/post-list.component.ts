import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Post } from '../index-view/post';
import { skip, debounceTime } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [trigger("In", [
    transition(":enter", [style({ opacity: 0, transform: "translateY(10%)" }), animate('.25s', style({ opacity: 1, transform: "translateY(0)" }))]),
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
  @Input() next: (s: Subject<Post>) => void;
  @Input() initialPosts: Observable<Post[]>;
  constructor() { }

  ngOnInit() {
    this.initialPosts.subscribe(ps => {
      this.posts = [];
      ps.forEach(p => this.posts.push(p));
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom$.pipe(
      skip(1),
      debounceTime(500),
      ).subscribe(_e => this.next(this.postsComeIn$));

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
