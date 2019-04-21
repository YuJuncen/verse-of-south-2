import { Component, OnInit, Input } from '@angular/core';

export interface ArchiveInfo {
  year: number;
  month: number;
  count: number;
}

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.scss']
})
export class ArchiveListComponent implements OnInit {

  @Input() archives: Array<ArchiveInfo>;
  constructor() { }

  ngOnInit() {
  }

}
