import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent implements OnInit {
  commentForm: FormGroup = new FormGroup({
    author: new FormControl(''),
    content: new FormControl(''),
  })
  constructor() { }

  ngOnInit() {
  }

}
