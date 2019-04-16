import { TestBed } from '@angular/core/testing';

import { ApplicationContextService } from './application-context.service';

describe('ApplicationContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationContextService = TestBed.get(ApplicationContextService);
    expect(service).toBeTruthy();
  });
});
