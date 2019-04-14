import { Injectable } from '@angular/core';
import { Post } from './index-view/post';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { DetailedPost, FormatType } from './post-detail/detailed-post';
import { map, tap, share } from 'rxjs/operators';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class PostReadService {
  private fromString(desc: string) : FormatType {
    if (/markdown/i.exec(desc)) {
      return FormatType.Markdown;
    }
    if (/plaintext/i.exec(desc)){
      return FormatType.PlainText;
    }
    if (/html/i.exec(desc)) {
      return FormatType.HTML;
    }
    return FormatType.Markdown;
  }

  private fromJson = (rawPost: Object) : DetailedPost => {
    try {
      return {...rawPost, 
        formatType: this.fromString(rawPost['formatType'] as string), 
        publishTime: DateTime.fromISO(rawPost['publishTime'])} as DetailedPost;
    } catch(e) {
      throw new Error(`failed to load post from received data: ${JSON.stringify(rawPost)}, because: ${e}`);
    }
  }

  getArticleFromId(id: number) : Observable<DetailedPost> {
    return this.http.get(this.api.getPostById(id))
      .pipe(map(this.fromJson))
  }

  constructor(private http: HttpClient, private api: ApiService) { }
}
