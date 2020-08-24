import { TestBed } from '@angular/core/testing';

import { BookingdetailsretrievalService } from './bookingdetailsretrieval.service';

describe('BookingdetailsretrievalService', () => {
  let service: BookingdetailsretrievalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingdetailsretrievalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
