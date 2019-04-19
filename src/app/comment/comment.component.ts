import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() readonly comment: Comment;
  @Input() readonly reply: Comment;
  @Output() replyRequest = new EventEmitter<Comment>();
  gravatarAPI = "http://www.gravatar.com/avatar";
  get avatarURL() {
    return `${this.gravatarAPI}/${this.comment.publisherEmail}?d=retro`;
  }

  getPublishTimeago() {
    this.comment.publishTime = this.comment.publishTime instanceof DateTime ? 
      this.comment.publishTime : 
      DateTime.fromISO(this.comment.publishTime, { zone: 'utc' });
    return format(this.comment.publishTime.toJSDate(), 'zh_CN');
  }

  requestReply = () => {
    this.replyRequest.emit(this.comment);
  }

  ngOnInit() {
    console.debug(`comment ${this.comment.id} reply to ${this.reply ? this.reply.publisherName : 'void'}.`);
  }

}
