import { Component, OnInit } from '@angular/core';
import { MisRecomendacionesService } from '../servicios/mis-recomendaciones/mis-recomendaciones.service';

@Component({
  selector: 'app-mis-recomendaciones',
  templateUrl: './mis-recomendaciones.component.html',
  styleUrls: ['./mis-recomendaciones.component.css']
})
export class MisRecomendacionesComponent implements OnInit {

  constructor(
    private misRecomendacionesService: MisRecomendacionesService
  ) { }

  ngOnInit(): void {
  }

}
