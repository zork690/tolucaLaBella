import { Component, Input, OnInit } from '@angular/core';
import { NegociosService } from '../servicios/negocios/negocios.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-comentarios-socios-comerciales',
  templateUrl: './comentarios-socios-comerciales.component.html',
  styleUrls: ['./comentarios-socios-comerciales.component.css']
})
export class ComentariosSociosComercialesComponent implements OnInit {

  @Input() idNegocio: any = {};
  public comentariosList: Array<any>;

  public isLoaded: boolean = false;

  constructor(
    private negocioService: NegociosService
    , private SpinnerServices: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    console.log("obteniendo comentarios del negocio id: ", this.idNegocio);
    this.getComentarios();
  }



  private getComentarios():void{
    this.SpinnerServices.show("spinnerComentarios");
      this.negocioService.getNegocioComentarios(this.idNegocio).subscribe((result)=>{
        console.log("comentarios: ",result);
        this.comentariosList = result;
        this.SpinnerServices.hide("spinnerComentarios");
        this.isLoaded = true;
      }
      , (error)=>{
        this.SpinnerServices.hide("spinnerComentarios");
        console.log("Ocurrio un error obteniendo los comentarios del negocio: ", error);
      });
    }

}
