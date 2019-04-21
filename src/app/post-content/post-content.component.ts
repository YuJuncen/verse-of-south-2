import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import {highlightBlock} from 'highlight.js';
import MOCK_POST from '../post-detail/mock-post';
import { FormatType } from '../post-detail/detailed-post';


@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss', './foundation-theme.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostContentComponent implements OnInit, AfterViewInit {
  @ViewChild('PostContent', {read: ElementRef}) post: ElementRef;
  @Input() postText: string;
  @Input() postFormatType: FormatType;
  @Output() DOMLoaded = new EventEmitter<[]>();
  constructor() { }

  parsedPost: string ;

  ngOnInit() {
    const md = MarkdownIt();
    const result = md.render(this.postText);
    this.parsedPost = result;
  }

  ngAfterViewInit(): void {
    this.post.nativeElement.querySelectorAll('pre code').forEach(c => {
      highlightBlock(c);
    });
    setTimeout(() => this.DOMLoaded.emit([]), 0);
  }

}
