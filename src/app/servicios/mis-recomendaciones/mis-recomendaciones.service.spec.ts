import { TestBed } from '@angular/core/testing';

import { MisRecomendacionesService } from './mis-recomendaciones.service';

describe('MisRecomendacionesService', () => {
  let service: MisRecomendacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisRecomendacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
