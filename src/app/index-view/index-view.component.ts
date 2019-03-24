import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post';
import MOCK_POSTS from './mock-posts';
import { trigger, transition, style, animate } from '@angular/animations';
import { interval, Observable, concat } from 'rxjs';
import { finalize, take, toArray, flatMap, map } from 'rxjs/operators';
import { PostService } from '../post.service';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
  styleUrls: [ './index-view.component.md.scss', './index-view.component.scss',],
  animations: [trigger("In", [
    transition(":enter", [style({opacity: 0, transform: "translateY(10%)"}), animate('.25s', style({opacity: 1, transform: "translateY(0)"}))]),
    transition(":leave", animate('.5s', style({opacity: 0})))
  ])],
})
export class IndexViewComponent implements OnInit {
  posts : Post[] = [];
  hint: string;

  
  loading: boolean = true;

  constructor(private postSerivce: PostService) { }

  search(term: String) {
    
  }

  more() {
    this.loading = true;
    this.postSerivce.moreBreifPosts().pipe(finalize(() => this.loading = false))
      .subscribe(p => this.posts.push(p));
  }

  ngOnInit() {
    this.postSerivce.getBreifPosts().pipe(finalize(() => this.loading = false))
      .subscribe(p => this.posts.push(p));
  }
}
