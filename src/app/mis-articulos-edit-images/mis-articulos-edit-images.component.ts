import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-articulos-edit-images',
  templateUrl: './mis-articulos-edit-images.component.html',
  styleUrls: ['./mis-articulos-edit-images.component.css']
})
export class MisArticulosEditImagesComponent implements OnInit {

  @Input() childImages: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  public updateImages(): void {
    console.log("NUEVOS STATUS IMAGENES: ", this.childImages);
    /*this.SpinnerService.show();
    this.negocioService.updateImages(this.imagenes).subscribe((response) => {
      this.toastr.success('Actualización exitosa.');
      console.log("Respuesta: ",response);
      this.SpinnerService.hide();
      this.cancelModal();
      this.ngOnInit();
    },
      (jsonError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error al tratar de actualizar las imagenes.");
        console.log("Error al actualizar imágenes: ", jsonError);
      });*/
  }

}
