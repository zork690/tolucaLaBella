import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthValidRoleService } from '../auth-valid-role/auth-valid-role.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService
    , private authValidRoleService: AuthValidRoleService
    , private config: AppConfig
  ) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authValidRoleService.hasValidRoles()) {
      return true;
    } else {
      if(!this.config.getConfig('apiToken')){
        console.log("no estaba logueado");
        this.authService.logout();
      }
      return false;
    }
  }

}
