import { Component, OnInit, Input } from '@angular/core';
import {Comment} from './comment';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input('comments') comments$: Observable<Comment[]>;
  replyTo$ = new Subject<Comment>();
  commentTable$ : Observable<Map<number, Comment>>;
  constructor() { 
  }

  ngOnInit() {
    this.commentTable$ = this.comments$.pipe(map(cs => {
      let m = new Map<number, Comment>();
      for (const c of cs){
        m.set(c.id, c);
      }
      return m;
    }),
    shareReplay(1))
  }

}
