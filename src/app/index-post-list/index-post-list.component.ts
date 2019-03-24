import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../index-view/post';
import { Subject } from 'rxjs';
import { finalize, skip, throttleTime, debounce, debounceTime } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-index-post-list',
  templateUrl: './index-post-list.component.html',
  styleUrls: ['./index-post-list.component.scss'],
  animations: [trigger("In", [
    transition(":enter", [style({opacity: 0, transform: "translateY(10%)"}), animate('.25s', style({opacity: 1, transform: "translateY(0)"}))]),
    transition(":leave", animate('.5s', style({opacity: 0})))
  ])],
})
export class IndexPostListComponent implements OnInit, AfterViewInit {
  posts : Post[] = [];
  loading: boolean = true;
  private io : IntersectionObserver;
  scrollToBottom$ : Subject<IntersectionObserverEntry> = 
  new Subject<IntersectionObserverEntry>();
  @ViewChild("Bottom", {read: ElementRef}) articleList : ElementRef;

  constructor(private postService: PostService) { }

  more() {
    this.loading = true;
    this.postService.moreBreifPosts().pipe(finalize(() => this.loading = false))
      .subscribe(p => this.posts.push(p));
  }

  ngOnInit() {
    this.postService.getBreifPosts().pipe(finalize(() => this.loading = false))
      .subscribe(p => this.posts.push(p));
    this.io = new IntersectionObserver((entries, _observer) => {
      entries.forEach( e => {
        if (e.isIntersecting) {
          this.scrollToBottom$.next(e);
        }
      })
    }, {threshold: 1});
  }

  ngAfterViewInit() {
    this.io.observe(this.articleList.nativeElement);
    this.scrollToBottom$.pipe(
      skip(1),
      debounceTime(500)
    ).subscribe(e => this.more());
  }

}
