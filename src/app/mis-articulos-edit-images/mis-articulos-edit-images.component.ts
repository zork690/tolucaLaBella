import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MisArticulosService } from '../servicios/mis-articulos/mis-articulos.service';

@Component({
  selector: 'app-mis-articulos-edit-images',
  templateUrl: './mis-articulos-edit-images.component.html',
  styleUrls: ['./mis-articulos-edit-images.component.css']
})
export class MisArticulosEditImagesComponent implements OnInit {

  @Input() childImages: any[] = [];
  @Output() messageFromChild = new EventEmitter<string>();

  constructor(
    private SpinnerService: NgxSpinnerService
    , private toastr: ToastrService
    , private misArticulosService: MisArticulosService
  ) { }

  ngOnInit(): void {
  }


  public updateImages(): void {
    console.log("NUEVOS STATUS IMAGENES: ", this.payload());
    this.SpinnerService.show();
    this.misArticulosService.updateImages(this.payload()).subscribe((response) => {
      console.log("Respuesta: ",response);
      this.SpinnerService.hide();
      this.toastr.success("Imagenes editadas correctamente.");
      this.messageFromChild.emit("1");
    },
      (jsonError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error al tratar de actualizar las imagenes.");
        console.log("Error al actualizar imágenes: ", jsonError);
      });
  }

  private payload(){
    let array = this.childImages.map((image)=>{
      return {
        id: image.id,
        valid: image.valid
      }
    });

    let payload = {
      imagenes: array
    }
    return JSON.stringify(payload);
  }

}
