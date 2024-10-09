import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MisNoticiasService } from '../servicios/mis-noticias/mis-noticias.service';
import { ToastrService } from 'ngx-toastr';
import { seccionesNoticiaInfo } from '../../assets/mockDemoNoticiasSeccionesInfo';
import { noticiasInfo } from 'src/assets/mockDemoNoticiasInfo';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mis-noticias-secciones',
  templateUrl: './mis-noticias-secciones.component.html',
  styleUrls: ['./mis-noticias-secciones.component.css']
})
export class MisNoticiasSeccionesComponent implements OnInit {

  backupSeccionesNoticia: any[] = [];
  seccionesNoticiaInfo: any = seccionesNoticiaInfo;

  collection = { count: 0, data: [] };
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.collection.count
  };
  optionSelect = [5, 10, 15, 20];
  labels: any = {};
  maxSize = 7;
  checkstatus: boolean = false;

  public conteoNombre: number = 0;
  public maxNombre: number = 50;
  noticiaSeccion: any = {};
  public noticiaSelected: any;
  public noticias: any[] = [];

  private isFromOpenUpdate: boolean = false;
  private isSelectedImage: boolean = false;
  private imagen: string;
  private isValidImage: boolean = false;
  private imagenes: Set<any> = new Set();

  modalOptions: NgbModalOptions;
  closeResult: string;

  private fieldRequerido: string = "El campo es obligatorio";
  private fieldSoloAlfabeticos: string = "Solo espacios y letras sin acentos ni ñes";
  private onlyImagesMessage: string = "Solo imágenes son permitidas";
  private sizeOfImageMessage: string = "La imágen esta muy pesada selecciona una mas ligera";

  constructor(
    private modalService: NgbModal
    , private SpinnerService: NgxSpinnerService
    , private misNoticiasService: MisNoticiasService
    , private toastr: ToastrService
  ) { 
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit(): void {
    this.getSeccionesNoticias();
  }

  public add(content): void {
    this.resetInitialValues();
    this.getNoticias();
    this.open(content);
  }

  public openUpdate(content, item): void {
    this.noticiaSeccion = { ...item };
    console.log("noticia sección: ", item);
    this.settingDefaultConteos();
    this.isFromOpenUpdate = true;
    this.getNoticias();
    this.noticiaSelected = undefined;
    this.open(content);
  }

  public onPageChange(event) {
    this.SpinnerService.show();
    this.checkstatus = false;
    this.config.currentPage = event;
    this.SpinnerService.hide();
  }

  public countChars(event: any): void {
    switch (event.target.id) {
      case "nombreNoticiaSeccion":
        this.conteoNombre = this.noticiaSeccion.nombre.length;
        break;
    }
  }

  public addAction() {
    const mensajesIds = this.fetchingIdsValidacionParagraph();
    this.cleanValidations(mensajesIds);
    if (!this.isValid()) {
      mensajesIds.mensajesValidacion
        .innerHTML = `
      <p>Parece que hay algunos campos que tienen error</p>
      `;
      return;
    }

    this.SpinnerService.show();

    this.misNoticiasService.createNoticiaSeccion(this.payload()).subscribe((resData) => {
      (!this.isFromOpenUpdate) ?
        this.toastr.success('Se creó sección noticia.') :
        this.toastr.success('Se editó sección noticia.');
      this.SpinnerService.hide();
      this.cancelModal();
      this.ngOnInit();
    },
      (jsonError) => {
        this.SpinnerService.hide();
        (!this.isFromOpenUpdate) ?
          this.toastr.error("Error al tratar de crear la noticia sección.")
          : this.toastr.error("Error al tratar de editar la noticia sección.");
        (!this.isFromOpenUpdate) ?
          console.log("Error al crear la noticia sección: ", jsonError)
          : console.log("Error al editar la noticia sección: ", jsonError);
      });

  }

  public cancelModal() {
    this.isFromOpenUpdate = false;
    this.modalService.dismissAll();
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
      if(this.noticiaSeccion.nombre){
        if (this.noticiaSeccion.nombre.trim()) {
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

  private fromSetToArrayImages(): Array<any> {
    console.log("IMAGENES: ", this.imagenes);
    let imagesArray = Array.from(this.imagenes);
    console.log("IMAGES ARRAY: ", imagesArray);
    return imagesArray;
  }

  private payload() {
    let imagenes = this.fromSetToArrayImages();
    let payload = {
      id: (this.noticiaSeccion.id) ? this.noticiaSeccion.id : null,
      imagen: (imagenes.length > 0) ? imagenes[0].baseContent : this.noticiaSeccion.imagen,
      noticia: (this.noticiaSelected) ? this.noticiaSelected.id : this.noticiaSeccion.noticia.id,
      noticiaSeccion: this.noticiaSeccion.nombre,
      valid: (this.noticiaSeccion.valid !== undefined) ? this.noticiaSeccion.valid : true
    }
    console.log("PAYLOAD: ", payload);
    return JSON.stringify(payload);
  }

  private isValid(): boolean {
    const paragraphsObj = this.fetchingIdsValidacionParagraph();
    this.cleanValidations(paragraphsObj);
    if (!this.noticiaSeccion.nombre) {
      paragraphsObj.nombreNoticiaSeccionValidacion.innerText
        = this.fieldRequerido;
      return false;
    }
    if (!this.noticiaSeccion.nombre.trim()) {
      paragraphsObj.nombreNoticiaSeccionValidacion.innerText
        = this.fieldRequerido;
      return false;
    };

    if (!this.isFromOpenUpdate) {
      if (!this.noticiaSelected) {
        paragraphsObj.noticiaValidacion.innerText
          = this.fieldRequerido;
        return false;
      }
      if (!this.isSelectedImage) {
        paragraphsObj.imagenNoticiaValidacion.innerText
          = this.fieldRequerido;
        return false;
      }
    }

    if (!this.isValidImage) {
      return false;
    }

    console.log("Noticia Selected: ", this.noticiaSelected);


    /* PARA VALIDAR */
    if (!this.validaSoloAlfabeticos(this.noticiaSeccion.nombre)) {
      paragraphsObj.nombreNoticiaSeccionValidacion.innerText
        = this.fieldSoloAlfabeticos;
      return false;
    }
    return true;
  }

  private validaSoloAlfabeticos(inputStr: string): boolean {
    let regex = /^[a-zA-Z ]*$/;
    return regex.test(inputStr);
  }

  private cleanValidations(paragraphsObj: any) {
    paragraphsObj.nombreNoticiaSeccionValidacion.innerHTML = "";
    paragraphsObj.imagenNoticiaValidacion.innerHTML = "";
    paragraphsObj.noticiaValidacion.innerHTML = "";
    paragraphsObj.mensajesValidacion.innerHTML = "";
  }

  private fetchingIdsValidacionParagraph(): any {
    const nombreNoticiaSeccionValidacion = document.getElementById("nombreNoticiaSeccionValidacion");
    const imagenNoticiaValidacion = document.getElementById('imagen1Validacion');
    const noticiaValidacion = document.getElementById('noticiaValidacion');
    const mensajesValidacion = document.getElementById("mensajes");
    return {
      nombreNoticiaSeccionValidacion, imagenNoticiaValidacion, noticiaValidacion, mensajesValidacion
    };
  }

  private settingDefaultConteos(): void {
    this.conteoNombre = this.noticiaSeccion.nombre.length;
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

  private resetInitialValues(): void {
    this.conteoNombre = 0;
    this.noticiaSeccion = {};
    this.isFromOpenUpdate = false;
    this.noticiaSelected;
  }

  /******** PARA PROBAR SECCIONES LOCALMENTE *********/
  /*private getSeccionesNoticias(): void {
    //this.negocioService.getNegocios().subscribe((result: any[]) => {
    //console.log("Negocios: ",result);
    //this.imgFromServer = result;
    //this.config.totalItems = result.length;
    //this.collection.count = result.length;
    this.config.totalItems = this.seccionesNoticiaInfo.length;
    this.collection.count = this.seccionesNoticiaInfo.length;
    this.collection.data = this.seccionesNoticiaInfo;
    this.backupSeccionesNoticia = seccionesNoticiaInfo;
    this.SpinnerService.hide();
  }*/


  /* PARA PROBAR EN EL BACK */
  private getSeccionesNoticias(): void {
    this.SpinnerService.show();
    this.misNoticiasService.getSeccionesNoticia().subscribe((result: any[]) => {
      console.log("Secciones noticias: ", result);
      this.config.totalItems = result.length;
      this.collection.count = result.length;
      this.collection.data = result;
      this.backupSeccionesNoticia = result;
      this.SpinnerService.hide();
    },
      (responseError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error obteniendo las secciones");
        console.log("Error obteniendo las secciones: ", responseError);
      });
  }

  /******** PARA PROBAR NOTICIAS LOCALMENTE *********/
  /*private getNoticias(): void {
    //this.categoriaService.getCategorias().subscribe((result: any[]) => {
    //console.log("Categorias: ",result);
    //this.imgFromServer = result;
    //this.config.totalItems = result.length;
    //this.collection.count = result.length;
    this.noticias = noticiasInfo;
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
      this.noticias = result;
      this.SpinnerService.hide();
    },
      (responseError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error obteniendo las noticias");
        console.log("Error obteniendo las noticias: ", responseError);
      });
  }

}
