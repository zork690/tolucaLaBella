import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MisNoticiasService {

  baseUrl: string;
  articuloUrl: string;

  constructor(
    private http: HttpClient
    , private config: AppConfig
  ) {
    this.baseUrl = this.config.getConfig('apiEndPoint');
    this.articuloUrl = `${this.baseUrl}/${environment.api}`;
  }


  getArticulosNoticias(): Observable<any> {
    let url = this.articuloUrl + '/noticias/articulos/listar';
    //let url = this.baseUrl+'/noticias/articulos/listar';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    }));
  }

  getSeccionesNoticia(noticia:string):Observable<any>{
    let url = this.articuloUrl+'/noticias/articulos/';
    //let url = this.baseUrl+'/noticias/articulos/';
    return this.http.get(url+noticia).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

}
