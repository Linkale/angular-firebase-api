import { TestBed } from '@angular/core/testing';

import { PandascoreService } from './pandascore.service';

describe('PandascoreService', () => {
  let service: PandascoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PandascoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
