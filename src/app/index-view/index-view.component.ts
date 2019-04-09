import { Component, OnInit } from '@angular/core';
import { debounceTime, map, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  doSearch(term: string) {
    if (term.length) { this.router.navigate(['search'], {queryParams: this.parser.parse(term.trim())}) }
    else { this.router.navigate(['/'])}
  }

  ngOnInit() {
    this.params$ = this.arouter.queryParams.pipe(map(url => url['term'] || ""));
    this.archives$ = this.postService.getArchiveInfo();
    this.titleService.setTitle("南方之诗");
    this.searchTerm.valueChanges.pipe(
      debounceTime(500),
    ).
    subscribe(e => this.doSearch(e))
  }
  

}
