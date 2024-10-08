import {
  Component, OnInit, AfterViewInit
  , OnDestroy
} from '@angular/core';
import { CategoriasService } from '../servicios/categorias/categorias.service';
import { Meta } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-socios-comerciales',
  templateUrl: './socios-comerciales.component.html',
  styleUrls: ['./socios-comerciales.component.css']
})
export class SociosComercialesComponent implements OnInit, AfterViewInit, OnDestroy {

  categoriasObj: any[];

  constructor(
    private meta: Meta
    , private categoriaService: CategoriasService
    , private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getCategorias();
    this.meta.updateTag(
      { name: "title", content: "Directorio Toluca la Bella" },
      "name=title");
    this.meta.updateTag(
      { name: "description", content: "Conecta con empresas locales de confianza y descubre todo lo que Toluca tiene que ofrecer." },
      "name=description");
    this.meta.updateTag(
      { name: "keywords", content: "Directorio, Negocios Toluca, Productos, Servicios" },
      "name=keywords");
  }

  ngAfterViewInit(): void {
  }

  // PARA PROBAR EN EL BACK
  private getCategorias():void{
    this.SpinnerService.show("spinnerCategorias");
    this.categoriaService.getCategorias().subscribe((result)=>{
      console.log("Categorias: ",result);
      this.categoriasObj = result;
      this.SpinnerService.hide("spinnerCategorias");
    }, (error)=>{
      console.log("Ocurrio un error obteniendo las categorias: ", error);
    });
  }

  // PARA PROBAR EN LOCAL
  /*private getCategorias(): void {
    this.SpinnerService.show("spinnerCategorias");
    this.categoriasObj = [
      {
        categoria: "1",
        imagen: "dfdfdfdsfdsf",
        valid: true
      }
      , {
        categoria: "2",
        imagen: "dfdfdfdsfdsf",
        valid: true
      }
      , {
        categoria: "3",
        imagen: "dfdfdfdsfdsf",
        valid: true
      }
    ];
    setTimeout(() => {
      this.SpinnerService.hide("spinnerCategorias");
    }, 4000);
  }*/

  ngOnDestroy() {
    //For performance reasons
  }

}
