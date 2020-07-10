import { TestBed } from '@angular/core/testing';

import { TegramDataHandlerService } from './tegram-data-handler.service';

describe('TegramDataHandlerService', () => {
  let service: TegramDataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TegramDataHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
