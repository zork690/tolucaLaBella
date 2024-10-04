import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MisNoticiasService } from '../servicios/mis-noticias/mis-noticias.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-noticias-articulos',
  templateUrl: './noticias-articulos.component.html',
  styleUrls: ['./noticias-articulos.component.css']
})
export class NoticiasArticulosComponent implements OnInit {

  @Input() categoria: string;

  public seccionesNoticias: any;

  constructor(
    private SpinnerServices: NgxSpinnerService
    , private noticiaService: MisNoticiasService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.categoria.currentValue != '') {
      this.gettingSeccionesArticulo(changes.categoria.currentValue);
    }
  }

  // PARA PROBAR EN EL BACK
  /*private gettingSeccionesArticulo(articulo: string): void {
    this.SpinnerServices.show("spinnerArticuloSecciones");
    this.noticiaService.getSeccionesNoticia(articulo).subscribe((result) => {
      console.log("Secciones noticias list: ", result);
      this.seccionesNoticias = result;
      this.SpinnerServices.hide("spinnerArticuloSecciones");
    }, (error) => {
      console.log("Ocurrió un error obteniendo las secciones para las noticias: ", error);
    });
  }*/

  // PARA PROBAR EN LOCAL
  private gettingSeccionesArticulo(articulo: string): void {
    console.log("OBTENIENDO SECCIONES DE ARTICULO: ", articulo);
    this.SpinnerServices.show("spinnerArticuloSecciones");
    this.seccionesNoticias = {
      secciones: [
        {
          imagen: "../../assets/imagenes/imagenSeisNosotros.PNG",
          titulo: "Sección 1",
          redaccion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A soluta nulla nobis, numquam aliquid ipsum mollitia quas, quasi accusantium vero dicta ex excepturi exercitationem itaque debitis vel iure eaque sequi!"
        },
        {
          imagen: "../../assets/imagenes/imagenSeisNosotros.PNG",
          titulo: "Sección 2",
          redaccion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A soluta nulla nobis, numquam aliquid ipsum mollitia quas, quasi accusantium vero dicta ex excepturi exercitationem itaque debitis vel iure eaque sequi!"
        },
        {
          imagen: "../../assets/imagenes/imagenSeisNosotros.PNG",
          titulo: "Sección 3",
          redaccion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A soluta nulla nobis, numquam aliquid ipsum mollitia quas, quasi accusantium vero dicta ex excepturi exercitationem itaque debitis vel iure eaque sequi!"
        },
        {
          imagen: "../../assets/imagenes/imagenSeisNosotros.PNG",
          titulo: "Sección 4",
          redaccion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A soluta nulla nobis, numquam aliquid ipsum mollitia quas, quasi accusantium vero dicta ex excepturi exercitationem itaque debitis vel iure eaque sequi!"
        }
      ]
    };
    setTimeout(() => {
      this.SpinnerServices.hide("spinnerArticuloSecciones");
    }, 5000);
  }

}
