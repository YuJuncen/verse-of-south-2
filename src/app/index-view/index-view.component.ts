import { Component, OnInit } from '@angular/core';
import { debounceTime, map, tap, filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SearchParserService } from '../search-parser.service';
import { ArchiveInfo } from '../archive-list/archive-list.component';
import { PostService } from '../post.service';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
  styleUrls: [ './index-view.component.md.scss', './index-view.component.scss',],

})
export class IndexViewComponent implements OnInit {
  searchTerm: FormControl = new FormControl('');
  params$: Observable<Params>;
  archives$: Observable<ArchiveInfo[]>

  constructor(private titleService: Title,
              private router: Router,
              private arouter: ActivatedRoute,
              private parser: SearchParserService,
              private postService: PostService)
               { }

  splitIfNeeded = (splitBy: string | RegExp) => (i: any) => {
      if (typeof(i) === 'string') {
        return (i as string).split(splitBy);
      }
      return i;
  }

  joinUrlterms(url: Params) {
    let tags = url['tag'] || [];
    let terms = url['plain'] || [];
    let splited = this.splitIfNeeded(',');
    return `${splited(tags).map(t => `#{${t}}`).join(' ')} ${splited(terms).join(' ')}`.trim()
  }

  doSearch(term: string, skipLocationChange = false) {
    if (term.length) { this.router.navigate(['search'], {queryParams: this.parser.parse(term.trim()), skipLocationChange}) }
    else { 
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.params$ = this.arouter.queryParams;
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(_ => this.searchTerm.markAsPristine())
    this.params$.pipe(map(url => this.joinUrlterms(url))).subscribe(s => {
      if (this.searchTerm.pristine)
        this.searchTerm.setValue(s, {emitEvent: false})
    })
    this.archives$ = this.postService.getArchiveInfo();
    this.titleService.setTitle("南方之诗");
    this.searchTerm.valueChanges.pipe(
      debounceTime(500),
    ).
    subscribe(e => this.doSearch(e))
  }
  

}
