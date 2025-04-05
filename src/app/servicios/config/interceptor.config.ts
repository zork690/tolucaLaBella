import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class Interceptor implements HttpInterceptor {

  //token: string;
  //private isFromRefresh: boolean = false;
  //private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private config: AppConfig
    , private authService: AuthService
    , private usuarioService: UsuariosService
  ) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("En interceptor");

    console.log("MI PETICION: ", req);

    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log("ERROR EN RESPONSE: ", error);
        console.log("STATUS: ", error.status);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (!req.url.includes("/login")
            && !req.url.includes("/refresh")) {
            return this.verificarSiRefresh(req, next);
          } else {
            this.authService.logout();
            return throwError(() => error);
          }
        } else {
          if(req.url.includes("/refresh") && error.status === 409){
            this.authService.logout();
          }
          return next.handle(req);
        }
      }));
  }

  private verificarSiRefresh(request: HttpRequest<any>, next: HttpHandler) {
    console.log("REFRESCANDO TOKEN...");

    const refreshT = this.config.getConfig('refresh');

    return this.usuarioService.refresh(refreshT).pipe(
      switchMap((refreshT: any) => {
        localStorage.setItem('token', refreshT.r.accessToken);
        console.log("se setio el token nuevo");
        return next.handle(this.addTokenHeader(request, refreshT.r.accessToken));
      })
    );
  }

  private addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

}