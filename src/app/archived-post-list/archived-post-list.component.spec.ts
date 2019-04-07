import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPostListComponent } from './archived-post-list.component';

describe('ArchivedPostListComponent', () => {
  let component: ArchivedPostListComponent;
  let fixture: ComponentFixture<ArchivedPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
