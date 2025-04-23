import { TestBed } from '@angular/core/testing';

import { WekaService } from './weka.service';

describe('WekaService', () => {
  let service: WekaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WekaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
