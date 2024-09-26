import { TestBed } from '@angular/core/testing';

import { MisHistoriasDeExitoService } from './mis-historias-de-exito.service';

describe('MisHistoriasDeExitoService', () => {
  let service: MisHistoriasDeExitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisHistoriasDeExitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
