import { Component, HostListener, OnInit } from '@angular/core';
import { negociosInfo } from '../../assets/mockDemoNegociosInfo';
import { NegociosService } from '../servicios/negocios/negocios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConfig } from '../servicios/config/app.config';

@Component({
  selector: 'app-negocios-favoritos',
  templateUrl: './negocios-favoritos.component.html',
  styleUrls: ['./negocios-favoritos.component.css']
})
export class NegociosFavoritosComponent implements OnInit {

  //negociosInfo: any = negociosInfo;
  negociosInfo: any;
  imagenesBasePath: string;
  apiEndPoint: string;

  public getScreenWidth: any;
  public getScreenHeight: any;

  public chunks: Array<any>;
  private imagesByRow: number;

  constructor(
    private SpinnerServices: NgxSpinnerService
    , private negocioService: NegociosService
    , private config: AppConfig
  ) {
    //this.apiEndPoint = this.config.getConfig('apiEndPoint');
    this.apiEndPoint = "https://backend.zorktech.com.mx";
    this.imagenesBasePath = this.config.getConfig('pathImages');
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.settingChunks();
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.fetchNegociosFavoritos();
  }

  public gettingWithOfImage(chunks: any): any {
    //let width = (chunks.length * 100) / this.imagesByRow;
    let width = 100;
    return {
      "max-width": `${width}%`
    };
  }

  // PARA PROBAR EN EL BACK
  private fetchNegociosFavoritos() {
    this.SpinnerServices.show("spinnerFavoritos");
    this.negocioService.getNegociosFavoritos().subscribe((result) => {
      console.log("Negocios favoritos list: ", result);
      this.negociosInfo = result;
      this.SpinnerServices.hide("spinnerFavoritos");
      this.settingChunks();
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

  private getChunks(): Array<any> {
    if (this.negociosInfo) {
      let numberOfImagesByRow = this.imagesByRow;
      let numberOfNewNegocios = this.negociosInfo.length;
      let numberOfTotalRows = Math.ceil(numberOfNewNegocios / numberOfImagesByRow);
      let chunks = Array.from({ length: numberOfTotalRows }, (_, i) => this.negociosInfo.slice(i * numberOfImagesByRow, (i + 1) * numberOfImagesByRow));
      return chunks;
    } else {
      return undefined;
    }
  }

  private settingChunks(): void {
    if (this.getScreenWidth > 575) {
      this.imagesByRow = 4;
      this.chunks = this.getChunks();
    } else {
      this.imagesByRow = 1;
      this.chunks = this.getChunks();
    }
  }

}
