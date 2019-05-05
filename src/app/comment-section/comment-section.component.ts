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
  comments: Comment[] = [];
  replyTo$ = new Subject<Comment>();
  commentTable = new Map<number, Comment>();
  constructor() { }

  add = (c) => this.comments.push(c);
  ngOnInit() {
    this.comments$.subscribe(cs => cs.forEach(c => {
      this.comments.push(c);
      this.commentTable.set(c.id, c);
    }));
  }

}
