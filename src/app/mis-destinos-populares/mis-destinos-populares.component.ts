import { Component, OnInit } from '@angular/core';
import { MisDestinosPopularesService } from '../servicios/mis-destinos-populares/mis-destinos-populares.service';

@Component({
  selector: 'app-mis-destinos-populares',
  templateUrl: './mis-destinos-populares.component.html',
  styleUrls: ['./mis-destinos-populares.component.css']
})
export class MisDestinosPopularesComponent implements OnInit {

  constructor(
    private misDestinosPopularesService: MisDestinosPopularesService
  ) { }

  ngOnInit(): void {
  }

}
