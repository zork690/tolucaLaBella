import { Component, OnInit } from '@angular/core';
import { MisArticulosService } from '../servicios/mis-articulos/mis-articulos.service';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { articulosInfo } from '../../assets/mockDemoArticulosInfo';

@Component({
  selector: 'app-mis-articulos',
  templateUrl: './mis-articulos.component.html',
  styleUrls: ['./mis-articulos.component.css']
})
export class MisArticulosComponent implements OnInit {

  modalOptions: NgbModalOptions;
  closeResult: string;
  tituloModal: string = "";
  tituloBtn: string = "";
  isFromOpenUpdate: boolean = false;
  articulo: any = {};

  collection = { count: 0, data: [] };
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.collection.count
  };
  optionSelect = [5, 10, 15, 20];
  labels: any = {};
  maxSize = 7;

  formGroup: FormGroup;
  enviado = false;

  conteoNombreArticulo: number = 0;
  maxNombreArticulo: number = 128;
  validacionesNombreArticulo: string = "";

  conteoDescripcionArticulo: number = 0;
  maxDescripcionArticulo: number = 2024;
  validacionesDescripcionArticulo: string = "";


  imagenes: any[] = [];

  constructor(
    private misArticulosService: MisArticulosService
    , private modalService: NgbModal
    , private SpinnerService: NgxSpinnerService
    , private toastr: ToastrService
    , private formBuilder: FormBuilder
  ) {

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };

    this.formGroup = this.formBuilder.group({
      nombreArticulo: ["", [Validators.required
        , this.validateNombreArticulo()
      ]
      ],
      descripcionArticulo: ["", [Validators.required
        , this.validateDescripcionArticulo()
      ]
      ],
      isValidArticulo: [true]
    });

  }

  ngOnInit(): void {
    this.getArticulos();
  }

  public get f() { return this.formGroup.controls; }

  public add(content): void {
    this.resetInitialValues();
    this.open(content);
  }

  public countChars(event: any): void {
    switch (event.target.id) {
      case "nombreArticulo":
        this.conteoNombreArticulo = this.formGroup.controls.nombreArticulo.value.length;
        break;
      case "descripcionArticulo":
        this.conteoDescripcionArticulo = this.formGroup.controls.descripcionArticulo.value.length;
        break;
    }
  }

  public cancelModal() {
    this.isFromOpenUpdate = false;
    this.enviado = false;
    this.modalService.dismissAll();

  }

  public receiveFromChild(event: string){
    if(event === "1"){
      this.cancelModal();
      this.ngOnInit();
    }
  }

  public onSubmit() {
    this.enviado = true;
    this.validaciones();

    if (this.formGroup.valid) {
      this.SpinnerService.show();
      this.misArticulosService.createArticle(this.payload()).subscribe((result: any) => {
        this.SpinnerService.hide();
        this.toastr.success("Articulo creado o modificado correctamente.");
        console.log("Creando o editando articulo: ", result);
        this.cancelModal();
        this.ngOnInit();
        
      }, (responseError) => {
        this.SpinnerService.hide();
        console.log("ocurrio un error creando o editando artículo ", responseError);
        this.toastr.error("Error al crear o editar artículo: ", responseError.error.m)
      });
    }

  }

  public openUpdate(content, item): void {
    //console.log("ITEM: ", item);
    this.setValues(item);
    this.settingConteos();
    this.isFromOpenUpdate = true;
    this.articulo = { ...item };
    this.imagenes = this.articulo.imagenes.map(object => ({ ...object }));
    console.log("IMAGENES: ", this.imagenes);
    this.open(content);
  }

  public onPageChange(event) {
    this.SpinnerService.show();
    this.config.currentPage = event;
    this.SpinnerService.hide();
  }

  private resetInitialValues(): void {
    this.tituloModal = "Agregar artículo";
    this.tituloBtn = "Agregar";
    this.enviado = false;
    this.formGroup.reset();
    this.settingConteos();
    this.isFromOpenUpdate = false;
    this.articulo = {};
  }

  private open(content): void {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /******** PARA PROBAR ARTICULOS LOCALMENTE *********/
  /*private getArticulos(): void {
    //this.negocioService.getNegocios().subscribe((result: any[]) => {
    //console.log("Negocios: ",result);
    //this.imgFromServer = result;
    //this.config.totalItems = result.length;
    //this.collection.count = result.length;
    this.config.totalItems = articulosInfo.length;
    this.collection.count = articulosInfo.length;
    this.collection.data = articulosInfo;
    //this.backupNegocios = articulosInfo;
    this.SpinnerService.hide();

    //this.setImgString();
    //console.log("IMAGENES STRING: ", this.arregloStrings);

    //},
    //(responseError) => {
    //  this.SpinnerService.hide();
    //  this.toastr.error("Error obteniendo los negocios", responseError);
    //});
  }*/


  /******** PARA PROBAR ARTICULOS DEL BACK *********/
  private getArticulos(): void {
    this.SpinnerService.show();
    this.misArticulosService.getArticulos().subscribe((result: any[]) => {
      console.log("Articulos: ", result);
      this.config.totalItems = result.length;
      this.collection.count = result.length;
      this.collection.data = result;
      this.SpinnerService.hide();
    },
      (responseError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error obteniendo artículos", responseError);
      });
  }


  private setValues(item: any): void {
    this.tituloModal = "Editar artículo";
    this.tituloBtn = "Editar";
    this.formGroup.patchValue({
      nombreArticulo: item.nombre,
      descripcionArticulo: item.descripcion,
      isValidArticulo: item.valid
    });
  }

  private settingConteos(): void {
    this.conteoNombreArticulo = (this.formGroup.controls.nombreArticulo.value) ? this.formGroup.controls.nombreArticulo.value.length : 0;
    this.conteoDescripcionArticulo = (this.formGroup.controls.descripcionArticulo.value) ? this.formGroup.controls.descripcionArticulo.value.length : 0;
  }

  private payload() {
    let payload = {
      id: (this.articulo.id) ? this.articulo.id : null,
      nombre: this.formGroup.controls.nombreArticulo.value,
      descripcion: this.formGroup.controls.descripcionArticulo.value,
      valid: (this.formGroup.controls.isValidArticulo.value != null) ? this.formGroup.controls.isValidArticulo.value : true
    }
    console.log("PAYLOAD: ", payload);
    return JSON.stringify(payload);
  }

  private validaciones() {
    if (this.formGroup.controls.nombreArticulo.errors?.invalidNameForm) {
      this.validacionesNombreArticulo = "Nombre parece que contiene carácteres no permitidos";
    } else {
      this.validacionesNombreArticulo = "";
    }
    if (this.formGroup.controls.descripcionArticulo.errors?.invalidDescriptionForm) {
      this.validacionesDescripcionArticulo = "Descripción parece que contiene carácteres no permitidos";
    } else {
      this.validacionesDescripcionArticulo = "";
    }
  }

  private validateNombreArticulo(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.validaSoloAlfanumericos(control.value)) {
        return null;
      } else {
        return { invalidNameForm: true };
      }
    }
  }

  private validateDescripcionArticulo(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.validaDescripcion(control.value)) {
        return null;
      } else {
        return { invalidDescriptionForm: true };
      }
    }
  }


  private validaSoloAlfanumericos(inputStr: string): boolean {
    let regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
    return regex.test(inputStr);
  }

  private validaDescripcion(inputStr: string): boolean {
    let regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ.,"\-$()¿?!¡%&\n\r“”:; ]*$/;
    return regex.test(inputStr);
  }

}
