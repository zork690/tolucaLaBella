import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AuthGuardService } from '../auth-guard/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class MisNoticiasService {

  baseUrl: string;
  noticiaUrl: string;

  constructor(
    private http: HttpClient
    , private config: AppConfig
    , private authguard:AuthGuardService
  ) {
    this.baseUrl = this.config.getConfig('apiEndPoint');
    this.noticiaUrl = `${this.baseUrl}/${environment.api}`;
  }

  createNoticia(data: any): Observable<any>  {
    this.authguard.canActivate();
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
  });
    let url = this.noticiaUrl+'/panel-socios/noticias/crear';
    //let url = this.baseUrl+'/panel-socios/noticias/crear';
    return this.http.post(url, data, {headers: headers}).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

  createNoticiaSeccion(data: any): Observable<any>  {
    this.authguard.canActivate();
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
  });
    let url = this.noticiaUrl+'/noticias/articulos/secciones/crear';
    //let url = this.baseUrl+'/noticias/articulos/secciones/crear';
    return this.http.post(url, data, {headers: headers}).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }


  getNoticias(): Observable<any> {
    //let url = this.noticiaUrl + '/noticias/listar';
    let url = this.baseUrl+'/noticias/listar';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    }));
  }

  getSeccionesNoticiaByNoticia(noticia:string):Observable<any>{
    let url = this.noticiaUrl+'/noticias/articulos/secciones/listar';
    //let url = this.baseUrl+'/noticias/articulos/secciones/listar';
    return this.http.get(url+noticia).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

  getSeccionesNoticia():Observable<any>{
    let url = this.noticiaUrl+'/noticias/articulos/secciones/listar';
    //let url = this.baseUrl+'/noticias/articulos/secciones/listar';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

}
