import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MisNoticiasService } from '../servicios/mis-noticias/mis-noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit, AfterViewInit {

  @ViewChild('noticiasDetalle') noticiasDetalleDiv: ElementRef;

  public noticias:any;

  public categoria:string = "";

  constructor(
    private meta: Meta
    , private router: Router
    , private SpinnerServices: NgxSpinnerService
    , private noticiaService: MisNoticiasService
  ) { }

  ngOnInit(): void {
    this.meta.updateTag(
      { name: "title", content: "Noticias" },
      "name=title");
    this.meta.updateTag(
      { name: "description", content: "Entérate de las últimas noticias y tendencias en el mundo y en la ciudad de Toluca. Lee nuestro blog para descubrir novedades, consejos y eventos importantes." },
      "name=description");
    this.meta.updateTag(
      { name: "keywords", content: "Blog, Eventos Importantes, Noticias, Negocios Toluca, Productos, Servicios" },
      "name=keywords");
    
    this.getArticulosNoticias();    
  }

  ngAfterViewInit(): void {
    
  }


  public settingCategoria(categoria:string): void{
    this.categoria = categoria;
    this.router.navigate(["noticias-de-toluca","noticias", categoria]);
    this.noticiasDetalleDiv.nativeElement.scrollIntoView(
      {
        behavior: 'smooth',
        block: 'center',
      }
    );
  }

    // PARA PROBAR EN EL BACK
    /*private getArticulosNoticias(): void {
      this.SpinnerServices.show("spinnerArticulos");
      this.noticiaService.getArticulosNoticias().subscribe((result) => {
        console.log("Articulos noticias list: ", result);
        this.noticias = result;
        this.SpinnerServices.hide("spinnerArticulos");
        this.settingArticuloSecciones();
      }, (error) => {
        console.log("Ocurrió un error obteniendo los articulos para las noticias: ", error);
      });
    }*/

  // PARA PROBAR EN LOCAL
  private getArticulosNoticias(): void {
    this.SpinnerServices.show("spinnerArticulos");
    this.noticias = {
      categorias: [
        {
          imagen: "../../assets/imagenes/categorias.PNG",
          titulo: "Tendencias"
        },
        {
          imagen: "../../assets/imagenes/categorias.PNG",
          titulo: "Eventos"
        },
        {
          imagen: "../../assets/imagenes/categorias.PNG",
          titulo: "Recomendaciones"
        },
        {
          imagen: "../../assets/imagenes/categorias.PNG",
          titulo: "Negocios"
        },
        {
          imagen: "../../assets/imagenes/categorias.PNG",
          titulo: "Destinos Populares"
        }
      ]
    };
    setTimeout(() => {
      this.SpinnerServices.hide("spinnerArticulos");
      this.settingArticuloSecciones();
    }, 5000);
  }

  private settingArticuloSecciones():void{
    this.categoria = this.noticias.categorias[0].titulo;
  }

}
