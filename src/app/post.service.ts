import { Injectable } from '@angular/core';
import MOCK_POSTS from './index-view/mock-posts';
import { Observable, of, from } from 'rxjs';
import { take, map, delay, repeat, tap, flatMap, skip, catchError} from 'rxjs/operators';
import { Post, Tag } from './index-view/post';
import { HttpClient } from '@angular/common/http';
import { DateTime, Zone } from 'luxon';
import {ArchiveInfo} from './archive-list/archive-list.component';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private cached: Post[] = [];
  private totalPost: number;
  private possibleEnded = false;

  get totalPostCount(): number {
    return this.totalPost;
  }

  from_json(post: any): Post {
    return {...post, publishTime: DateTime.fromISO(post.publishTime, {zone: 'utc'})};
  }

  getBreifPosts(limit: number, offset: number = 0): Observable<Post[]> {
    if (this.possibleEnded || this.cached.length - offset >= limit) {
      return of(this.cached).pipe(map(a => a.slice(offset, offset + limit)));
    }

    return this.http.get<Post[]>(this.api.indexPosts(), {params: {
      limit: String(limit),
      offset: String(offset),
    }}).pipe(
      tap(ps => this.totalPost = ps['pagination'].total),
      map(a => a['result'].map(this.from_json)),
      tap(ps => {
        this.cached = this.cached.concat(ps);
        if (ps.length < limit) {
          this.possibleEnded = true;
        }
      }),
    );
  }

  getArchiveInfo(): Observable<ArchiveInfo[]> {
    return this.http.get<ArchiveInfo[]>(this.api.getArchives()).pipe();
  }

  getArchives(month: number, year: number): Observable<Post[]> {
    return this.http.get(this.api.getArchivesOf(year, month))
      .pipe( map(ps => (ps as Post[]).map(this.from_json)));
  }

  searchBreifPosts({terms = [], tags = []}: {terms: string[], tags: string[]}): (offset: number, limit: number) => Observable<{result: Post[], unusedTagsName: Set<string>}> {
    if (typeof(terms) === 'string') {terms = (terms as string).split(','); }
    if (typeof(tags) === 'string') {tags = (tags as string).split(','); }
    return (_offset, _limit) => this.http.get(this.api.searchPosts() , {params: {
      title: terms.join(' '),
      tags: tags.join(':')
    }}).pipe(
      // the search page has no pagination; so temporally omit it.
      map(ps => ps['result']),
      map(ps => {
        const notused = new Set();
        for (const t of ps.tagsNotUse) {
          notused.add(t.name);
        }
        return {unusedTagsName: notused, result: (ps.result as Post[]).map(this.from_json) };
      })
    );
  }

  constructor(private http: HttpClient, private api: ApiService) { }
}
