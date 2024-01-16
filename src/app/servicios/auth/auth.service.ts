import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //STORE SESSION TOKEN AT LOCAL STORAGE IS THE BEST PRACTICE RATHER THAN COOKIES

  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return false;
  }

}
