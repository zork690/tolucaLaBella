import { TestBed } from '@angular/core/testing';

import { AuthSecureService } from './auth-secure.service';

describe('AuthSecureService', () => {
  let service: AuthSecureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSecureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
