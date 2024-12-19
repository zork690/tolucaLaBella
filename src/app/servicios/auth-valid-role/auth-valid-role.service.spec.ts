import { TestBed } from '@angular/core/testing';

import { AuthValidRoleService } from './auth-valid-role.service';

describe('AuthValidRoleService', () => {
  let service: AuthValidRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthValidRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
