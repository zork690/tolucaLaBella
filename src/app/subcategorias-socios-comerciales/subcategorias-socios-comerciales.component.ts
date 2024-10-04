import { Component, OnInit } from '@angular/core';
import { NegociosService } from '../servicios/negocios/negocios.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { negociosInfo } from 'src/assets/mockDemoNegociosInfo';

@Component({
  selector: 'app-subcategorias-socios-comerciales',
  templateUrl: './subcategorias-socios-comerciales.component.html',
  styleUrls: ['./subcategorias-socios-comerciales.component.css']
})
export class SubcategoriasSociosComercialesComponent implements OnInit {
  
  subcategoria: any;
  subcategoriaString:string;

  constructor(
    private route: ActivatedRoute
    , private negocioService: NegociosService
    , private SpinnerServices: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.subcategoriaString = this.route.snapshot.paramMap.get('subcategoria');
    this.fetchNegocios();
  }

  // PARA PROBAR EN EL BACK
  /*private fetchNegocios(): void{
    this.SpinnerServices.show("spinnerNegocioSubCategoria");
    console.log("Obteniendo negocios de: ", this.subcategoria.subcategoria);
    this.negocioService.getNegociosBySubCategoria(this.subcategoria.subcategoria).subscribe((result)=>{
      console.log("Negocios list: ",result);
      this.negociosInfo = result;
      this.SpinnerServices.hide("spinnerNegocioSubCategoria");
    }
    , (error)=>{
      console.log("Ocurrio un error obteniendo los negocios por subcategoria: ",error);
    });
  }*/

    // PARA PROBAR EN LOCAL
    private fetchNegocios(): void{
      this.SpinnerServices.show("spinnerNegocioSubCategoria");
      this.subcategoria = {
        id: "9",
        subcategoria: "Cines",
        categoria: "categoria apócrifa",
        metaDescripcion: "Encuentra los mejores cines en Toluca la Bella. Disfruta de las últimas películas en modernas salas con excelente calidad de sonido e imagen.",
        negocios: negociosInfo
      };
      setTimeout(() => {
        this.SpinnerServices.hide("spinnerNegocioSubCategoria");
      }, 6000);
    }

}
