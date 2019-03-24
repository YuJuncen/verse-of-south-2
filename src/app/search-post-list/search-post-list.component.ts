import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../index-view/post';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { map, filter, switchMap, share, tap, skip } from 'rxjs/operators';
import { Observable, concat, of } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-search-post-list',
  templateUrl: './search-post-list.component.html',
  styleUrls: ['./search-post-list.component.scss'],
  animations: [trigger("In", [
    transition(":enter", [style({opacity: 0, transform: "translateY(10%)"}), animate('.25s', style({opacity: 1, transform: "translateY(0)"}))]),
    transition(":leave", animate('.5s', style({opacity: 0})))
  ])],
})
export class SearchPostListComponent implements OnInit {
  static LIMIT = 5;
  hint$: Observable<string>;
  posts$: Observable<Post[]>;
  constructor(private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let params$ = this.route.queryParams;
    this.hint$ = params$.pipe(
      map(url => `“${url['term']}” 的搜索结果`)
    );
    this.posts$ = params$.pipe(
      switchMap(url => this.postService.searchBreifPosts(url['term'])(0, SearchPostListComponent.LIMIT))
    );
  }
}
