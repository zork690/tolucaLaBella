import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth/auth.service';
import { Router } from '@angular/router';
import { PanelSociosService } from '../servicios/panel-socios/panel-socios.service';
import { AuthValidRoleService } from '../servicios/auth-valid-role/auth-valid-role.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, AfterViewInit {

  public tokenDecoded: any = {};
  public isAdmin: boolean = false;

  constructor(
    private authService: AuthService
    , private router: Router
    , private panel: PanelSociosService
    , private authValidRole: AuthValidRoleService
  ) {
  }

  ngOnInit(): void {
    try{
      this.tokenDecoded = this.panel.getTokenDecoded();
      this.isAdmin = this.authValidRole.canActivate();
    }catch(error){
      console.log("Error en el panel: ", error);
      this.authService.logout();
    }
  }

  ngAfterViewInit(): void {
    //this.activingLinks();
  }

  public cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);

  }


  private activingLinks(): void {
    let header = document.getElementById("myDIV");
    let btns = header.getElementsByClassName("nav-item");
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }

}
