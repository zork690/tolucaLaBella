import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NegociosService } from '../servicios/negocios/negocios.service';
import { negociosInfo } from '../../assets/mockDemoNegociosInfo';
import locations from '../../assets/locations.json';
import { AppConfig } from '../../app/servicios/config/app.config';
import { AuthValidRoleService } from '../servicios/auth-valid-role/auth-valid-role.service';
import { PanelSociosService } from '../servicios/panel-socios/panel-socios.service';
import { SubcategoriasService } from '../servicios/subcategorias/subcategorias.service';
import { CategoriasService } from '../servicios/categorias/categorias.service';

export enum KEY_CODE {
  ENTER = 13
}

@Component({
  selector: 'app-mis-negocios',
  templateUrl: './mis-negocios.component.html',
  styleUrls: ['./mis-negocios.component.css']
})

export class MisNegociosComponent implements OnInit {

  backupNegocios: any[] = [];
  private tokenDecoded: any = {};

  filterText = {
    "negocio": ""
  };
  checkstatus: boolean = false;
  collection = { count: 0, data: [] };
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.collection.count
  };
  modalOptions: NgbModalOptions;
  closeResult: string;
  optionSelect = [5, 10, 15, 20];
  labels: any = {};
  maxSize = 7;
  negocio: any = {};
  ubicacionOriginal: any = {};
  categoriaOriginal: any = {};
  imagenes: any[] = [];

  public municipioSelected: string;
  public coloniaSelected: string;
  public codigoPostalSelected: number;

  public categoriaSelected: any;
  public categorias: any[];
  public subcategorias: any[];
  public subcategoriaSelected: any;

  public isToCreate: boolean = false;

  public municipios: String[];
  public colonias: any[];
  public colonia: any[];
  private isFromOpenUpdate: boolean = false;
  apiEndPoint: string;
  imagenesBasePath: string;

  public conteoNombre: number = 0;
  public nombreCliente: string = "";
  public maxNombre: number = 50;

  public conteoNombreComercial: number = 0;
  public nombreNegocio: string = "";
  public maxNombreComercial: number = 50;

  public conteoDescripcionComercial: number = 0;
  public descripcionComercial: string = "";
  public maxDescripcionComercial: number = 150;

  public conteoCalle: number = 0;
  public calle: string = "";
  public maxCalle: number = 50;

  public conteoNumero: number = 0;
  public numero: string = "";
  public maxNumero: number = 10;

  private fieldRequerido: string = "El campo es obligatorio";
  private fieldSoloAlfabeticos: string = "Números no son permitidos";
  private fieldSoloNumeros: string = "Solo números son permitidos";
  private fieldTelefonoDiezDigitos: string = "El teléfono debe ser 10 dígitos";
  private fieldSoloLetrasNumeros: string = "Solo letras o números son permitidos";
  private fieldEmail: string = "Parece que el email tiene formato no permitido";

  constructor(
    private modalService: NgbModal,
    private SpinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private negocioService: NegociosService,
    private configApp: AppConfig,
    private authRoleService: AuthValidRoleService,
    private panel: PanelSociosService,
    private subCategoriaService: SubcategoriasService,
    private categoriasService: CategoriasService
  ) {

    //this.apiEndPoint = this.config.getConfig('apiEndPoint');
    this.apiEndPoint = "https://backend.zorktech.com.mx";
    this.imagenesBasePath = this.configApp.getConfig('pathImages');

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
    this.getNegocios();
    this.tokenDecoded = this.panel.getTokenDecoded();
  }

  public municipioHasChanged(event: string): void {
    this.gettingColonias(event);
    this.coloniaHasChanged(this.coloniaSelected);
  }

  public coloniaHasChanged(event: string): void {
    this.gettingZipCode(event);
  }

  public categoriaHasChanged(event: any): void {
    this.gettingSubcategorias(event);
  }

  public addNegocio(content: any): void {
    this.isToCreate = true;
    this.municipioSelected = undefined;
    this.coloniaSelected = undefined;
    this.codigoPostalSelected = undefined;
    this.categoriaSelected = undefined;
    this.subcategoriaSelected = undefined;
    this.negocio = {
      idNegocio: 0,
      email: this.tokenDecoded.email,
      nombre: "",
      telefono: "",
      nombrEmpresa: "",
      descripcion: "",
      calle: "",
      numeroExterior: "",
      valid: false,
      ubicacion: {
        municipio: "",
        colonia: "",
        codigoPostal: "",
        id: ""
      }

    };
    this.ubicacionOriginal = { ...this.negocio.ubicacion };
    this.gettingMunicipios();
    this.gettingCategorias();
    this.open(content);
  }

  public openUpdate(content, item): void {
    this.isToCreate = false;
    console.log("ITEM: ", item);
    this.negocio = { ...item };
    this.imagenes = this.negocio.imagenes.map(object => ({ ...object }));
    this.ubicacionOriginal = { ...item.ubicacion };
    this.categoriaOriginal = { ...item.subcategoria };
    this.settingOriginaLocation();
    this.settingDefaultConteos();
    this.isFromOpenUpdate = true;
    this.gettingMunicipios();
    this.gettingCategorias();
    this.municipioHasChanged(this.municipioSelected);
    this.open(content);
  }

  public updateNegocio() {
    const mensajes = document.getElementById("mensajes");
    mensajes.innerHTML = "";
    if (!this.isValid()) {
      mensajes
        .innerHTML = `
      <p>Parece que hay algunos campos que tienen error</p>
      `;
      return;
    }
    this.negocio.ubicacion.municipio = this.municipioSelected;
    this.negocio.ubicacion.colonia = this.coloniaSelected;
    this.negocio.ubicacion.codigoPostal = this.codigoPostalSelected;
    this.negocio.ubicacion.id = this.getIdUbicacion();
    (this.isToCreate) ? this.setCreate() : this.setUpdate()

  }

  public updateImages(): void {
    console.log("NUEVOS STATUS IMAGENES: ", this.imagenes);
    this.SpinnerService.show();
    this.negocioService.updateImages(this.imagenes).subscribe((response) => {
      this.toastr.success('Actualización exitosa.');
      console.log("Respuesta: ", response);
      this.SpinnerService.hide();
      this.cancelModal();
      this.ngOnInit();
    },
      (jsonError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error al tratar de actualizar las imagenes.");
        console.log("Error al actualizar imágenes: ", jsonError);
      });
  }

  public deleteImage(imagen:any, index: any): void{
    console.log("borrando imagen: ", imagen);
    this.SpinnerService.show();
    this.negocioService.deleteImage(this.deleteImagenPayload(imagen)).subscribe((response) => {
      this.toastr.success('Se borró exitosamente.');
      console.log("Respuesta: ", response);
      this.SpinnerService.hide();
      this.imagenes.splice(index, 1);
    },
      (jsonError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error al tratar de borrar la imágen.");
        console.log("Error al borrar la imágen: ", jsonError);
      });

  }

  public cancelModal() {
    this.modalService.dismissAll();
    this.settingOriginaLocation();
  }

  public onPageChange(event) {
    this.SpinnerService.show();
    this.checkstatus = false;
    this.config.currentPage = event;
    this.SpinnerService.hide();
  }

  public countChars(event: any): void {
    switch (event.target.id) {
      case "nombreCliente":
        this.conteoNombre = this.negocio.nombre.length;
        break;
      case "nombreNegocio":
        this.conteoNombreComercial = this.negocio.nombrEmpresa.length;
        break;
      case "descripcionComercial":
        this.conteoDescripcionComercial = this.negocio.descripcion.length;
        break;
      case "calle":
        this.conteoCalle = this.negocio.calle.length;
        break;
      case "numero":
        this.conteoNumero = this.negocio.numeroExterior.length;
        break;
    }
  }

  public receiveFromChild(event: string){
    if(event === "1"){
      this.cancelModal();
      this.ngOnInit();
    }
  }

  /******** PARA PROBAR NEGOCIOS LOCALMENTE *********/
  /*private getNegocios(): void {
    //this.negocioService.getNegocios().subscribe((result: any[]) => {
    //console.log("Negocios: ",result);
    //this.imgFromServer = result;
    //this.config.totalItems = result.length;
    //this.collection.count = result.length;
    this.config.totalItems = negociosInfo.length;
    this.collection.count = negociosInfo.length;
    this.collection.data = negociosInfo;
    this.backupNegocios = negociosInfo;
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
  private getNegocios(): void {
    this.SpinnerService.show();
    if (this.authRoleService.canActivate()) {
      this.getNegociosTodos();
    } else {
      this.getNegociosUser();
    }
  }

  private gettingMunicipios(): void {
    let municipio: String = "";
    this.municipios = locations.map((location) => {
      if (municipio != location.municipio) {
        municipio = location.municipio;
        return municipio;
      } else {
        return "";
      }
    });

    this.municipios = [...new Set(this.municipios)];
    this.municipios = this.municipios.filter((municipio) => {
      return municipio !== "";
    });
    this.municipios.sort();
  }

  private gettingColonias(municipio: string): void {
    let colonias = locations.filter((location) => {
      return location.municipio == municipio;
    });

    this.colonias = colonias.sort((a, b) => {
      if (a.colonia < b.colonia) {
        return -1;
      }
      if (a.colonia > b.colonia) {
        return 1;
      }
      return 0
    });
    if (this.isFromOpenUpdate) {
      this.coloniaSelected = this.negocio.ubicacion.colonia;
    } else {
      this.coloniaSelected = this.colonias[0].colonia;
    }
  }

  private gettingZipCode(colonia: string): void {
    this.colonia = this.colonias.filter((object) => {
      return object.colonia.indexOf(colonia) != -1;
    });
    if (this.isFromOpenUpdate) {
      this.codigoPostalSelected = this.negocio.ubicacion.codigoPostal;
    } else {
      this.codigoPostalSelected = this.colonia[0].codigo_postal;
    }
    this.isFromOpenUpdate = false;
  }

  private gettingCategorias(): void {
    this.categoriasService.getCategorias().subscribe((result: any[]) => {
      console.log("Categorias: ", result);
      this.categorias = result;
      if (!this.isToCreate) {
        this.settingOriginalCategoria();
        this.categoriaHasChanged(this.categoriaSelected);
      }
    },
      (responseError) => {
        console.log("Error obteniendo las categorias: ", responseError);
      });
  }

  private open(content): void {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.ngOnInit();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.ngOnInit();
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

  private filterParams(param1, param2 = null) {
    this.collection.data = this.collection.data.filter((item) =>
      item.nombrEmpresa.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        .indexOf(param1.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()) !== -1);
    if (this.collection.data.length === 0) {
      this.collection.data = this.backupNegocios;
      //this.collection.data = negociosInfo;
      this.collection.data = this.collection.data.filter((item) =>
        item.nombrEmpresa.toString().toLowerCase().indexOf(param1.toLowerCase()) !== -1);
    }

    if (param2 !== undefined && param2 !== '' && param2 !== null) {
      if (this.collection.data.length === 0) {
        this.collection.data = this.backupNegocios;
        //this.collection.data = negociosInfo;
      }
      this.collection.data = this.collection.data.filter((item) =>
        item.catalogo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
          .indexOf(param2.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()) !== -1);
    }
    if (this.collection.data.length === 0) {
      this.SpinnerService.hide();
      this.toastr.error('No se encontraron coincidencias.');
    }
  }

  private filter(): void {
    this.SpinnerService.show();
    this.collection.data = this.backupNegocios;
    //this.collection.data = negociosInfo;
    this.filterParams(this.filterText.negocio.trim());
    this.config.totalItems = this.collection.data.length;
    this.collection.count = this.collection.data.length;
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
    this.SpinnerService.hide();
  }

  private getIdUbicacion(): number {
    let locationSelected = locations.find((location) => {
      return location.municipio === this.municipioSelected
        && location.colonia === this.coloniaSelected
        && location.codigo_postal === this.codigoPostalSelected;
    });
    return locationSelected ? locationSelected.id : 0;
  }

  private settingOriginaLocation(): void {
    this.municipioSelected = this.ubicacionOriginal.municipio;
    this.coloniaSelected = this.ubicacionOriginal.colonia;
    this.codigoPostalSelected = this.ubicacionOriginal.codigoPostal;

    this.negocio.ubicacion.municipio = this.municipioSelected;
    this.negocio.ubicacion.colonia = this.coloniaSelected;
    this.negocio.ubicacion.codigoPostal = this.codigoPostalSelected;
    this.negocio.ubicacion.id = this.getIdUbicacion();

  }

  private settingOriginalCategoria(): void {
    this.categoriaSelected = this.categoriaOriginal.categoria.nombre;
    this.subcategoriaSelected = this.categoriaOriginal.id;
  }

  private settingDefaultConteos(): void {
    this.conteoNombre = this.negocio.nombre.length;
    this.conteoNombreComercial = this.negocio.nombrEmpresa.length;
    this.conteoDescripcionComercial = this.negocio.descripcion.length;
    this.conteoCalle = this.negocio.calle.length;
    this.conteoNumero = this.negocio.numeroExterior.length;
  }

  private fetchingIdsValidacionParagraph(): any {
    const telefonoMovilValidacion = document.getElementById("telefonoMovilValidacion");
    const correoValidacion = document.getElementById("correoValidacion");
    const nombreNegocioValidacion = document.getElementById("nombreNegocioValidacion");
    const descripcionComercialValidacion = document.getElementById("descripcionComercialValidacion");
    const calleValidacion = document.getElementById("calleValidacion");
    const numeroValidacion = document.getElementById("numeroValidacion");
    const municipioValidacion = document.getElementById("municipioValidacion");
    const categoriaValidacion = document.getElementById("categoriaValidacion");
    const subcategoriaValidacion = document.getElementById("subcategoriaValidacion");

    return {
      telefonoMovilValidacion, correoValidacion
      , nombreNegocioValidacion, descripcionComercialValidacion, calleValidacion, numeroValidacion, municipioValidacion, categoriaValidacion, subcategoriaValidacion
    };
  }

  private cleanValidations(paragraphsObj: any) {
    paragraphsObj.telefonoMovilValidacion.innerHTML = "";
    paragraphsObj.correoValidacion.innerHTML = "";
    paragraphsObj.nombreNegocioValidacion.innerHTML = "";
    paragraphsObj.descripcionComercialValidacion.innerHTML = "";
    paragraphsObj.calleValidacion.innerHTML = "";
    paragraphsObj.numeroValidacion.innerHTML = "";
    paragraphsObj.municipioValidacion.innerHTML = "";
    paragraphsObj.categoriaValidacion.innerHTML = "";
    paragraphsObj.subcategoriaValidacion.innerHTML = "";
  }

  private validaSoloAlfabeticos(inputStr: string): boolean {
    let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/;
    return regex.test(inputStr);
  }

  private validaSoloNumeros(inputStr: string): boolean {
    let regex = /^[0-9]*$/;
    return regex.test(inputStr);
  }

  private validaSoloAlfaNumbericos(inputStr: string): boolean {
    let regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]*$/;
    return regex.test(inputStr);
  }

  private validaSoloAlfaNumbericos_(inputStr: string): boolean {
    let regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ,." ]*$/;
    return regex.test(inputStr);
  }

  private validarEmailFormat(inputStr: string): boolean {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(inputStr);
  }

  private isValid(): boolean {
    const paragraphsObj = this.fetchingIdsValidacionParagraph();
    this.cleanValidations(paragraphsObj);
    if (!this.negocio.telefono.trim()) {
      paragraphsObj.telefonoMovilValidacion.innerText
        = this.fieldRequerido; return false
    };
    if (!this.negocio.email.trim()) {
      paragraphsObj.correoValidacion.innerText = this.fieldRequerido;
      return false
    };
    if (!this.negocio.nombrEmpresa.trim()) {
      paragraphsObj.nombreNegocioValidacion.innerText
        = this.fieldRequerido; return false
    };
    if (!this.negocio.descripcion.trim()) {
      paragraphsObj.descripcionComercialValidacion.innerText
        = this.fieldRequerido; return false
    };
    if (!this.negocio.calle.trim()) {
      paragraphsObj.calleValidacion.innerText = this.fieldRequerido;
      return false
    };
    if (!this.negocio.numeroExterior.trim()) {
      paragraphsObj.numeroValidacion.innerText = this.fieldRequerido;
      return false
    };

    if (!this.municipioSelected || this.municipioSelected == "") {
      paragraphsObj.municipioValidacion.innerText = this.fieldRequerido;
      return false;
    }

    if (!this.categoriaSelected || this.categoriaSelected == "") {
      paragraphsObj.categoriaValidacion.innerText = this.fieldRequerido;
      return false;
    }

    if (!this.subcategoriaSelected || this.subcategoriaSelected == "") {
      paragraphsObj.subcategoriaValidacion.innerText = this.fieldRequerido;
      return false;
    }


    /* PARA VALIDAR */

    if (!this.validaSoloNumeros(this.negocio.telefono.trim())) {
      paragraphsObj.telefonoMovilValidacion.innerText
        = this.fieldSoloNumeros; return false;
    }

    if (!(this.negocio.telefono.trim().length == 10)) {
      paragraphsObj.telefonoMovilValidacion.innerText
        = this.fieldTelefonoDiezDigitos; return false;
    }

    if (!this.validaSoloAlfaNumbericos(this.negocio.nombrEmpresa.trim())) {
      paragraphsObj.nombreNegocioValidacion.innerText
        = this.fieldSoloLetrasNumeros; return false;
    }

    if (!this.validaSoloAlfaNumbericos_(this.negocio.descripcion.trim())) {
      paragraphsObj.descripcionComercialValidacion.innerText
        = this.fieldSoloLetrasNumeros; return false;
    }

    if (!this.validaSoloAlfaNumbericos(this.negocio.calle.trim())) {
      paragraphsObj.calleValidacion.innerText
        = this.fieldSoloLetrasNumeros; return false;
    }

    if (!this.validaSoloNumeros(this.negocio.numeroExterior.trim())) {
      paragraphsObj.numeroValidacion.innerText
        = this.fieldSoloNumeros; return false;
    }

    if (!this.validarEmailFormat(this.negocio.email.trim())) {
      paragraphsObj.correoValidacion.innerText
        = this.fieldEmail; return false;
    }

    return true;
  }

  private payload() {
    let payload = {
      id: (this.negocio.id) ? this.negocio.id : 0,
      idNegocio: this.negocio.idNegocio,
      calle: this.negocio.calle,
      descripcionComercial: this.negocio.descripcion,
      idUbicacion: this.negocio.ubicacion.id.toString(),
      nombreEmpresa: this.negocio.nombrEmpresa,
      numeroExterior: this.negocio.numeroExterior,
      telefono: this.negocio.telefono,
      valido: this.negocio.valid,
      idSubcategoria: this.subcategoriaSelected.toString()
    }
    console.log("PAYLOAD: ", payload);
    return JSON.stringify(payload);
  }

  private getNegociosTodos(): void {
    this.negocioService.getNegociosTodos().subscribe((result: any[]) => {
      console.log("Negocios: ", result);
      this.config.totalItems = result.length;
      this.collection.count = result.length;
      this.collection.data = result;
      this.backupNegocios = result;
      this.SpinnerService.hide();
    },
      (responseError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error obteniendo los negocios");
        console.log("Error obteniendo los negocios: ", responseError);
      });
  }

  private getNegociosUser(): void {
    this.negocioService.getNegociosByUser().subscribe((result: any[]) => {
      console.log("Negocios: ", result);
      this.config.totalItems = result.length;
      this.collection.count = result.length;
      this.collection.data = result;
      this.backupNegocios = result;
      this.SpinnerService.hide();
    },
      (responseError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error obteniendo los negocios");
        console.log("Error obteniendo los negocios: ", responseError);
      });
  }

  private setUpdate(): void {
    this.SpinnerService.show();
    this.negocioService.updateBusiness(this.payload()).subscribe((resData) => {
      this.toastr.success('Actualización exitosa.');
      this.SpinnerService.hide();
      this.cancelModal();
      this.ngOnInit();
    },
      (jsonError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error al tratar de actualizar el negocio.");
        console.log("Error al actualizar negocio: ", jsonError);
      });
  }

  private setCreate(): void {
    this.SpinnerService.show();
    this.negocioService.createBusinessUserLogged(this.payload()).subscribe((resData) => {
      this.toastr.success('Se creo negocio exitosamente.');
      this.SpinnerService.hide();
      this.cancelModal();
      this.ngOnInit();
    },
      (jsonError) => {
        this.SpinnerService.hide();
        this.toastr.error("Error al tratar de crear el negocio.");
        console.log("Error al crear negocio: ", jsonError);
      });
  }


  private gettingSubcategorias(categoria: any): void {
    const c = encodeURIComponent(encodeURIComponent(categoria));
    this.subCategoriaService.getSubCategoriasByCategoria(c).subscribe((result) => {
      console.log("Subcategorias list: ", result);
      this.subcategorias = result;
    }
      , (error) => {
        console.log("Ocurrio un error obteniendo las subcategorias: ", error);
      });
  }

  private deleteImagenPayload(imagen: any): any {
    let payload = {
      idNegocio: imagen.idNegocio,
      idImagen: imagen.id
    };
    console.log("Enviando: ", payload);
    return JSON.stringify(payload);
  }

}
