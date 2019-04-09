import { Component, OnInit, Input } from '@angular/core';
import {Comment} from './comment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input('comments') comments$: Observable<Comment[]>;
  constructor() { 
  }

  ngOnInit() {
  }

}
