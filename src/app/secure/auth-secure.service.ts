import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../servicios/auth/auth.service';

@Injectable()
export class AuthSecureService implements CanActivate {

  constructor(
  private authService: AuthService,
  private router: Router
    ) { }


// SET ROUTE GUARDS IS A GOOD PRACTICE CONTROLLING THE URLS THAT COULD BE ALLOWED WITHIN CERTAINS CONDITIONS

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.authService.isAuthenticated()) {
        return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
