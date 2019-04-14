import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment-section/comment';
import { format } from 'timeago.js';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor() { }
  @Input() comment: Comment;

  getPublishTimeago() {
    this.comment.publishTime = this.comment.publishTime instanceof DateTime ? this.comment.publishTime : DateTime.fromISO(this.comment.publishTime);
    return format(this.comment.publishTime.toJSDate(), 'zh_CN');
  }

  ngOnInit() {
  }

}
