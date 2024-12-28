import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AuthValidRoleService } from '../auth-valid-role/auth-valid-role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService
    , private router: Router
    , private authValidRoleService : AuthValidRoleService
  ) { }

  canActivate(): boolean {
    if(this.router.url === "/registrate"){
      console.log(this.router.url);
      return true;
    }
    if (this.authService.isAuthenticated() && this.authValidRoleService.hasValidRoles()) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }

}
