import { TestBed } from '@angular/core/testing';

import { CapStoneService } from './cap-stone.service';

describe('CapStoneService', () => {
  let service: CapStoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapStoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
