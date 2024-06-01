import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppConfig} from '../config/app.config';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  baseUrl: string;
  negocioUrl: string;

  constructor(private http: HttpClient
    , private config: AppConfig) {
      this.baseUrl = this.config.getConfig('apiEndPoint');
      this.negocioUrl = `${this.baseUrl}/${environment.api}`;
  }

  createBusiness(data: any): Observable<any>  {
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
    ,'Authorization': 'Bearer elVal0RQu3MeD3M1R3g@LaD@G@n@'});
    let url = this.negocioUrl+'/negocios/insertarNegocio';
    //let url = this.baseUrl+'/negocios/insertarNegocio';
    return this.http.post(url, data, {headers: headers}).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

  updateBusiness(data: any): Observable<any>  {
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
    ,'Authorization': 'Bearer elVal0RQu3MeD3M1R3g@LaD@G@n@'});
    let url = this.negocioUrl+'/negocios/actualizarNegocio';
    //let url = this.baseUrl+'/negocios/actualizarNegocio';
    return this.http.post(url, data, {headers: headers}).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

  updateImages(data: any): Observable<any>  {
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
    ,'Authorization': 'Bearer elVal0RQu3MeD3M1R3g@LaD@G@n@'});
    let url = this.negocioUrl+'/negocios/actualizarImagenes';
    //let url = this.baseUrl+'/negocios/actualizarNegocio';
    return this.http.post(url, data, {headers: headers}).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

  getNegocios():Observable<any>{
    let url = this.negocioUrl+'/negocios/listarNegocios';
    //let url = this.baseUrl+'/negocios/listarNegocios';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

  getNegociosTodos():Observable<any>{
    let url = this.negocioUrl+'/negocios/listarNegociosTodos';
    //let url = this.baseUrl+'/negocios/listarNegociosTodos';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

  getNegocio(idNegocio:string):Observable<any>{
    let url = this.negocioUrl+'/negocios/listarNegocios/';
    //let url = this.baseUrl+'/negocios/listarNegocios/';
    return this.http.get(url+idNegocio).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

}
