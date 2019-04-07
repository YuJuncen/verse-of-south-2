import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../index-view/post';
import { Subject, Observable } from 'rxjs';
import { finalize, skip, debounceTime, toArray } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-index-post-list',
  templateUrl: './index-post-list.component.html',
  styleUrls: ['./index-post-list.component.scss'],
  animations: [trigger("In", [
    transition(":enter", [style({ opacity: 0, transform: "translateY(10%)" }), animate('.25s', style({ opacity: 1, transform: "translateY(0)" }))]),
    transition(":leave", animate('.5s', style({ opacity: 0 })))
  ])],
})
export class IndexPostListComponent implements OnInit {
  initialPosts$: Observable<Post[]>;
  loading: boolean = true;
  constructor(private postService: PostService) { }


  next = (sink: Subject<Post>) => {
    this.loading = true;
    this.postService.moreBreifPosts().pipe(finalize(() => this.loading = false))
      .subscribe(p => sink.next(p))
  }

  ngOnInit() {
    this.loading = true;
    this.initialPosts$ = 
      this.postService.getBreifPosts().pipe(
        finalize(() => this.loading = false),
        toArray()
      )
  }

}
