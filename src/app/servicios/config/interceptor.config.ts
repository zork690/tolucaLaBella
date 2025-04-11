import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class Interceptor implements HttpInterceptor {

  constructor(
    private config: AppConfig
    , private authService: AuthService
    , private usuarioService: UsuariosService
  ) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("En interceptor...");

    return next.handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log("ERROR EN RESPONSE: ", error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (!request.url.includes("/login")
            && !request.url.includes("/refresh")) {
            return this.verificarSiRefresh(request, next);
          } else {
            this.authService.logout();
          }
        } else {
          if (request.url.includes("/refresh") && error.status === 409) {
            this.authService.logout();
          }
          return next.handle(request);
        }
      }));

  }

  private verificarSiRefresh(request: HttpRequest<any>, next: HttpHandler) {
    console.log("REFRESCANDO TOKEN...");

    const refreshT = this.config.getConfig('refresh');

    return this.usuarioService.refresh(refreshT).pipe(
      switchMap((refreshT: any) => {
        localStorage.setItem('token', refreshT.r.accessToken);
        localStorage.setItem('refreshToken', refreshT.r.refreshToken);
        console.log("se setio el token y el refresh nuevo");
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