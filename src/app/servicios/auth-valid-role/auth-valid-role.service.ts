import { Injectable } from '@angular/core';
import { PanelSociosService } from '../panel-socios/panel-socios.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthValidRoleService {

  constructor(
    private panelService: PanelSociosService
    , private router: Router
  ) { }

  canActivate(): boolean {
    console.log("validating roles ...");
    let roles = this.panelService.getRoles(this.panelService.getTokenDecoded());
    if (roles.length > 0) {
      return true;
    } else {
      this.router.navigate(['/panel-socios/mis-negocios']);
      return false;
    }
  }
  
}
