import {
  AfterViewInit, Component, ElementRef, OnInit, Renderer2
  , HostListener
} from '@angular/core';
import { NegociosService } from '../servicios/negocios/negocios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConfig } from '../servicios/config/app.config';

@Component({
  selector: 'app-negocios-nuevos',
  templateUrl: './negocios-nuevos.component.html',
  styleUrls: ['./negocios-nuevos.component.css']
})
export class NegociosNuevosComponent implements OnInit, AfterViewInit {

  public getScreenWidth: any;
  public getScreenHeight: any;
  public negociosNuevos: any;

  public chunks: Array<any>;
  private imagesByRow: number;

  public imagenesBasePath: string;
  public apiEndPoint: string;

  constructor(
    private renderer: Renderer2
    , private elem: ElementRef
    , private SpinnerServices: NgxSpinnerService
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
    this.getNegociosNuevos();
  }

  ngAfterViewInit(): void {
    
  }

  public gettingWithOfImage(chunks: any): any {
    //let width = (chunks.length * 100) / this.imagesByRow;
    let width = 100;
    return {
      "max-width": `${width}%`
    };
  }

  private getChunks(): Array<any> {
    if (this.negociosNuevos) {
      let numberOfImagesByRow = this.imagesByRow;
      let numberOfNewNegocios = this.negociosNuevos.length;
      let numberOfTotalRows = Math.ceil(numberOfNewNegocios / numberOfImagesByRow);
      let chunks = Array.from({ length: numberOfTotalRows }, (_, i) => this.negociosNuevos.slice(i * numberOfImagesByRow, (i + 1) * numberOfImagesByRow));
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


  // PARA PROBAR EN EL BACK
  private getNegociosNuevos(): void {
    this.SpinnerServices.show("spinnerNuevos");
    this.negocioService.getNegociosNuevos().subscribe((result) => {
      console.log("Negocios nuevos list: ", result);
      this.negociosNuevos = result;
      this.SpinnerServices.hide("spinnerNuevos");
      this.settingChunks();
    }, (error) => {
      console.log("Ocurrió un error obteniendo los negocios nuevos: ", error);
    });
  }

  // PARA PROBAR EN LOCAL
  /*private getNegociosNuevos(): void {
    this.SpinnerServices.show("spinnerNuevos");
    this.negociosNuevos = {
      negocios: [
        {
          nombre: "Negocio 1",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg"
        },
        {
          nombre: "Negocio 2",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg"
        },
        {
          nombre: "Negocio 3",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg"
        },
        {
          nombre: "Negocio 4",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg"
        },
        {
          nombre: "Negocio 5",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg"
        },
        {
          nombre: "Negocio 6",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg"
        },
        {
          nombre: "Negocio 7",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg"
        },
        {
          nombre: "Negocio 8",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg"
        },
        {
          nombre: "Negocio 9",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg"
        },
        {
          nombre: "Negocio 10",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg"
        }
      ]
    };
    this.settingChunks();
    setTimeout(() => {
      this.SpinnerServices.hide("spinnerNuevos");
    }, 5000);
  }*/

}
