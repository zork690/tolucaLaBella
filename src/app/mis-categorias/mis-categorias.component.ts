import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriasService } from '../servicios/categorias/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { categoriasInfo } from '../../assets/mockDemoCategoriasInfo';

@Component({
  selector: 'app-mis-categorias',
  templateUrl: './mis-categorias.component.html',
  styleUrls: ['./mis-categorias.component.css']
})
export class MisCategoriasComponent implements OnInit {

  modalOptions: NgbModalOptions;
  closeResult: string;

  public conteoNombre: number = 0;
  public nombreCategoria: string = "";
  public maxNombre: number = 50;

  categoria: any = {};
  private imagenes: Set<any> = new Set();
  private imagen: string;

  private isSelectedImage: boolean = false;
  private isValidImage: boolean = false;

  private fieldRequerido: string = "El campo es obligatorio";
  private fieldSoloAlfabeticos: string = "Números no son permitidos";
  private onlyImagesMessage: string = "Solo imágenes son permitidas";
  private sizeOfImageMessage: string = "La imágen esta muy pesada selecciona una mas ligera";
  private isFromOpenUpdate: boolean = false;

  backupCategorias: any[] = [];
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

  constructor(
    private modalService: NgbModal,
    private SpinnerService: NgxSpinnerService,
    private categoriasService: CategoriasService,
    private toastr: ToastrService
  ) {

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };

  }

  ngOnInit(): void {
    this.getCategorias();
  }

  public addCategory(content): void {
    this.resetInitialValues();
    this.open(content);
  }


  public countChars(event: any): void {
    switch (event.target.id) {
      case "nombreCategoria":
        this.conteoNombre = this.categoria.nombre.length;
        break;
    }
  }

  public addCategoryAction() {
    const mensajesIds = this.fetchingIdsValidacionParagraph();
    this.cleanValidations(mensajesIds);
    if (!this.isValid()) {
      mensajesIds.mensajesValidacion
        .innerHTML = `
      <p>Parece que hay algunos campos que tienen error</p>
      `;
      return;
    }

    console.log("Categoria: ", this.categoria);
    this.SpinnerService.show();

    this.categoriasService.createCategory(this.payload()).subscribe((resData) => {
      (!this.isFromOpenUpdate) ?
        this.toastr.success('Se creó categoria.') :
        this.toastr.success('Se editó categoria.');
      this.SpinnerService.hide();
      this.cancelModal();
      this.ngOnInit();
    },
      (jsonError) => {
        this.SpinnerService.hide();
        (!this.isFromOpenUpdate) ? 
        this.toastr.error("Error al tratar de crear la categoría.")
        : this.toastr.error("Error al tratar de editar la categoría.");
        (!this.isFromOpenUpdate) ? 
        console.log("Error al crear la categoría: ", jsonError)
        : console.log("Error al editar la categoría: ", jsonError);
        this.imagenes.clear();
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
    elements.imagenCategoriaValidacion.innerText = "";
    if (fileList.length > 0) {
      const file: File = fileList[0];
      console.log("ARCHIVO: ", file);
      this.handleInputChange(file, elements);
    }
  }

  public onPageChange(event) {
    this.SpinnerService.show();
    this.checkstatus = false;
    this.config.currentPage = event;
    this.SpinnerService.hide();
  }

  public openUpdate(content, item): void {
    this.categoria = { ...item };
    this.settingDefaultConteos();
    this.isFromOpenUpdate = true;
    this.isValidImage = true;
    this.open(content);
  }

  private settingDefaultConteos(): void {
    this.conteoNombre = this.categoria.nombre.length;
  }

  private handleInputChange(file, elements) {
    this.imagen = file.name;
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.isValidImage = false;
      elements.imagenCategoriaValidacion.innerText = this.onlyImagesMessage;
      return;
    } else if (file.size > 800000) {
      this.isValidImage = false;
      elements.imagenCategoriaValidacion.innerText = this.sizeOfImageMessage;
      return;
    } else {
      this.isValidImage = true;
      elements.imagenCategoriaValidacion.innerText = "";
      if (this.categoria.nombre.trim()) {
        elements.mensajesValidacion.innerHTML = "";
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

  private isValid(): boolean {
    const paragraphsObj = this.fetchingIdsValidacionParagraph();
    this.cleanValidations(paragraphsObj);
    if (!this.categoria.nombre) {
      paragraphsObj.nombreCategoriaValidacion.innerText
        = this.fieldRequerido;
      return false;
    }
    if (!this.categoria.nombre.trim()) {
      paragraphsObj.nombreCategoriaValidacion.innerText
        = this.fieldRequerido;
      return false;
    };

    if (!this.isFromOpenUpdate) {
      if (!this.isSelectedImage) {
        paragraphsObj.imagenCategoriaValidacion.innerText
          = this.fieldRequerido;
        return false;
      }
    }


    if (!this.isValidImage) {
      return false;
    }
    /* PARA VALIDAR */
    if (!this.validaSoloAlfabeticos(this.categoria.nombre)) {
      paragraphsObj.nombreCategoriaValidacion.innerText
        = this.fieldSoloAlfabeticos;
      return false;
    }
    return true;
  }

  private cleanValidations(paragraphsObj: any) {
    paragraphsObj.nombreCategoriaValidacion.innerHTML = "";
    paragraphsObj.mensajesValidacion.innerHTML = "";
  }

  private fetchingIdsValidacionParagraph(): any {
    const nombreCategoriaValidacion = document.getElementById("nombreCategoriaValidacion");
    const imagenCategoriaValidacion = document.getElementById('imagen1Validacion');
    const mensajesValidacion = document.getElementById("mensajes");
    return {
      nombreCategoriaValidacion, imagenCategoriaValidacion, mensajesValidacion
    };
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

  private validaSoloAlfabeticos(inputStr: string): boolean {
    let regex = /^[a-zA-Z ]*$/;
    return regex.test(inputStr);
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
      id: (this.categoria.id) ? this.categoria.id : null,
      categoria: this.categoria.nombre,
      imagen: (imagenes.length > 0) ? imagenes[0].baseContent : this.categoria.imagen,
      valid: (this.categoria.valid) ? this.categoria.valid : true
    }
    console.log("PAYLOAD: ", payload);
    return JSON.stringify(payload);
  }

  private resetInitialValues(): void{
    this.conteoNombre = 0;
    this.categoria = {};
    this.isFromOpenUpdate = false;
    this.isSelectedImage = false;
  }

  /******** PARA PROBAR CATEGORÍAS LOCALMENTE *********/
  private getCategorias(): void {
    //this.negocioService.getNegocios().subscribe((result: any[]) => {
    //console.log("Negocios: ",result);
    //this.imgFromServer = result;
    //this.config.totalItems = result.length;
    //this.collection.count = result.length;
    this.config.totalItems = categoriasInfo.length;
    this.collection.count = categoriasInfo.length;
    this.collection.data = categoriasInfo;
    this.backupCategorias = categoriasInfo;
    this.SpinnerService.hide();

    //this.setImgString();
    //console.log("IMAGENES STRING: ", this.arregloStrings);

    //},
    //(responseError) => {
    //  this.SpinnerService.hide();
    //  this.toastr.error("Error obteniendo los negocios", responseError);
    //});
  }


  /* PARA PROBAR EN EL BACK */
  /*private getCategorias(): void {
    this.SpinnerService.show();
    this.categoriasService.getCategorias().subscribe((result: any[]) => {
      console.log("Categorias: ", result);
      this.config.totalItems = result.length;
      this.collection.count = result.length;
      this.collection.data = result;
      this.backupCategorias = result;
      this.SpinnerService.hide();
    },
      (responseError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error obteniendo las categorias");
        console.log("Error obteniendo las categorias: ", responseError);
      });
  }*/


}
