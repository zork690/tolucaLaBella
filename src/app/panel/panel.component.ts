import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConfig } from '../servicios/config/app.config';
import { AuthService } from '../servicios/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, AfterViewInit  {

  public tokenDecoded: any = {};
  private helper: JwtHelperService;

  constructor(
    private config: AppConfig
    , private authService: AuthService
    , private router: Router
  ) {
    this.helper = new JwtHelperService();
   }

  ngOnInit(): void {
    this.getTokenDecoded();
  }

  ngAfterViewInit(): void{
    this.activingLinks();    
  }

  public cerrarSesion(){
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

  private getTokenDecoded(){
    this.tokenDecoded = this.helper.decodeToken(this.config.getConfig('apiToken'));
    console.log("token Decoded: ", this.tokenDecoded);
  }

}
