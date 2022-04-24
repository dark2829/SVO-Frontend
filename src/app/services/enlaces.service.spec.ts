import { TestBed } from '@angular/core/testing';

import { EnlacesService } from './enlaces.service';

describe('EnlacesService', () => {
  let service: EnlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
