import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreifPostComponent } from './breif-post.component';

describe('BreifPostComponent', () => {
  let component: BreifPostComponent;
  let fixture: ComponentFixture<BreifPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreifPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreifPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
