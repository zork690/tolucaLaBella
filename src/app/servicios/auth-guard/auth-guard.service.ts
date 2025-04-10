import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthValidRoleService } from '../auth-valid-role/auth-valid-role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService
    , private authValidRoleService: AuthValidRoleService
  ) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authValidRoleService.hasValidRoles()) {
      return true;
    } else {
      this.authService.logout();
      return false;
    }
  }

}
