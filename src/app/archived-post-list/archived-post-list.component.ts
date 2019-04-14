import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, merge } from 'rxjs';
import { map, switchMap, finalize, tap, concat, mapTo, share, refCount, publishReplay } from 'rxjs/operators';
import { PostService } from '../post.service';
import { Post } from '../index-view/post';

@Component({
  selector: 'app-archived-post-list',
  templateUrl: './archived-post-list.component.html',
  styleUrls: ['./archived-post-list.component.scss']
})
export class ArchivedPostListComponent implements OnInit {

  year$: Observable<number>;
  month$: Observable<number>;
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  
  constructor(private route: ActivatedRoute,
              private service: PostService) { }

  ngOnInit() {
    this.year$ = this.route.params.pipe(map(p => p['year']));
    this.month$ = this.route.params.pipe(map(p => p['month']));
    this.posts$ = this.route.params.pipe(
      switchMap(p => this.service.getArchives(p.month, p.year)),
      publishReplay(1),
      refCount()
    );
    this.loading$ = merge(
      this.posts$.pipe(mapTo(false)),
      this.route.params.pipe(mapTo(true)),
    )
  }

}
