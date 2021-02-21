import { TestBed } from '@angular/core/testing';

import { Mq135Service } from './mq135.service';

describe('Mq135Service', () => {
  let service: Mq135Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mq135Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
