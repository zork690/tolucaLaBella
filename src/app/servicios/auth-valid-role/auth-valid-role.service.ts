import { Injectable } from '@angular/core';
import { PanelSociosService } from '../panel-socios/panel-socios.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthValidRoleService {

  private roles: any;

  constructor(
    private panelService: PanelSociosService
    , private toastr: ToastrService
  ) {

  }

  public hasValidRoles(): boolean {
    console.log("validating roles ...");
    let isValid: boolean = false;
    this.roles = this.panelService.getRoles(this.panelService.getTokenDecoded());
    if (this.roles.length > 0) {
      if (this.roles.includes("admin") || this.roles.includes("user")) {
        isValid = true;
      }
    } else {
      console.log("Hay un problema con los roles de su usuario, favor de llamar a soporte técnico");
      this.toastr.error("Hay un problema con su usuario, favor de llamar a soporte técnico");
    }
    return isValid;
  }

  public canActivate(): boolean {
    return this.roles.includes("admin");
  }

}
