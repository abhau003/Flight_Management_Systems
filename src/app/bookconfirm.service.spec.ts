import { TestBed } from '@angular/core/testing';

import { BookconfirmService } from './bookconfirm.service';

describe('BookconfirmService', () => {
  let service: BookconfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookconfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
