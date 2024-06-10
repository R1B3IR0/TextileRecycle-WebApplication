import { TestBed } from '@angular/core/testing';

import { DonatorRestService } from './donator-rest.service';

describe('DonatorRestService', () => {
  let service: DonatorRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonatorRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
