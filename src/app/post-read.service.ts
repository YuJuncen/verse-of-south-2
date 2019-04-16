import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { DetailedPost, FormatType } from './post-detail/detailed-post';
import { map, tap, share, catchError, retry } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { BadResponseFormat, SomeOtherException } from './ajax.error';

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
      throw new BadResponseFormat(rawPost);
    }
  }

  getArticleFromId(id: number) : Observable<DetailedPost> {
    return this.http.get(this.api.getPostById(id))
      .pipe(catchError(e => {
        throw new SomeOtherException(e)
      }), map(this.fromJson))
  }

  constructor(private http: HttpClient, private api: ApiService) { }
}
