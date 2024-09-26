import { Component, OnInit } from '@angular/core';
import { MisNoticiasService } from '../servicios/mis-noticias/mis-noticias.service';

@Component({
  selector: 'app-mis-noticias',
  templateUrl: './mis-noticias.component.html',
  styleUrls: ['./mis-noticias.component.css']
})
export class MisNoticiasComponent implements OnInit {

  constructor(
    private misNoticiasService: MisNoticiasService
  ) { }

  ngOnInit(): void {
  }

}
