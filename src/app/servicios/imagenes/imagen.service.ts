import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppConfig} from '../config/app.config';
import { environment } from '../../../environments/environment';
import { ImagenDTO } from '../../../app/modelos/imagenes/imagendto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  baseUrl: string; 
  imagenUrl: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  constructor(private http: HttpClient, private config: AppConfig) {
    this.baseUrl = this.config.getConfig('apiEndPoint');
    this.imagenUrl =  this.baseUrl+ environment.api+ environment.imagen;
   }


  deleteImagen(imagenes:ImagenDTO[]): Observable<ImagenDTO> 
  {
    let url = this.imagenUrl + '/eliminar';
    return this.http.post<ImagenDTO>(url, imagenes, this.httpOptions);
  }

  saveImagen(imagen: ImagenDTO): Observable<ImagenDTO>
  {
    let url = this.imagenUrl+'/insertar'

    return this.http.post<ImagenDTO>(url, imagen, this.httpOptions);
  }

  updateImagen(imagen: ImagenDTO): Observable<ImagenDTO>
  {
    let url = this.imagenUrl+'/actualizar'
    return this.http.post<ImagenDTO>(url, imagen, this.httpOptions);
  }

  getImagenes(): Observable<any> {
    let url = this.imagenUrl+'/getImagenes';

    return this.http.get(url).pipe(map(responsedata => {
      if (responsedata['s'] === 0) {
        throw new Error(responsedata['m']);
      }
      const result = responsedata["r"];
      return result as ImagenDTO[];
    }));
  }

    getImagenesTodas(): Observable<any> {
    let url = this.imagenUrl+'/getImagenesTodas';

    return this.http.get(url).pipe(map(responsedata => {
      if (responsedata['s'] === 0) {
        throw new Error(responsedata['m']);
      }
      const result = responsedata["r"];
      return result as any[];
    }));
  }


}
