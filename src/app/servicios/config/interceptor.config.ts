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

  token: string;
  private isFromRefresh: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private config: AppConfig
    , private authService: AuthService
    , private usuarioService: UsuariosService
  ) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.config.getConfig('apiToken');
    if (this.token == null) {
      console.log("MI PETICION: ", req);
      return next.handle(req);
    }

    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.token}`),
    });
    console.log("MI PETICION: ", modifiedReq);
    return next.handle(modifiedReq)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log("ERROR EN RESPONSE: ", error);
        console.log("STATUS: ", error.status);

        return this.verificarSiRefresh(modifiedReq, next);
      }));
  }

  private verificarSiRefresh(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isFromRefresh) {
      this.isFromRefresh = true;
      this.refreshTokenSubject.next(null);

      const refreshT = this.config.getConfig('refresh');

      if (refreshT) {
        return this.usuarioService.refresh(refreshT).pipe(
          switchMap((refreshT: any) => {
            this.isFromRefresh = false;
            localStorage.setItem('token', refreshT.accessToken);
            this.refreshTokenSubject.next(refreshT.accessToken);
            return next.handle(request);
          }),
          catchError((error) => {
            this.isFromRefresh = false;
            this.authService.logout();
            return throwError("ERROR: ", error);
          })
        );
      }

    } else {
      return this.refreshTokenSubject.pipe(filter(refresh => refresh !== null)
        , take(1)
        , switchMap((refresh) => next.handle(request)));
    }
  }

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
];