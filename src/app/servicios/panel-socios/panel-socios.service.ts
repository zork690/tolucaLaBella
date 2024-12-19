import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class PanelSociosService {

  private tokenDecoded: any = {};
  private helper: JwtHelperService;

  constructor(
    private config: AppConfig
  ) { 
    this.helper = new JwtHelperService();
  }


  public getTokenDecoded(): any{
    this.tokenDecoded = this.helper.decodeToken(this.config.getConfig('apiToken'));
    console.log("token Decoded: ", this.tokenDecoded);
    return this.tokenDecoded;
  }

}
