import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';
import { RegistroDTO } from '../../../app/modelos/registro/registrodto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  baseUrl: string;
  registroUrl: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  constructor(private http: HttpClient, private config: AppConfig) {
    this.baseUrl = this.config.getConfig('apiEndPoint');
    this.registroUrl = `${this.baseUrl}/${environment.api}`;
  }


  registrarUsuario(registro: RegistroDTO): Observable<RegistroDTO> {
    let url = this.baseUrl + "/usuarios/registrar";
    //let url = this.registroUrl + "/usuarios/registrar";
    return this.http.post(url, registro, this.httpOptions).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    }));
  }

  sendEmailVerification(email:string): Observable<RegistroDTO> {
    let url = this.baseUrl + "/usuarios/enviarEmailConfirmacion/";
    //let url = this.registroUrl + "/usuarios/registrar";
    return this.http.get(url + email).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    }));
  }

}
