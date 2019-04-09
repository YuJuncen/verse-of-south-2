import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../index-view/post';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { map, filter, switchMap, share, tap, skip, flatMap } from 'rxjs/operators';
import { Observable, concat, of, Subject, from } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { SearchParserService } from '../search-parser.service';

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
  tags$: Observable<string[]>;
  tagsLen$: Observable<number>;
  terms$: Observable<String[]>;
  termsLen$: Observable<number>;
  posts$: Observable<Post[]>;
  params$: Observable<Params>;
  constructor(private postService: PostService,
             private route: ActivatedRoute,) { }
  
  mapToLen<T>(o: Observable<Array<T>>) {
    return o.pipe(map(a => a.length));
  }
  splitIfNeeded = (splitBy: string | RegExp) => (i: any) => {
    if (typeof(i) === 'string') {
      return (i as string).split(splitBy);
    }
    return i;
  }
  splitByCommaIfNeeded = this.splitIfNeeded(",");

  ngOnInit() {
    this.params$ = this.route.queryParams;
    this.tags$ = this.params$.pipe(map(url => url['tag']), map(this.splitByCommaIfNeeded));
    this.terms$ = this.params$.pipe(map(url => url['plain']), map(this.splitByCommaIfNeeded));
    this.posts$ = this.params$.pipe(
      switchMap(url => this.postService.searchBreifPosts({tags: url['tag'], terms: url['plain']})(0, SearchPostListComponent.LIMIT)),
    );
  }
}
