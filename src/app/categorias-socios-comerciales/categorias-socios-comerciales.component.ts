import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias-socios-comerciales',
  templateUrl: './categorias-socios-comerciales.component.html',
  styleUrls: ['./categorias-socios-comerciales.component.css']
})
export class CategoriasSociosComercialesComponent implements OnInit {

  categoria: string;
  subcategoria: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get('categoria');
    this.subcategoria = this.route.snapshot.paramMap.get('subcategoria');
  }

}
