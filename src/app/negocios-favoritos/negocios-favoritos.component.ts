import { Component, OnInit } from '@angular/core';
import { negociosInfo } from '../../assets/mockDemoNegociosInfo';
import { NegociosService } from '../servicios/negocios/negocios.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-negocios-favoritos',
  templateUrl: './negocios-favoritos.component.html',
  styleUrls: ['./negocios-favoritos.component.css']
})
export class NegociosFavoritosComponent implements OnInit {

  //negociosInfo: any = negociosInfo;
  negociosInfo:any;

  constructor(
    private SpinnerServices: NgxSpinnerService
    , private negocioService: NegociosService
  ) { }

  ngOnInit(): void {
    this.fetchNegociosFavoritos();
  }

  // PARA PROBAR EN EL BACK
  private fetchNegociosFavoritos() {
    this.SpinnerServices.show("spinnerFavoritos");
    this.negocioService.getNegociosFavoritos().subscribe((result) => {
      console.log("Negocios favoritos list: ", result);
      this.negociosInfo = result;
      this.SpinnerServices.hide("spinnerFavoritos");
    }, (error) => {
      console.log("Ocurrió un error obteniendo los negocios favoritos: ", error);
    });
  }

  // PARA PROBAR EN LOCAL
  /*private fetchNegociosFavoritos() {
    this.SpinnerServices.show("spinnerFavoritos");
    setTimeout(() => {
      this.SpinnerServices.hide("spinnerFavoritos");
    }, 5000);
  }*/

}
