import { Component, OnInit, HostListener } from '@angular/core';
import { ImagenDTO, ImagenStringDTO } from '../../app/modelos/imagenes/imagendto';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagenService } from '../../app/servicios/imagenes/imagen.service';

export enum KEY_CODE {
  ENTER = 13
}

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})


export class ImagenesComponent implements OnInit {

 backupImagenes:ImagenDTO[] = [];
 deleteImagenes:ImagenDTO[] = [];
 imgFromServer: ImagenDTO[] = [];
 arregloStrings: ImagenStringDTO[] = [];

 show:boolean = true;
 filterText ={
    "imagen": ""
  };
  checkstatus:boolean = false;
  collection = { count: 0, data: [] };
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.collection.count
  };
  modalOptions:NgbModalOptions;
  closeResult: string;
  optionSelect = [5,10,15,20];
  labels: any = {};
  maxSize = 7;
  imagen: any = {};
  form = true;
  base64String: string = "";
  seleccionoArchivo:boolean = false;
  

  constructor(
    private modalService: NgbModal,
    private SpinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private imagenService: ImagenService
    ) { 
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }


@HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ENTER) {
      //console.log("EVENTO HOSTLISTENER: ", event);
      this.filter();
    }
  }

  ngOnInit(): void {
    this.getImagenes();
  }

  searchshow(){
    this.show = !this.show;
  }

  clean(){
    this.filterText = {
      "imagen": ""
    };
  }

  borrarImagenes(content){
    this.deleteImagenes = [];
    this.collection.data.forEach(val => {
      if(val.check){
        this.deleteImagenes.push(val);
      }
    });

    if(this.deleteImagenes.length === 0){
      this.toastr.info("Seleccionar Imágen(es)");
    }else{
      this.open(content);
    }
  }


  openDeleteOne(content, index){
    let indexverdadero  = this.index(index);
    this.deleteImagenes = [];
    this.deleteImagenes.push(this.collection.data[indexverdadero]);
    this.open(content);
  }

  private index(posicion){
    return this.config.currentPage * this.config.itemsPerPage - this.config.itemsPerPage + posicion;
  }

  showIncrease(content, item){
    this.imagen = item;
    this.open(content);
  }

  filter(){
    this.SpinnerService.show();
    this.collection.data =  this.backupImagenes;
    this.filterParams(this.filterText.imagen.trim());
    this.config.totalItems = this.collection.data.length;
    this.collection.count = this.collection.data.length;
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
    this.SpinnerService.hide();
  }


  private filterParams(param1, param2=null) {
    this.collection.data = this.collection.data.filter((item) =>
        item.descripcion.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
            .indexOf(param1.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()) !==  -1);
    if (this.collection.data.length === 0) {
      this.collection.data =  this.backupImagenes;
      this.collection.data = this.collection.data.filter((item) =>
          item.numImagen.toString().toLowerCase().indexOf(param1.toLowerCase()) !==  -1);
    }

    if (param2 !== undefined && param2 !== '' && param2 !== null) {
      if (this.collection.data.length === 0){
        this.collection.data =  this.backupImagenes;
      }
      this.collection.data = this.collection.data.filter((item) =>
          item.catalogo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
              .indexOf(param2.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()) !==  -1);
    }
    if (this.collection.data.length === 0) {
      this.SpinnerService.hide();
      this.toastr.error('No se encontraron coincidencias.');
    }

  }


  checkall(){
    //console.log("CHECANDO TODO...");
    for(let n = 0; n < this.config.itemsPerPage; n++){
      let posicion =  this.config.currentPage * this.config.itemsPerPage - this.config.itemsPerPage + n;
      if (this.collection.data[posicion])
        this.collection.data[posicion].check = this.checkstatus;
    }
  }

  getImagenes(){

    this.imagenService.getImagenes().subscribe((result: any[]) => {
      console.log("IMÁGENES: ",result);
      this.imgFromServer = result;
      this.config.totalItems = result.length;
      this.collection.count = result.length;

      this.SpinnerService.hide();

      this.setImgString();
      console.log("IMAGENES STRING: ",this.arregloStrings);

    },
    (responseError) => {
      this.SpinnerService.hide();
      this.toastr.error("Error obteniendo las imágenes");
    });

  }


  openUpdate(content, item){
    this.imagen = item;
    this.form = false;
    this.open(content);
  }


  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  cancelModal(){
    this.modalService.dismissAll();
  }

  delete(){
    this.SpinnerService.show();
    let payload:ImagenDTO[] = [];
    let contenido: ImagenDTO = <ImagenDTO>{};
    this.deleteImagenes.forEach((elemento)=>{
      contenido.numImagen = elemento.numImagen;
     payload.push(contenido);
     contenido = <ImagenDTO>{};
    });
    console.log("IMAGENES A BORAR: ",payload);
    this.imagenService.deleteImagen(payload).subscribe((result) => {
          this.toastr.success("La imágen se eliminó correctamente.");
          this.modalService.dismissAll();
          this.reiniciar();
        },
        (error) => {
          this.SpinnerService.hide();
          this.toastr.error('Error al intentar eliminar una imágen.');
        });
    this.SpinnerService.hide();

  }

  agregar(content){
    this.form = true;
    this.imagen = {};
    this.open(content);
  }

  save(){
    let payload:ImagenDTO = <ImagenDTO>{};
    this.SpinnerService.show();
    payload.imagen = this.base64String;
    payload.descripcion = this.imagen.descripcion;
    console.log("NUEVA IMAGEN: ", payload);
    this.imagenService.saveImagen(payload).subscribe((resData) => {
          this.toastr.success('Alta de imágen exitoso.');
          this.cancelModal();
          this.reiniciar();
        },
        (jsonError) => {
          this.SpinnerService.hide();
          this.toastr.error('Error al tratar de guardar una imágen.');
        });
    this.SpinnerService.hide();
    this.seleccionoArchivo = false;

  }

  validateForm(){
    if(this.form && (!this.imagen.descripcion
       || !this.imagen.file
      )){
      return true;
    }else if(!this.form && (!this.imagen.descripcion
       //|| !this.imagen.file
       )){
      return true;
    }else{
      return false;
    }

  }

  updateOne() {
    let payload:ImagenDTO = <ImagenDTO>{};
    if (this.seleccionoArchivo){
      payload.imagen = this.base64String
    }else{
      payload.imagen = this.arregloStrings.find((imagen)=>imagen.numImagen == this.imagen.numImagen).imagen;
    }
    payload.numImagen = this.imagen.numImagen;
    payload.descripcion = this.imagen.descripcion;
    console.log("IMAGEN A ACTUALIZAR: ",payload);
    this.SpinnerService.show();
    this.imagenService.updateImagen(payload).subscribe((resData) => {
          this.toastr.success('Actualización de imágen exitoso.');
          this.cancelModal();
          this.reiniciar();
        },
        (jsonError) => {
          this.SpinnerService.hide();
          this.toastr.error('Error al tratar de actualizar la imágen.');
        });
    this.SpinnerService.hide();
  }

  public onPageChange(event){
    this.SpinnerService.show();
    this.checkstatus = false;
    this.config.currentPage = event;
    this.SpinnerService.hide();
    this.checkall();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

/*****PARA CONVERTIR IMAGEN A BASE64*****/


  public convertir(evento){
    let fileList: FileList = evento.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      console.log("ARCHIVO: ", file);
      this.handleInputChange(file);
      this.seleccionoArchivo = true;
    }
  }

  private   _handleReaderLoaded(e) {
    let reader = e.target;
    let base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    console.log("BASE64: ", base64result);
    this.base64String = base64result;
  }

  private handleInputChange(files) {
    let file = files;
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      console.log('PARECE QUE NO ES UNA IMAGEN');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }


  private setImgString(){
    this.imgFromServer.forEach((imagen)=>{
      this.arregloStrings.push({"numImagen": imagen.numImagen,"imagen":imagen.imagen});
      imagen.imagen = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64,"+ imagen.imagen);
      this.collection.data.push(imagen);
      this.backupImagenes.push(imagen);
    });
  }


  private reiniciar(){
    this.form = true;
    this.backupImagenes = [];
    this.imgFromServer = [];
    this.arregloStrings = [];
    this.collection.data = [];
    this.getImagenes();
  }

}
