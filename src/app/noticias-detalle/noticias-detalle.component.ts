import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-noticias-detalle',
  templateUrl: './noticias-detalle.component.html',
  styleUrls: ['./noticias-detalle.component.css']
})
export class NoticiasDetalleComponent implements OnInit {


  idArticulo: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idArticulo = params['articulo'];
      console.log("articulo: ", this.idArticulo);
    });
  }

}
