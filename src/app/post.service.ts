import { Injectable } from '@angular/core';
import MOCK_POSTS from './index-view/mock-posts';
import { Observable, of, from, Subject } from 'rxjs';
import { take, map, delay, filter, flatMap, toArray} from 'rxjs/operators';
import { Post } from './index-view/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  cached: Post[] = MOCK_POSTS;

  getBreifPosts() : Observable<Post> {
    return from(this.cached).pipe(delay(1000));
  }

  moreBreifPosts() : Observable<Post> {
    return from(this.cached).pipe(take(2), delay(300));
  }

  searchBreifPosts(term: string) : Observable<Post[]> {
    return of(MOCK_POSTS).pipe(map(ps => ps.filter(p => p.title.search(term) != -1)));
  }

  constructor() { }
}
