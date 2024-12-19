import { Injectable } from '@angular/core';
import { PanelSociosService } from '../panel-socios/panel-socios.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthValidRoleService {

  constructor(
    private panelService: PanelSociosService
    , private toastr: ToastrService
  ) { }

  canActivate(): boolean {
    console.log("validating roles ...");
    let isValid: boolean = false;
    let roles = this.panelService.getRoles(this.panelService.getTokenDecoded());
    if (roles.length > 0) {
      if (roles.includes("admin") || roles.includes("user")) {
        console.log("Es admin, user o ambos");
        isValid = true;
      }
    } else {
      console.log("Hay un problema con los roles de su usuario, favor de llamar a soporte técnico");
      this.toastr.error("Hay un problema con los roles de su usuario, favor de llamar a soporte técnico")
    }
    return isValid;
  }

}
