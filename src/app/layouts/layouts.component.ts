import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  public anio: number = 2024;

  constructor(
  ) { }

  ngOnInit(): void {

    this.getAnio();

  }

  private getAnio(): void {
    this.anio = new Date().getFullYear();
  }

}
