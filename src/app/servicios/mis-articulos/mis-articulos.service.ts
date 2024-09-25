import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../config/app.config';
import { AuthGuardService } from '../auth-guard/auth-guard.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MisArticulosService {

  baseUrl: string;
  articuloUrl: string;

  constructor(
    private http: HttpClient
    , private config: AppConfig
    , private authguard:AuthGuardService
  ) {
      this.baseUrl = this.config.getConfig('apiEndPoint');
      this.articuloUrl = `${this.baseUrl}/${environment.api}`;
   }

  createArticle(data: any): Observable<any>  {
    this.authguard.canActivate();
    const headers= new HttpHeaders({
    'Content-Type': 'application/json'
  });
    //let url = this.articuloUrl+'/panel-socios/articulos/insertar';
    let url = this.baseUrl+'/panel-socios/articulos/insertar';
    return this.http.post(url, data, {headers: headers}).pipe(map(loginJson => {
      if (loginJson['s'] === 0) {
        throw new Error(loginJson['m']);
      }
      const result = loginJson["r"]
      return result as any;
    })); 
  }

  getArticulos():Observable<any>{
    this.authguard.canActivate();
    //let url = this.articuloUrl+'/panel-socios/articulos/listar';
    let url = this.baseUrl+'/panel-socios/articulos/listar';
    return this.http.get(url).pipe(map(response => {
      if (response['s'] === 0) {
        throw new Error(response['m']);
      }
      const result = response["r"]
      return result as any;
    })); 
  }

}
