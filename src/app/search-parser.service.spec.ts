import { TestBed } from '@angular/core/testing';

import { SearchParserService } from './search-parser.service';

describe('SearchParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchParserService = TestBed.get(SearchParserService);
    expect(service).toBeTruthy();
  });
});
