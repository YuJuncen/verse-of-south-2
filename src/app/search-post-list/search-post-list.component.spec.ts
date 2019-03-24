import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPostListComponent } from './search-post-list.component';

describe('SearchPostListComponent', () => {
  let component: SearchPostListComponent;
  let fixture: ComponentFixture<SearchPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
