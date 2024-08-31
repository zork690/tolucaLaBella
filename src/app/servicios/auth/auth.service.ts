import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //STORE SESSION TOKEN AT LOCAL STORAGE IS THE BEST PRACTICE RATHER THAN COOKIES

  isAuthenticated(): boolean {
    if(this.isTokenExpired()) this.logout();
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(localStorage.getItem('token'));
    console.log("is Expired: ", isExpired);
    return isExpired;
  }

  logout() {
    localStorage.removeItem('token');
  }

}
