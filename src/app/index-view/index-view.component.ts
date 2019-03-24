import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Post } from './post';
import { trigger, transition, style, animate } from '@angular/animations';
import { finalize, skip, throttleTime, debounceTime } from 'rxjs/operators';
import { PostService } from '../post.service';
import { Title } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
  styleUrls: [ './index-view.component.md.scss', './index-view.component.scss',],

})
export class IndexViewComponent implements OnInit {
  searchTerms$: Subject<string> = new Subject<string>();

  constructor(private titleService: Title,
              private router: Router) { }

  search(term: string) {
    this.searchTerms$.next(term);
  }

  doSearch(term: string) {
    if (term.length) { this.router.navigate(['search'], {queryParams: {term: term}}) }
    else { this.router.navigate(['/'])}
  }

  ngOnInit() {
    this.titleService.setTitle("南方之诗");
    this.searchTerms$.pipe(
      debounceTime(500),
    ).
    subscribe(e => this.doSearch(e))
  }
  

}
