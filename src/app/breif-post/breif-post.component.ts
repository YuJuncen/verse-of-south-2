import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Post } from '../index-view/post';
import { format } from 'timeago.js';

@Component({
  selector: 'app-breif-post',
  templateUrl: './breif-post.component.html',
  styleUrls: ['./breif-post.component.scss']
})
export class BreifPostComponent {
  @Input() post: Post;
  // @ViewChild("PublishTime", {read: ElementRef}) $publishTime : ElementRef;
  constructor() { }

  getPublishTimeago() {
    return format(this.post.publishTime.toJSDate(), 'zh_CN');
  }

}
