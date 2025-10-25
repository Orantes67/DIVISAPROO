import { TestBed } from '@angular/core/testing';

import { FrankfuterService } from '../core/services/frankfuter.service';

describe('FrankfuterService', () => {
  let service: FrankfuterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankfuterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
