import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment-section/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor() { }
  @Input() comment: Comment;

  ngOnInit() {
  }

}
