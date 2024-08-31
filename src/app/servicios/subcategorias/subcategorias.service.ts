import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriasService {

  baseUrl: string;
  subCategoriaUrl: string;

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) { 
    this.baseUrl = this.config.getConfig('apiEndPoint');
    this.subCategoriaUrl = `${this.baseUrl}/${environment.api}`;
  }

  createSubCategory(data: any): Observable<any>  {
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
  });
    let url = this.subCategoriaUrl+'/subcategorias/crear';
    //let url = this.baseUrl+'/subcategorias/crear';
    return this.http.post(url, data, {headers: headers}).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

  getSubCategorias():Observable<any>{
    let url = this.subCategoriaUrl+'/subcategorias/listar';
    //let url = this.baseUrl+'/subcategorias/listar';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

}
