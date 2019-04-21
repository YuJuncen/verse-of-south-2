import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { DetailedPost, FormatType } from './post-detail/detailed-post';
import { map, tap, share, catchError, retry } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { BadResponseFormat, SomeOtherException } from './ajax.error';
import { Comment } from './comment-section/comment';

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
        publishTime: DateTime.fromISO(rawPost['publishTime'], {zone: 'utc'})} as DetailedPost;
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

  postCommment(publisher: string, content: string, to: number, extra: {
    email?: string,
    replyTo?: number,
    recaptcha?: string
  }) : Observable<Comment> {
    return this.http.post<Comment>(this.api.publishComment(), 
      JSON.stringify({
        publisher_email: extra.email || null,
        reply_to: extra.replyTo || null,
        publisher_name: publisher,
        comment: content,
        to
      }), {
        headers: {
          "Content-Type": "Application/json"
        },
        params: {
          recaptcha: extra.recaptcha
        }
      }
    ).pipe(catchError(
      e => {throw new SomeOtherException(e)}
    ));
  }

  constructor(private http: HttpClient, private api: ApiService) { }
}
