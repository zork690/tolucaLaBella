import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppConfig} from '../config/app.config';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthGuardService } from '../auth-guard/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  baseUrl: string;
  negocioUrl: string;

  constructor(private http: HttpClient
    , private config: AppConfig
    , private authguard:AuthGuardService
  ) {
      this.baseUrl = this.config.getConfig('apiEndPoint');
      this.negocioUrl = `${this.baseUrl}/${environment.api}`;
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

  getNegociosBySubCategoria(subcategoria:string):Observable<any>{
    let url = this.negocioUrl+'/negocios/listar/';
    //let url = this.baseUrl+'/negocios/listar/';
    return this.http.get(url+subcategoria).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
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

  getNegociosFavoritos():Observable<any>{
    let url = this.negocioUrl+'/negocios/listarNegociosFavoritos';
    //let url = this.baseUrl+'/negocios/listarNegociosFavoritos';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

  getNegociosNuevos():Observable<any>{
    let url = this.negocioUrl+'/negocios/listarNegociosNuevos';
    //let url = this.baseUrl+'/negocios/listarNegociosNuevos';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

  getNegociosRelacionados(categoria:string):Observable<any>{
    let url = this.negocioUrl+'/negocios/listarNegociosRelacionados/';
    //let url = this.baseUrl+'/negocios/listarNegociosRelacionados/';
    return this.http.get(url+categoria).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

  createBusiness(data: any): Observable<any>  {
    this.authguard.canActivate();
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
  });
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
    this.authguard.canActivate();
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
    });
    let url = this.negocioUrl+'/panel-socios/negocios/actualizarNegocio';
    //let url = this.baseUrl+'/negocios/actualizarNegocio';
    return this.http.post(url, data, {headers: headers}).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

  createBusinessUserLogged(data: any): Observable<any>  {
    this.authguard.canActivate();
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
    });
    let url = this.negocioUrl+'/panel-socios/negocios/createNegocioUserLogged';
    //let url = this.baseUrl+'/negocios/createNegocioUserLogged';
    return this.http.post(url, data, {headers: headers}).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

  updateImages(data: any): Observable<any>  {
    this.authguard.canActivate();
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
    });
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

  getNegociosTodos():Observable<any>{
    this.authguard.canActivate();
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

  getNegociosByUser():Observable<any>{
    this.authguard.canActivate();
    let url = this.negocioUrl+'/panel-socios/listarNegocios';
    //let url = this.baseUrl+'/panel-socios/listarNegocios';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

}
