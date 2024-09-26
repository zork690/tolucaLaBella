import { Component, OnInit } from '@angular/core';
import { MisHistoriasDeExitoService } from '../servicios/mis-historias-de-exito/mis-historias-de-exito.service';

@Component({
  selector: 'app-mis-historias-de-exito',
  templateUrl: './mis-historias-de-exito.component.html',
  styleUrls: ['./mis-historias-de-exito.component.css']
})
export class MisHistoriasDeExitoComponent implements OnInit {

  constructor(
    private misHistoriasDeExitoService: MisHistoriasDeExitoService
  ) { }

  ngOnInit(): void {
  }

}
