import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NegociosService } from '../servicios/negocios/negocios.service';
import { AppConfig } from '../../app/servicios/config/app.config';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detalle-socios-comerciales',
  templateUrl: './detalle-socios-comerciales.component.html',
  styleUrls: ['./detalle-socios-comerciales.component.css']
})
export class DetalleSociosComercialesComponent implements OnInit, AfterViewInit {

  idNegocio: string;
  negocioObj: any;
  imagenesBasePath: string;
  apiEndPoint: string;
  categoria: string;
  subcategoria: string;

  public getScreenWidth: any;
  public getScreenHeight: any;

  public chunks: Array<any>;
  private imagesByRow: number;

  constructor(
    private route: ActivatedRoute
    , private negocioService: NegociosService
    , private config: AppConfig
    , private renderer: Renderer2
    , private elem: ElementRef
    , private SpinnerServices: NgxSpinnerService
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
    this.categoria = this.route.snapshot.paramMap.get('categoria');
    this.subcategoria = this.route.snapshot.paramMap.get('subcategoria');
    this.idNegocio = this.route.snapshot.paramMap.get('negocio');
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getDetails();
  }

  ngAfterViewInit(): void {
    if (this.chunks) {
      const items = this.elem.nativeElement.querySelectorAll(".carousel-item");
      this.renderer.addClass(items[0], "active");
    }
    let top = document.getElementById('seccion1');
    if (top !== null) {
      top.scrollIntoView({ block: 'end',  behavior: 'smooth' });
      top = null;
    }
  }

  public gettingWithOfImage(chunks: any): any {
    let width = (chunks.length * 100) / this.imagesByRow;
    return {
      "max-width": `${width}%`
    };
  }

  private getChunks(): Array<any> {
    if (this.negocioObj) {
      let numberOfImagesByRow = this.imagesByRow;
      let numberOfNewNegocios = this.negocioObj.imagenes.length;
      let numberOfTotalRows = Math.ceil(numberOfNewNegocios / numberOfImagesByRow);
      let chunks = Array.from({ length: numberOfTotalRows }, (_, i) => this.negocioObj.imagenes.slice(i * numberOfImagesByRow, (i + 1) * numberOfImagesByRow));
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

  // PRUEBAS EN EL BACK
  private getDetails():void{
  this.SpinnerServices.show("spinnerDetalleNegocio");
    this.negocioService.getNegocio(this.idNegocio).subscribe((result)=>{
      console.log("Negocio: ",result);
      this.negocioObj = result;
      this.SpinnerServices.hide("spinnerDetalleNegocio");
      this.settingChunks();
    }
    , (error)=>{
      this.SpinnerServices.hide("spinnerDetalleNegocio");
      console.log("Ocurrio un error obteniendo el detalle del negocio: ",error);
    });
  }

  //PARA PRUEBAS EN LOCAL
  /*private getDetails(): void {
    console.log("Getting negocio: ", this.idNegocio);
    this.SpinnerServices.show("spinnerDetalleNegocio");
    this.negocioObj = {
      "id": 1,
      "idNegocio": "1714097862223",
      "nombre": "césar alberto soto reyes",
      "telefono": "7224304100",
      "email": "zork_690@hotmail.com",
      "ubicacion": {
        "id": 577,
        "colonia": "SAN LORENZO TEPALTITLAN",
        "municipio": "TOLUCA",
        "codigoPostal": 50010
      },
      "descripcion": "Compañia especializada en tecnología de la información",
      "calle": "5 de mayo",
      "categoria": "pendiente de categorizar",
      "nombrEmpresa": "ZORKTECH",
      "numeroExterior": "53",
      "valid": true,
      "imagenes": [
        {
          "id": 2,
          "nombre": "WhatsApp Image 2023-08-13 at 10.39.35 PM (1).jpeg",
          "idNegocio": "1714097862223",
          "valid": false
        },
        {
          "id": 2,
          "nombre": "WhatsApp Image 2023-08-13 at 10.39.35 PM (1).jpeg",
          "idNegocio": "1714097862223",
          "valid": false
        },
        {
          "id": 2,
          "nombre": "WhatsApp Image 2023-08-13 at 10.39.35 PM (1).jpeg",
          "idNegocio": "1714097862223",
          "valid": false
        },
        {
          "id": 2,
          "nombre": "WhatsApp Image 2023-08-13 at 10.39.35 PM (1).jpeg",
          "idNegocio": "1714097862223",
          "valid": false
        },
        {
          "id": 2,
          "nombre": "WhatsApp Image 2023-08-13 at 10.39.35 PM (1).jpeg",
          "idNegocio": "1714097862223",
          "valid": false
        }
      ]
    };
    this.settingChunks();
    setTimeout(() => {
      this.SpinnerServices.hide("spinnerDetalleNegocio");
    }, 5000);
  }*/

}
