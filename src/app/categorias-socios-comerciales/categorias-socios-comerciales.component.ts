import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubcategoriasService } from '../servicios/subcategorias/subcategorias.service';

@Component({
  selector: 'app-categorias-socios-comerciales',
  templateUrl: './categorias-socios-comerciales.component.html',
  styleUrls: ['./categorias-socios-comerciales.component.css']
})
export class CategoriasSociosComercialesComponent implements OnInit {

  categoria: string;
  subcategorias: any[];

  negociosInfo: any;

  constructor(
    private route: ActivatedRoute
    , private SpinnerServices: NgxSpinnerService
    , private subCategoriaService: SubcategoriasService
  ) { }

  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get('categoria');
    this.gettingSubCategorias();

  }

  // PARA PROBAR EN LOCAL
  private gettingSubCategorias():void{
    console.log("Obteniendo subcategorias de: ", this.categoria);
    this.SpinnerServices.show("spinnerSubCategorias");
    this.subcategorias = [
      {
        id: "9",
        subcategoria: "Cines",
        categoria: this.categoria,
        metaDescripcion: "Encuentra los mejores cines en Toluca la Bella. Disfruta de las últimas películas en modernas salas con excelente calidad de sonido e imagen."
      },
      {
        id: "9",
        subcategoria: "Teatros",
        categoria: this.categoria,
        metaDescripcion: "Encuentra los mejores cines en Toluca la Bella. Disfruta de las últimas películas en modernas salas con excelente calidad de sonido e imagen."
      }
    ];
    setTimeout(() => {
      this.SpinnerServices.hide("spinnerSubCategorias");
    }, 5000);
  }

  // PARA PROBAR EN EL BACK
  /*private gettingSubCategorias(): void {
    this.SpinnerServices.show("spinnerSubCategorias");
    console.log("Obteniendo subcategorias de: ", this.categoria);
    this.subCategoriaService.getSubCategoriasByCategoria(this.categoria).subscribe((result) => {
      console.log("Subcategorias list: ", result);
      this.subcategorias = result;
      this.SpinnerServices.hide("spinnerSubCategorias");
    }
      , (error) => {
        console.log("Ocurrio un error obteniendo las subcategorias: ", error);
      });
  }*/

}
