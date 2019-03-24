import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Post } from './post';
import { trigger, transition, style, animate } from '@angular/animations';
import { finalize, skip, throttleTime } from 'rxjs/operators';
import { PostService } from '../post.service';
import { Title } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
  styleUrls: [ './index-view.component.md.scss', './index-view.component.scss',],
  animations: [trigger("In", [
    transition(":enter", [style({opacity: 0, transform: "translateY(10%)"}), animate('.25s', style({opacity: 1, transform: "translateY(0)"}))]),
    transition(":leave", animate('.5s', style({opacity: 0})))
  ])],
})
export class IndexViewComponent implements OnInit, AfterViewInit {
  posts : Post[] = [];
  hint: string;
  @ViewChild("Bottom", {read: ElementRef}) articleList : ElementRef;
  private io : IntersectionObserver;
  scrollToBottom$ : Subject<IntersectionObserverEntry> = 
    new Subject<IntersectionObserverEntry>();
  
  loading: boolean = true;

  constructor(private postService: PostService,
              private titleService: Title,
              private router: Router) { }

  search(term: String) {
    if (term.length) {
      this.router.navigate(['search', term]);
    }
  }

  more() {
    this.loading = true;
    this.postService.moreBreifPosts().pipe(finalize(() => this.loading = false))
      .subscribe(p => this.posts.push(p));
  }

  ngOnInit() {
    this.titleService.setTitle("南方之诗");
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
      throttleTime(500)
    ).subscribe(e => this.more());
  }
}
