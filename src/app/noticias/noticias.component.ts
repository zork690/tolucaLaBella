import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  constructor(private meta: Meta) { }

  ngOnInit(): void {
    this.meta.updateTag( 
      { name: "title", content: "Noticias" }, 
      "name=title");
    this.meta.updateTag( 
      { name: "description", content: "Entérate de las últimas noticias y tendencias en el mundo y en la ciudad de Toluca. Lee nuestro blog para descubrir novedades, consejos y eventos importantes." }, 
      "name=description");
    this.meta.updateTag( 
      { name: "keywords", content: "Blog, Eventos Importantes, Noticias, Negocios Toluca, Productos, Servicios" }, 
      "name=keywords");
  }

}
