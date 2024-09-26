import { TestBed } from '@angular/core/testing';

import { MisNoticiasService } from './mis-noticias.service';

describe('MisNoticiasService', () => {
  let service: MisNoticiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisNoticiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
