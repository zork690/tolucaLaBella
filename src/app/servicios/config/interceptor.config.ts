import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConfig} from '../config/app.config';
import { AuthGuardService } from '../auth-guard/auth-guard.service';

@Injectable({
    providedIn: 'root'
})

export class Interceptor implements HttpInterceptor{

	token:string;

	constructor( 
		private config: AppConfig
    , private authGuard: AuthGuardService
	) {
      }


 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  this.authGuard.canActivate();
 	this.token = this.config.getConfig('apiToken');
 	if (this.token == null) {
 	  console.log("MI PETICION: ",req);
      return next.handle(req);
    }

    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `Bearer ${this.token}`),
    });
    console.log("MI PETICION: ",modifiedReq);
    return next.handle(modifiedReq);
  }
}