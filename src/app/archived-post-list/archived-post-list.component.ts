import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, flatMap, toArray, tap } from 'rxjs/operators';
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
  
  constructor(private route: ActivatedRoute,
              private service: PostService) { }

  ngOnInit() {
    this.year$ = this.route.params.pipe(map(p => p['year']));
    this.month$ = this.route.params.pipe(map(p => p['month']));
    this.posts$ = this.route.params.pipe(
      flatMap(p => this.service.getArchives(p.month, p.year)),
    );
  }

}
