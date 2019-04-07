import { Injectable } from '@angular/core';
import MOCK_POSTS from './index-view/mock-posts';
import { Observable, of, from } from 'rxjs';
import { take, map, delay} from 'rxjs/operators';
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

  searchBreifPosts(term: string) : (offset: number, limit: number) => Observable<Post[]> {
    return (_offset, _limit) => of(MOCK_POSTS).pipe(map(ps => ps.filter(p => p.title.search(term) != -1)));
  }

  constructor() { }
}
