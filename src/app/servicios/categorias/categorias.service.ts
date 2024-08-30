import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  baseUrl: string;
  categoriaUrl: string;

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) { 
    this.baseUrl = this.config.getConfig('apiEndPoint');
    this.categoriaUrl = `${this.baseUrl}/${environment.api}`;
  }


  createCategory(data: any): Observable<any>  {
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
  });
    let url = this.categoriaUrl+'/categorias/crearCategoria';
    //let url = this.baseUrl+'/categorias/crearCategoria';
    return this.http.post(url, data, {headers: headers}).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

  getCategorias():Observable<any>{
    let url = this.categoriaUrl+'/categorias/listarCategorias';
    //let url = this.baseUrl+'/categorias/listarCategorias';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

}
