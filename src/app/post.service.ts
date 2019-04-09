import { Injectable } from '@angular/core';
import MOCK_POSTS from './index-view/mock-posts';
import { Observable, of, from } from 'rxjs';
import { take, map, delay, repeat, tap, flatMap, skip} from 'rxjs/operators';
import { Post } from './index-view/post';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';
import {ArchiveInfo} from './archive-list/archive-list.component';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private cached: Post[] = [];
  private apiUrl = 'http://localhost:8000/resources';

  from_json(post: any) : Post {
    return {...post, publishTime: DateTime.fromISO(post.publish_time)};
  }

  getBreifPosts(limit: number, offset: number = 0) : Observable<Post[]> {
    if (this.cached.length - offset >= limit) {
      // console.log(limit, offset, this.cached);
      return of(this.cached).pipe(map(a => a.slice(offset, offset + limit)));
    }

    return this.http.get(this.apiUrl + "/index", {params: {
      limit: String(limit),
      offset: String(offset),
    }}).pipe(
      map(a => a['Ok']),
      map(a => a.map(this.from_json)),
      tap(ps => this.cached = this.cached.concat(ps)),
    );
  }

  getArchiveInfo() : Observable<ArchiveInfo[]> {
    return this.http.get(this.apiUrl + "/index/archive")
      .pipe(map(p => p['Ok']))
  }

  moreBreifPosts() : Observable<Post> {
    return from(this.cached).pipe(take(2), delay(300));
  }

  getArchives(month: number, year: number) : Observable<Post[]> {
    return this.http.get(this.apiUrl + `/index/archive/${year}/${month}`)
      .pipe(map(p => p['Ok']), map(ps => ps.map(this.from_json)));
  }

  searchBreifPosts({terms = [], tags = []}: {terms: string[], tags: string[]}) : (offset: number, limit: number) => Observable<Post[]> {
    console.log(terms, tags);
    if (typeof(terms) === 'string') {terms = (terms as string).split(',')};
    if (typeof(tags) === 'string') {tags = (tags as string).split(',')};
    return (_offset, _limit) => this.http.get(`${this.apiUrl}/index/query`, {params: {
      title: terms.join(' '),
      tags: tags.join(':')
    }}).pipe(
      map(ps => ps['Ok']),
      map(ps => ps.map(this.from_json))
    );
  }

  constructor(private http : HttpClient) { }
}
