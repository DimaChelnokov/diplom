import { TestBed } from '@angular/core/testing';

import { AttachsService } from './attachs.service';

describe('AttachsService', () => {
  let service: AttachsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
