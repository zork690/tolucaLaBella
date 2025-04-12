import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthValidRoleService } from '../auth-valid-role/auth-valid-role.service';
import { AppConfig } from '../config/app.config';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService
    , private authValidRoleService: AuthValidRoleService
    , private config: AppConfig
    , private location: Location
  ) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authValidRoleService.hasValidRoles()) {
      return true;
    } else {
      if(!this.location.path().includes("panel-socios")){
        this.authService.logout();
      }
      return false;
    }
  }

}
