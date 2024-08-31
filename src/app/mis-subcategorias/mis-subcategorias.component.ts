import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriasService } from '../servicios/categorias/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { categoriasInfo } from '../../assets/mockDemoCategoriasInfo';
import { subCategoriasInfo } from '../../assets/mockDemoSubCategoriasInfo';
import { SubcategoriasService } from '../servicios/subcategorias/subcategorias.service';

@Component({
  selector: 'app-mis-subcategorias',
  templateUrl: './mis-subcategorias.component.html',
  styleUrls: ['./mis-subcategorias.component.css']
})
export class MisSubcategoriasComponent implements OnInit {

  modalOptions: NgbModalOptions;
  closeResult: string;
  subcategoria: any = {};
  public conteoNombre: number = 0;
  public maxNombre: number = 50;

  public categorias: any[] = [];
  public categoriaSelected: any;

  backupSubCategorias: any[] = [];

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

  private fieldRequerido: string = "El campo es obligatorio";
  private fieldSoloAlfabeticos: string = "Solo espacios y letras sin acentos ni ñes";
  private isFromOpenUpdate: boolean = false;

  constructor(
    private modalService: NgbModal,
    private SpinnerService: NgxSpinnerService,
    private categoriaService: CategoriasService,
    private subcategoriaService: SubcategoriasService,
    private toastr: ToastrService
  ) {

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };

  }

  ngOnInit(): void {
    this.getSubCategorias();
  }


  public add(content): void {
    this.resetInitialValues();
    this.getCategorias();
    this.open(content);
  }

  public cancelModal() {
    this.isFromOpenUpdate = false;
    this.modalService.dismissAll();
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

    this.subcategoriaService.createSubCategory(this.payload()).subscribe((resData) => {
      (!this.isFromOpenUpdate) ?
        this.toastr.success('Se creó subcategoría.') :
        this.toastr.success('Se editó subcategoría.');
      this.SpinnerService.hide();
      this.cancelModal();
      this.ngOnInit();
    },
      (jsonError) => {
        this.SpinnerService.hide();
        (!this.isFromOpenUpdate) ?
          this.toastr.error("Error al tratar de crear la subcategoría.")
          : this.toastr.error("Error al tratar de editar la subcategoría.");
        (!this.isFromOpenUpdate) ?
          console.log("Error al crear la subcategoría: ", jsonError)
          : console.log("Error al editar la subcategoría: ", jsonError);
      });

  }

  public onPageChange(event) {
    this.SpinnerService.show();
    this.checkstatus = false;
    this.config.currentPage = event;
    this.SpinnerService.hide();
  }

  public openUpdate(content, item): void {
    this.subcategoria = { ...item };
    console.log("subcategoria: ", item);
    this.settingDefaultConteos();
    this.isFromOpenUpdate = true;
    this.getCategorias();
    this.categoriaSelected = undefined;
    this.open(content);
  }

  public countChars(event: any): void {
    switch (event.target.id) {
      case "nombreSubcategoria":
        this.conteoNombre = this.subcategoria.nombre.length;
        break;
    }
  }

  private settingDefaultConteos(): void {
    this.conteoNombre = this.subcategoria.nombre.length;
  }

  private isValid(): boolean {
    const paragraphsObj = this.fetchingIdsValidacionParagraph();
    this.cleanValidations(paragraphsObj);
    if (!this.subcategoria.nombre) {
      paragraphsObj.nombreSubCategoriaValidacion.innerText
        = this.fieldRequerido;
      return false;
    }
    if (!this.subcategoria.nombre.trim()) {
      paragraphsObj.nombreSubCategoriaValidacion.innerText
        = this.fieldRequerido;
      return false;
    };

    if (!this.isFromOpenUpdate) {
      if (!this.categoriaSelected) {
        paragraphsObj.categoriaValidacion.innerText
          = this.fieldRequerido;
        return false;
      }
    }
    console.log("Categoria Selected: ", this.categoriaSelected);


    /* PARA VALIDAR */
    if (!this.validaSoloAlfabeticos(this.subcategoria.nombre)) {
      paragraphsObj.nombreSubCategoriaValidacion.innerText
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
    paragraphsObj.nombreSubCategoriaValidacion.innerHTML = "";
    paragraphsObj.categoriaValidacion.innerHTML = "";
    paragraphsObj.mensajesValidacion.innerHTML = "";
  }

  private fetchingIdsValidacionParagraph(): any {
    const nombreSubCategoriaValidacion = document.getElementById("nombreSubCategoriaValidacion");
    const categoriaValidacion = document.getElementById('categoriaValidacion');
    const mensajesValidacion = document.getElementById("mensajes");
    return {
      nombreSubCategoriaValidacion, categoriaValidacion, mensajesValidacion
    };
  }

  private resetInitialValues(): void {
    this.conteoNombre = 0;
    this.subcategoria = {};
    this.isFromOpenUpdate = false;
    this.categoriaSelected;
  }

  /******** PARA PROBAR CATEGORIAS LOCALMENTE *********/
  /*private getCategorias(): void {
    //this.categoriaService.getCategorias().subscribe((result: any[]) => {
    //console.log("Categorias: ",result);
    //this.imgFromServer = result;
    //this.config.totalItems = result.length;
    //this.collection.count = result.length;
    this.categorias = categoriasInfo;
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
  private getCategorias(): void {
    this.SpinnerService.show();
    this.categoriaService.getCategorias().subscribe((result: any[]) => {
      console.log("Categorias: ", result);
      this.categorias = result;
      this.SpinnerService.hide();
    },
      (responseError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error obteniendo las categorias");
        console.log("Error obteniendo las categorias: ", responseError);
      });
  }

  /******** PARA PROBAR SUBCATEGORÍAS LOCALMENTE *********/
  /*private getSubCategorias(): void {
    //this.negocioService.getNegocios().subscribe((result: any[]) => {
    //console.log("Negocios: ",result);
    //this.imgFromServer = result;
    //this.config.totalItems = result.length;
    //this.collection.count = result.length;
    this.config.totalItems = subCategoriasInfo.length;
    this.collection.count = subCategoriasInfo.length;
    this.collection.data = subCategoriasInfo;
    this.backupSubCategorias = subCategoriasInfo;
    this.SpinnerService.hide();
  }*/


  /* PARA PROBAR EN EL BACK */
  private getSubCategorias(): void {
    this.SpinnerService.show();
    this.subcategoriaService.getSubCategorias().subscribe((result: any[]) => {
      console.log("SubCategorias: ", result);
      this.config.totalItems = result.length;
      this.collection.count = result.length;
      this.collection.data = result;
      this.backupSubCategorias = result;
      this.SpinnerService.hide();
    },
      (responseError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error obteniendo las subcategorias");
        console.log("Error obteniendo las subcategorias: ", responseError);
      });
  }

  private payload() {
    let payload = {
      id: (this.subcategoria.id) ? this.subcategoria.id : null,
      categoria: (this.categoriaSelected) ? this.categoriaSelected.id : this.subcategoria.categoria.id,
      subcategoria: this.subcategoria.nombre,
      valid: (this.subcategoria.valid !== undefined) ? this.subcategoria.valid : true
    }
    console.log("PAYLOAD: ", payload);
    return JSON.stringify(payload);
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

}
