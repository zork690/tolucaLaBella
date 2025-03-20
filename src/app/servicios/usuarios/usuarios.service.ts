import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl: string;
  usuarioUrl: string;
  permisoUrl: string;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient
    , private config: AppConfig
  ) {

    this.baseUrl = this.config.getConfig('apiEndPoint');
    this.usuarioUrl = `${this.baseUrl}/${environment.api}`;
    this.permisoUrl = `${this.baseUrl}/${environment.api}`;
  }


  login(usuarioLogin: any): Observable<any> {
    //let url = this.baseUrl+'/usuarios/login';
    let url = this.usuarioUrl + '/usuarios/login';
    return this.http.post(url, usuarioLogin, { headers: this.headers }).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    }));
  }

  refresh(refreshToken: string) {
    //let url = this.baseUrl+'/usuarios/refresh?refreshToken=';
    let url = this.usuarioUrl + '/usuarios/refresh?refreshToken=';
    return this.http.post(url + refreshToken, { headers: this.headers });
  }


}
