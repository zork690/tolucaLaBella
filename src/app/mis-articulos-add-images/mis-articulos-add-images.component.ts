import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MisArticulosService } from '../servicios/mis-articulos/mis-articulos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mis-articulos-add-images',
  templateUrl: './mis-articulos-add-images.component.html',
  styleUrls: ['./mis-articulos-add-images.component.css']
})
export class MisArticulosAddImagesComponent implements OnInit {

  @Input() articulo: any = {};
  @Output() messageFromChild = new EventEmitter<string>();

  imagenesFormArray = new FormArray([this.newImagenForm]);
  imagesFormGroup = new FormGroup({
    imagenesArray: this.imagenesFormArray
  });

  private imagenesAdd: Set<any> = new Set();
  private imagen: string;
  private imagenRequerida: string = "Seleccione una imagen";
  private onlyImagesMessage: string = "Solo imágenes son permitidas";
  private sizeOfImageMessage: string = "La imágen esta muy pesada selecciona una mas ligera";

  constructor(
    private SpinnerService: NgxSpinnerService
    , private misArticulosService: MisArticulosService
    , private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public imageSelect(evento, index: number) {
    //console.log("Evento: ", evento);
    let fileList: FileList = evento.target.files;
    let pattern = /image-*/;
    let reader = new FileReader();
    const file: File = fileList[0];
    this.imagen = file.name;
    if (!file.type.match(pattern)) {
      document.getElementById(`imagen${index}Validacion`).innerText = this.onlyImagesMessage;
      this.imagesFormGroup.controls.imagenesArray.setErrors(Validators.required);
    } else if (file.size > 300000) {
      document.getElementById(`imagen${index}Validacion`).innerText = this.sizeOfImageMessage;
      this.imagesFormGroup.controls.imagenesArray.setErrors(Validators.required);
    } else {
      document.getElementById(`imagen${index}Validacion`).innerText = "";
      reader.onloadend = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  public get keyValueArrayImagesControls(): FormGroup[] {
    return this.imagenesFormArray.controls as FormGroup[];
  }

  public removeImage(index: number): void {
    this.imagenesFormArray.removeAt(index);
    if (this.imagenesFormArray.length == 0) {
      this.addNewImage();
    }
  }

  public addNewImage(): void {
    this.imagenesFormArray.push(this.newImagenForm);
  }

  public onSubmitImages() {
    //this.enviado = true;
    this.validacionesImagenes();

    if (this.imagesFormGroup.valid) {
      console.log("Enviando imagenes: ", this.payloadForAddingImages());
      this.SpinnerService.show();
      this.misArticulosService.createImages(this.payloadForAddingImages())
        .subscribe((result: any) => {
          this.SpinnerService.hide();
          console.log("Enviando imagenes: ", result);
          this.toastr.success("Imagenes enviadas exitosamente.");
          this.messageFromChild.emit("1");
        }, (responseError) => {
          this.SpinnerService.hide();
          console.log("ocurrio un error enviando las imágenes ", responseError);
          this.toastr.error("Error al enviar las imágenes: ", responseError.error.m)
        });
    }
  }


  private validacionesImagenes() {
    this.imagenesFormArray.controls.forEach((imagenFile, index) => {
      if (imagenFile.get("key").value == null) {
        document.getElementById(`imagen${index}Validacion`).innerText = this.imagenRequerida;
        this.imagesFormGroup.controls.imagenesArray.setErrors(Validators.required);
      }
    });
  }

  private get newImagenForm(): FormGroup {
    return new FormGroup({
      key: new FormControl(null)
    });
  }

  private payloadForAddingImages() {
    let payload = {
      idArticulo: this.articulo.id,
      imagenes: this.fromSetToArrayImages()
    };
    return JSON.stringify(payload);
  }



  private fromSetToArrayImages(): Array<any> {
    let imagesArray = Array.from(this.imagenesAdd);
    return imagesArray;
  }

  private _handleReaderLoaded(e) {
    let reader = e.target;
    let base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //console.log("BASE64: ", base64result);
    this.imagenesAdd.add({
      nombre: this.imagen,
      baseContent: base64result
    });
  }

}
