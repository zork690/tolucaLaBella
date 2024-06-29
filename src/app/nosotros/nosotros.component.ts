import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {

  constructor(private meta: Meta) { }

  ngOnInit(): void {
    this.meta.updateTag( 
      { name: "title", content: "Nosotros" }, 
      "name=title");
    this.meta.updateTag( 
      { name: "description", content: "Conoce más sobre nuestro directorio de negocios en Toluca. Descubre nuestra misión y el equipo dedicado a conectar a la comunidad con los mejores comercios y servicios locales." }, 
      "name=description");
    this.meta.updateTag( 
      { name: "keywords", content: "Nosotros, Negocios Toluca, Productos, Servicios" }, 
      "name=keywords");
  }

}
