import {
  Component, OnInit, AfterViewInit
  , OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CategoriasService } from '../servicios/categorias/categorias.service';
import { Meta } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-socios-comerciales',
  templateUrl: './socios-comerciales.component.html',
  styleUrls: ['./socios-comerciales.component.css']
})
export class SociosComercialesComponent implements OnInit, AfterViewInit, OnDestroy {

  categoriasObj: any[];
  @ViewChild('container') container: ElementRef<HTMLElement>;

  constructor(
    private meta: Meta
    , private categoriaService: CategoriasService
    , private SpinnerService: NgxSpinnerService
    , private router: Router
    , private activeRoute: ActivatedRoute
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

    this.activeRoute.params.subscribe(param => {
      if(param.pageSec){
        const section = this.container.nativeElement.querySelector(`#${param.pageSec}`)
        console.log(section)
        section?.scrollIntoView();
      }
    });


  }

  public sendToSubcategorias(categoria: any):void{
    console.log("Buscando: ", categoria.categoria);
    this.router.navigate(["directorio-de-negocios",categoria.categoria]);
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
