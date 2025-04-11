import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AcessInterceptor implements HttpInterceptor {

    constructor(
        private config: AppConfig
        , private authService: AuthService
    ) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("En access interceptor...");

        const isAuthenticated = this.authService.isAuthenticated();

        if (isAuthenticated) {
            request = this.addTokenHeader(request, this.config.getConfig('apiToken'));
        }

        return next.handle(request);

    }

    private addTokenHeader(req: HttpRequest<any>, token: string) {
        return req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
    }

}