import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment-section/comment';
import { format } from 'timeago.js';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor() { }
  @Input() comment: Comment;

  getPublishTimeago() {
    return format(this.comment.publishTime.toJSDate(), 'zh_CN');
  }

  ngOnInit() {
  }

}
