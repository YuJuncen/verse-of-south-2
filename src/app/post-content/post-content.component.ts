import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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
export class PostContentComponent implements OnInit, OnChanges {
  @ViewChild('PostContent', {read: ElementRef}) post: ElementRef;
  @Input() postText: string;
  @Input() postFormatType = FormatType.Markdown;
  @Output() DOMLoaded = new EventEmitter<[]>();
  constructor() { }

  parsedPost: string ;

  ngOnInit() {
    const md = MarkdownIt();
    const result = md.render("" + this.postText);
    this.parsedPost = result;
    setTimeout(this.parseCode, 0);
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  parseCode = () => {
    this.post.nativeElement.querySelectorAll('pre code').forEach(c => {
      highlightBlock(c);
    });
    setTimeout(() => this.DOMLoaded.emit([]), 0);
  }

}
