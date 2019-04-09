import { TestBed } from '@angular/core/testing';

import { PostReadService } from './post-read.service';

describe('PostReadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostReadService = TestBed.get(PostReadService);
    expect(service).toBeTruthy();
  });
});
