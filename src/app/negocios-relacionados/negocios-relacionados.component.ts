import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-negocios-relacionados',
  templateUrl: './negocios-relacionados.component.html',
  styleUrls: ['./negocios-relacionados.component.css']
})
export class NegociosRelacionadosComponent implements OnInit {

  public getScreenWidth: any;
  public getScreenHeight: any;
  public negociosRelacionados: any;

  public chunks: Array<any>;
  private imagesByRow: number;

  constructor(
    private renderer: Renderer2
    , private elem: ElementRef
    , private SpinnerServices: NgxSpinnerService
    , private router: Router
  ) { }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.settingChunks();
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getNegociosRelacionados();
  }

  ngAfterViewInit(): void {
    if (this.chunks) {
      const items = this.elem.nativeElement.querySelectorAll(".carousel-item");
      this.renderer.addClass(items[0], "active");
    }
  }

  public gettingWithOfImage(chunks: any): any {
    let width = (chunks.length * 100) / this.imagesByRow;
    return {
      "max-width": `${width}%`
    };
  }

  public getNegocioNuevo(negocio: any): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/directorio-de-negocios"
        , negocio.categoria
        , negocio.subcategoria
        , negocio.nombre]);
    });
  }

  private getChunks(): Array<any> {
    if (this.negociosRelacionados) {
      let numberOfImagesByRow = this.imagesByRow;
      let numberOfNewNegocios = this.negociosRelacionados.negocios.length;
      let numberOfTotalRows = Math.ceil(numberOfNewNegocios / numberOfImagesByRow);
      let chunks = Array.from({ length: numberOfTotalRows }, (_, i) => this.negociosRelacionados.negocios.slice(i * numberOfImagesByRow, (i + 1) * numberOfImagesByRow));
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
  /*private getNegociosRelacionados():void{
    this.SpinnerServices.show("spinnerNegociosRelacionados");
    this.negocioService.getNegociosNuevos().subscribe((result) => {
      console.log("Negocios nuevos list: ", result);
      this.negociosNuevos = result;
      this.SpinnerServices.hide("spinnerNegociosRelacionados");
      this.settingChunks();
    }, (error) => {
      console.log("Ocurrió un error obteniendo los negocios nuevos: ", error);
    });
  }*/

  // PARA PROBAR EN LOCAL
  private getNegociosRelacionados(): void {
    this.SpinnerServices.show("spinnerNegociosRelacionados");
    this.negociosRelacionados = {
      negocios: [
        {
          nombre: "Negocio 1",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg",
          categoria: "entretenimiento",
          subcategoria: "cines"
        },
        {
          nombre: "Negocio 2",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg",
          categoria: "entretenimiento",
          subcategoria: "cines"
        },
        {
          nombre: "Negocio 3",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg",
          categoria: "entretenimiento",
          subcategoria: "cines"
        },
        {
          nombre: "Negocio 4",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg",
          categoria: "entretenimiento",
          subcategoria: "cines"
        },
        {
          nombre: "Negocio 5",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg",
          categoria: "entretenimiento",
          subcategoria: "cines"
        },
        {
          nombre: "Negocio 6",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg",
          categoria: "entretenimiento",
          subcategoria: "cines"
        },
        {
          nombre: "Negocio 7",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg",
          categoria: "entretenimiento",
          subcategoria: "cines"
        },
        {
          nombre: "Negocio 8",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg",
          categoria: "entretenimiento",
          subcategoria: "cines"
        },
        {
          nombre: "Negocio 9",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg",
          categoria: "entretenimiento",
          subcategoria: "cines"
        },
        {
          nombre: "Negocio 10",
          imagen: "https://image.shutterstock.com/z/stock-photo-sleeping-disorders-as-a-reason-for-insomnia-293777093.jpg",
          categoria: "entretenimiento",
          subcategoria: "cines"
        }
      ]
    };
    this.settingChunks();
    setTimeout(() => {
      this.SpinnerServices.hide("spinnerNegociosRelacionados");
    }, 5000);
  }
}
