import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPostListComponent } from './index-post-list.component';

describe('IndexPostListComponent', () => {
  let component: IndexPostListComponent;
  let fixture: ComponentFixture<IndexPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
