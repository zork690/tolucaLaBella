import { Component, OnInit } from '@angular/core';
import { NegociosService } from '../servicios/negocios/negocios.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { negociosInfo } from 'src/assets/mockDemoNegociosInfo';
import { SubcategoriasService } from '../servicios/subcategorias/subcategorias.service';
import { Router } from '@angular/router';
import { AppConfig } from '../servicios/config/app.config';

@Component({
  selector: 'app-subcategorias-socios-comerciales',
  templateUrl: './subcategorias-socios-comerciales.component.html',
  styleUrls: ['./subcategorias-socios-comerciales.component.css']
})
export class SubcategoriasSociosComercialesComponent implements OnInit {
  
  subcategoria: any;
  subcategoriaString:string;
  negocios: any;
  imagenesBasePath: string;
  apiEndPoint: string;

  constructor(
    private route: ActivatedRoute
    , private negocioService: NegociosService
    , private SpinnerServices: NgxSpinnerService
    , private subCategoriaService: SubcategoriasService
    , private router: Router
    , private config: AppConfig
  ) {
    this.subCategoriaService.getSubcategoria.subscribe((subcategoria)=>{
      this.subcategoria = subcategoria
    });
    //this.apiEndPoint = this.config.getConfig('apiEndPoint');
    this.apiEndPoint = "https://backend.zorktech.com.mx";
    this.imagenesBasePath = this.config.getConfig('pathImages');
   }

  ngOnInit(): void {
    this.subcategoriaString = this.route.snapshot.paramMap.get('subcategoria');
    console.log("Subcategoria: ", this.subcategoria);
    if(JSON.stringify(this.subcategoria) === JSON.stringify({})){
      this.router.navigate(["directorio-de-negocios"]);
    }else{
      this.fetchNegocios();
    }
  }

  // PARA PROBAR EN EL BACK
  private fetchNegocios(): void{
    this.SpinnerServices.show("spinnerNegocioSubCategoria");
    console.log("Obteniendo negocios de: ", this.subcategoriaString);
    const s = encodeURIComponent(encodeURIComponent(this.subcategoriaString));
    this.negocioService.getNegociosBySubCategoria(s).subscribe((result)=>{ 
      console.log("Negocios list: ",result);
      this.negocios = result;
      this.SpinnerServices.hide("spinnerNegocioSubCategoria");
    }
    , (error)=>{
      console.log("Ocurrio un error obteniendo los negocios por subcategoria: ",error);
    });
  }

    // PARA PROBAR EN LOCAL
    /*private fetchNegocios(): void{
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
    }*/

}
