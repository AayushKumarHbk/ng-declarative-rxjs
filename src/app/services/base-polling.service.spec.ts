import { TestBed } from '@angular/core/testing';

import { BasePollingService } from './base-polling.service';

describe('BasePollingService', () => {
  let service: BasePollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasePollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
