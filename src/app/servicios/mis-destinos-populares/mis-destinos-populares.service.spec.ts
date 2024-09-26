import { TestBed } from '@angular/core/testing';

import { MisDestinosPopularesService } from './mis-destinos-populares.service';

describe('MisDestinosPopularesService', () => {
  let service: MisDestinosPopularesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisDestinosPopularesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
