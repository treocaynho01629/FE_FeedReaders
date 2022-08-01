import { TestBed } from '@angular/core/testing';

import { NewsParseAPIService } from './newsparseapi.service';

describe('NewsParseAPIService', () => {
  let service: NewsParseAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsParseAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
