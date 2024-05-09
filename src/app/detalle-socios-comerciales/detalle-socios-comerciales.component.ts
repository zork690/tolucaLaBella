import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NegociosService } from '../servicios/negocios/negocios.service';
import {AppConfig} from '../../app/servicios/config/app.config';

@Component({
  selector: 'app-detalle-socios-comerciales',
  templateUrl: './detalle-socios-comerciales.component.html',
  styleUrls: ['./detalle-socios-comerciales.component.css']
})
export class DetalleSociosComercialesComponent implements OnInit {

  idNegocio:string;
  tituloModal:string;
  mensajeModal: string;
  negocioObj: any;
  imagenesBasePath: string;
  apiEndPoint: string;

  constructor(private route: ActivatedRoute
    , private negocioService: NegociosService
    , private config: AppConfig
  ) {
    this.apiEndPoint = this.config.getConfig('apiEndPoint');
    //this.apiEndPoint = "https://backend.zorktech.com.mx";
    this.imagenesBasePath = this.config.getConfig('pathImages');
   }

  ngOnInit(): void {
    this.idNegocio = this.route.snapshot.paramMap.get('idNegocio');
    this.getDetails(this.idNegocio);
  }

  private getDetails(idNegocio:string):void{
    this.tituloModal = "CARGANDO NEGOCIO";
    this.mensajeModal = "CARGANDO NEGOCIO POR FAVOR ESPERE...";
    this.negocioService.getNegocio(idNegocio).subscribe((result)=>{
      console.log("Negocio: ",result);
      this.negocioObj = result;
      this.mensajeModal = "ok";
    }
    , (error)=>{
      console.log("An error occured fetching data: ",error);
      this.mensajeModal = `EL NEGOCIO NO SE HAN PODIDO CARGAR DEBIDO A UN PROBLEMA TÉCNICO
      QUE EN BREVE SOLUCIONAREMOS, POR FAVOR MÁNDENOS UN MENSAJE A LOS TELÉFONOS DE CONTACTO
      SI DESEA LEVANTAR SU QUEJA.`;
    });
  }

}
