import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient
    , private config: AppConfig
  ) {

    this.baseUrl = this.config.getConfig('apiEndPoint');
    this.usuarioUrl = this.baseUrl + environment.api+ environment.usuario;
    this.permisoUrl = this.baseUrl + environment.api+ environment.permiso;
   }


  login(usuarioLogin: any): Observable<any>  {
    let url = this.usuarioUrl+'/validarUsuario';

    return this.http.post(url, usuarioLogin).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

}
