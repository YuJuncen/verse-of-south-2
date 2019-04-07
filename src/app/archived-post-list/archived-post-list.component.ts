import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-archived-post-list',
  templateUrl: './archived-post-list.component.html',
  styleUrls: ['./archived-post-list.component.scss']
})
export class ArchivedPostListComponent implements OnInit {

  year$: Observable<number>
  month$: Observable<number>
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.year$ = this.route.params.pipe(map(p => p['year']));
    this.month$ = this.route.params.pipe(map(p => p['month']));
  }

}
