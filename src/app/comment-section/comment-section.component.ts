import { Component, OnInit } from '@angular/core';
import MockComments from './mock-comments';
import {Comment} from './comment';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  comments: Comment[];
  constructor() { 
  }

  ngOnInit() {
    this.comments = MockComments;
  }

}
