import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppConfig} from '../config/app.config';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: string;
  clienteUrl: string;

  constructor(private http: HttpClient
    , private config: AppConfig) {
      this.baseUrl = this.config.getConfig('apiEndPoint');
      this.clienteUrl = `${this.baseUrl}/${environment.api}`;
  }

  getConteoClientes(): Observable<any>  {
    let url = this.clienteUrl+'/getConteoClientes';

    return this.http.get(url).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

}
