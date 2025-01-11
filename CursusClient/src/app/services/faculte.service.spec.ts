import { TestBed } from '@angular/core/testing';

import { FaculteService } from './faculte.service';

describe('FaculteService', () => {
  let service: FaculteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaculteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
