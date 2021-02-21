import { TestBed } from '@angular/core/testing';

import { CoService } from './co.service';

describe('CoService', () => {
  let service: CoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
