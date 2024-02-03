import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class AppConfig {

  private config: Object = null;
  private env:    Object = null;

  constructor(private http: HttpClient) {
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Content-Encoding': 'gzip, deflate',
      'Accept': '*/*'
     })
  };

  /**http://47.88.87.148/
   * Use to get the data found in the second file (config file)
   */
  public getConfig(key: any) {


    if('apiEndPoint'== key)
     //return 'https://backend.zorktech.com.mx';
     return this.config[key];
  
    if('apiToken'== key)
     return localStorage.getItem("token");
  }

  /**
   * Use to get the data found in the first file (env file)
   */
  public getEnv(key: any) {
    return this.env[key];
  }

  public load() {
    console.log("PROD:" +environment.production);
    return new Promise((resolve, reject) => {
      this.http.get(environment.JSON, this.httpOptions)
      .subscribe((data) => {
        this.config = data;
        console.log("ok:::" +JSON.stringify(data));
        resolve(true);
      },
      (error) => {
        this.config = {};
        //console.log("error:::"+JSON.stringify(error));
        resolve(true);

      });

      });

  }

}