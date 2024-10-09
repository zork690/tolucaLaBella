import { Component, OnInit } from '@angular/core';
import { MisNoticiasService } from '../servicios/mis-noticias/mis-noticias.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { noticiasInfo } from 'src/assets/mockDemoNoticiasInfo';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mis-noticias',
  templateUrl: './mis-noticias.component.html',
  styleUrls: ['./mis-noticias.component.css']
})
export class MisNoticiasComponent implements OnInit {

  modalOptions: NgbModalOptions;
  closeResult: string;

  public conteoNombre: number = 0;
  noticia: any = {};
  private imagenes: Set<any> = new Set();
  private imagen: string;

  private isFromOpenUpdate: boolean = false;
  private isSelectedImage: boolean = false;
  private isValidImage: boolean = false;

  backupNoticias: any[] = [];
  noticiasInfo: any = noticiasInfo;

  checkstatus: boolean = false;

  collection = { count: 0, data: [] };
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.collection.count
  };

  optionSelect = [5, 10, 15, 20];
  labels: any = {};
  maxSize = 7;
  public maxNombre: number = 50;

  private fieldRequerido: string = "El campo es obligatorio";
  private fieldSoloAlfabeticos: string = "Números no son permitidos";
  private onlyImagesMessage: string = "Solo imágenes son permitidas";
  private sizeOfImageMessage: string = "La imágen esta muy pesada selecciona una mas ligera";

  constructor(
    private modalService: NgbModal
    , private misNoticiasService: MisNoticiasService
    , private SpinnerService: NgxSpinnerService
    , private toastr: ToastrService
  ) {

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };

  }

  ngOnInit(): void {
    this.getNoticias();
  }

  public addNoticia(content): void {
    this.resetInitialValues();
    this.open(content);
  }

  public countChars(event: any): void {
    switch (event.target.id) {
      case "nombreNoticia":
        this.conteoNombre = this.noticia.noticia.length;
        break;
    }
  }

  public onPageChange(event) {
    this.SpinnerService.show();
    this.checkstatus = false;
    this.config.currentPage = event;
    this.SpinnerService.hide();
  }

  public addNoticiaAction() {
    const mensajesIds = this.fetchingIdsValidacionParagraph();
    this.cleanValidations(mensajesIds);
    if (!this.isValid()) {
      mensajesIds.mensajesValidacion
        .innerHTML = `
      <p>Parece que hay algunos campos que tienen error</p>
      `;
      return;
    }

    console.log("Noticia: ", this.noticia);
    this.SpinnerService.show();

    this.misNoticiasService.createNoticia(this.payload()).subscribe((resData) => {
      (!this.isFromOpenUpdate) ?
        this.toastr.success('Se creó noticia.') :
        this.toastr.success('Se editó noticia.');
      this.SpinnerService.hide();
      this.cancelModal();
      this.ngOnInit();
    },
      (jsonError) => {
        this.SpinnerService.hide();
        (!this.isFromOpenUpdate) ?
          this.toastr.error("Error al tratar de crear la noticia.")
          : this.toastr.error("Error al tratar de editar la noticia.");
        (!this.isFromOpenUpdate) ?
          console.log("Error al crear la noticia: ", jsonError)
          : console.log("Error al editar la noticia: ", jsonError);
      });
  }

  public cancelModal() {
    this.isFromOpenUpdate = false;
    this.modalService.dismissAll();
  }

  public openUpdate(content, item): void {
    this.noticia = { ...item };
    this.settingDefaultConteos();
    this.isFromOpenUpdate = true;
    this.isValidImage = true;
    this.open(content);
  }

  public convertir(evento) {
    this.isSelectedImage = true;
    let fileList: FileList = evento.target.files;
    const elements = this.fetchingIdsValidacionParagraph();
    elements.imagenNoticiaValidacion.innerText = "";
    if (fileList.length > 0) {
      const file: File = fileList[0];
      console.log("ARCHIVO: ", file);
      this.handleInputChange(file, elements);
    }
  }

  private handleInputChange(file, elements) {
    this.imagen = file.name;
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.isValidImage = false;
      elements.imagenNoticiaValidacion.innerText = this.onlyImagesMessage;
      return;
    } else if (file.size > 800000) {
      this.isValidImage = false;
      elements.imagenNoticiaValidacion.innerText = this.sizeOfImageMessage;
      return;
    } else {
      this.isValidImage = true;
      elements.imagenNoticiaValidacion.innerText = "";
      if(this.noticia.noticia){
        if (this.noticia.noticia.trim()) {
          elements.mensajesValidacion.innerHTML = "";
        }
      }

      reader.onloadend = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  private _handleReaderLoaded(e) {
    let reader = e.target;
    let base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //console.log("BASE64: ", base64result);
    this.imagenes.add({
      nombre: this.imagen,
      baseContent: base64result
    });
    //console.log(this.imagenes);
  }

  private settingDefaultConteos(): void {
    this.conteoNombre = this.noticia.noticia.length;
  }

  private isValid(): boolean {
    const paragraphsObj = this.fetchingIdsValidacionParagraph();
    this.cleanValidations(paragraphsObj);
    if (!this.noticia.noticia) {
      paragraphsObj.nombreNoticiaValidacion.innerText
        = this.fieldRequerido;
      return false;
    }
    if (!this.noticia.noticia.trim()) {
      paragraphsObj.nombreNoticiaValidacion.innerText
        = this.fieldRequerido;
      return false;
    };

    if (!this.isFromOpenUpdate) {
      if (!this.isSelectedImage) {
        paragraphsObj.imagenNoticiaValidacion.innerText
          = this.fieldRequerido;
        return false;
      }
    }


    if (!this.isValidImage) {
      return false;
    }
    /* PARA VALIDAR */
    if (!this.validaSoloAlfabeticos(this.noticia.noticia)) {
      paragraphsObj.nombreNoticiaValidacion.innerText
        = this.fieldSoloAlfabeticos;
      return false;
    }
    return true;
  }

  private validaSoloAlfabeticos(inputStr: string): boolean {
    let regex = /^[a-zA-Z ]*$/;
    return regex.test(inputStr);
  }

  private fetchingIdsValidacionParagraph(): any {
    const nombreNoticiaValidacion = document.getElementById("nombreNoticiaValidacion");
    const imagenNoticiaValidacion = document.getElementById('imagen1Validacion');
    const mensajesValidacion = document.getElementById("mensajes");
    return {
      nombreNoticiaValidacion, imagenNoticiaValidacion, mensajesValidacion
    };
  }

  private cleanValidations(paragraphsObj: any) {
    paragraphsObj.nombreNoticiaValidacion.innerHTML = "";
    paragraphsObj.mensajesValidacion.innerHTML = "";
  }

  /******** PARA PROBAR NOTICIAS LOCALMENTE *********/
  /*private getNoticias(): void {
    //this.negocioService.getNegocios().subscribe((result: any[]) => {
    //console.log("Negocios: ",result);
    //this.imgFromServer = result;
    //this.config.totalItems = result.length;
    //this.collection.count = result.length;
    this.config.totalItems = this.noticiasInfo.length;
    this.collection.count = this.noticiasInfo.length;
    this.collection.data = this.noticiasInfo;
    this.backupNoticias = this.noticiasInfo;
    this.SpinnerService.hide();

    //this.setImgString();
    //console.log("IMAGENES STRING: ", this.arregloStrings);

    //},
    //(responseError) => {
    //  this.SpinnerService.hide();
    //  this.toastr.error("Error obteniendo los negocios", responseError);
    //});
  }*/

  /* PARA PROBAR EN EL BACK */
  private getNoticias(): void {
    this.SpinnerService.show();
    this.misNoticiasService.getArticulosNoticias().subscribe((result: any[]) => {
      console.log("Noticias: ", result);
      this.config.totalItems = result.length;
      this.collection.count = result.length;
      this.collection.data = result;
      this.backupNoticias = result;
      this.SpinnerService.hide();
    },
      (responseError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error obteniendo las noticias");
        console.log("Error obteniendo las noticias: ", responseError);
      });
  }

  private resetInitialValues(): void {
    this.conteoNombre = 0;
    this.noticia = {};
    this.isFromOpenUpdate = false;
    this.isSelectedImage = false;
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

  private fromSetToArrayImages(): Array<any> {
    console.log("IMAGENES: ", this.imagenes);
    let imagesArray = Array.from(this.imagenes);
    console.log("IMAGES ARRAY: ", imagesArray);
    return imagesArray;
  }

  private payload() {
    let imagenes = this.fromSetToArrayImages();
    let payload = {
      id: (this.noticia.id) ? this.noticia.id : null,
      noticia: this.noticia.noticia,
      imagen: (imagenes.length > 0) ? imagenes[0].baseContent : this.noticia.imagen,
      valid: (this.noticia.valid !== undefined) ? this.noticia.valid : true
    }
    console.log("PAYLOAD: ", payload);
    return JSON.stringify(payload);
  }

}
