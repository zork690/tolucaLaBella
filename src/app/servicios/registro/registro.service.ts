import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {AppConfig} from '../config/app.config';
import { Observable } from 'rxjs';
import { RegistroDTO } from '../../../app/modelos/registro/registrodto';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  baseUrl:string;
  registroUrl:string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  constructor(private http: HttpClient, private config: AppConfig) {
    this.baseUrl = this.config.getConfig('apiEndPoint');
    this.registroUrl = this.baseUrl + environment.registro;
  }


registrarUsuario(registro:RegistroDTO): Observable<RegistroDTO> 
{
  let url = this.registroUrl + '/usuario';
  return this.http.post<RegistroDTO>(url, registro, this.httpOptions);
}

}
