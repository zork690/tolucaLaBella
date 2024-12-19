import { TestBed } from '@angular/core/testing';

import { PanelSociosService } from './panel-socios.service';

describe('PanelSociosService', () => {
  let service: PanelSociosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelSociosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
