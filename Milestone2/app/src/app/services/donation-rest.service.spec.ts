import { TestBed } from '@angular/core/testing';

import { DonationRestService } from './donation-rest.service';

describe('DonationRestService', () => {
  let service: DonationRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
