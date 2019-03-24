import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../index-view/post';

@Component({
  selector: 'app-breif-post',
  templateUrl: './breif-post.component.html',
  styleUrls: ['./breif-post.component.scss']
})
export class BreifPostComponent implements OnInit {
  @Input() post: Post;
  constructor() { }

  ngOnInit() {
  }

  

}
