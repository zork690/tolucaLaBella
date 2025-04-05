import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConfig } from '../config/app.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private config: AppConfig
    , private router: Router
  ) { }

  //STORE SESSION TOKEN AT LOCAL STORAGE IS THE BEST PRACTICE RATHER THAN COOKIES

  isAuthenticated(): boolean {
    if(this.config.getConfig('apiToken') === null){
      return false;
    }
    return !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(this.config.getConfig('apiToken'));
    return isExpired;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigateByUrl("/login");
  }

}
