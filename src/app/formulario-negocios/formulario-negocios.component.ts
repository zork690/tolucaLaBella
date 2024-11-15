import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import locations from '../../assets/locations.json';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NegociosService } from '../servicios/negocios/negocios.service';
import { Meta } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriasService } from '../servicios/categorias/categorias.service';
import { SubcategoriasService } from '../servicios/subcategorias/subcategorias.service';

@Component({
  selector: 'app-formulario-negocios',
  templateUrl: './formulario-negocios.component.html',
  styleUrls: ['./formulario-negocios.component.css']
})
export class FormularioNegociosComponent implements OnInit {

  modalOptions: NgbModalOptions;
  closeResult: string;
  @ViewChild("modalcreatestore") ventanaModal: ElementRef<HTMLElement>;

  public municipios: String[];
  public municipioSelected: string;
  public colonias: any[];
  public coloniaSelected: string;
  public colonia: any[];
  public codigoPostalSelected: number;

  public nombreCliente: string = "";
  public telefonoMovil: string = "";
  public correo: string = "";
  public nombreNegocio: string = "";
  public descripcionComercial: string = "";
  public calle: string = "";
  public numero: string = "";

  public conteoNombre: number = 0;
  public maxNombre: number = 50;

  public conteoNombreComercial: number = 0;
  public maxNombreComercial: number = 50;

  public conteoDescripcionComercial: number = 0;
  public maxDescripcionComercial: number = 150;

  public conteoCalle: number = 0;
  public maxCalle: number = 50;

  public conteoNumero: number = 0;
  public maxNumero: number = 10;

  public tituloModal: string;
  public mensajeModal: string;

  public categoriaSelected: any;
  public categorias: any[];
  public subcategorias: any[];
  public subcategoriaSelected: any;

  private fieldRequerido: string = "El campo es obligatorio";
  private fieldSoloAlfabeticos: string = "Números no son permitidos";
  private fieldSoloNumeros: string = "Solo números son permitidos";
  private fieldTelefonoDiezDigitos: string = "El teléfono debe ser 10 dígitos";
  private fieldSoloLetrasNumeros: string = "Solo letras o números son permitidos";
  private fieldEmail: string = "Parece que el email tiene formato no permitido";
  private onlyImagesMessage: string = "Solo imágenes son permitidas";
  private sizeOfImageMessage: string = "La imágen esta muy pesada selecciona una mas ligera";
  private subcategoriaRequerida: string = "La subcategoria es requerida";

  private imagenes: Set<any> = new Set();
  private imagen: string;

  constructor(private modalService: NgbModal
    , private router: Router
    , private negocioService: NegociosService
    , private meta: Meta
    , private SpinnerService: NgxSpinnerService
    , private categoriasService: CategoriasService
    , private subCategoriaService: SubcategoriasService
  ) {

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };

  }

  ngOnInit(): void {
    this.meta.updateTag(
      { name: "title", content: "Registrate" },
      "name=title");
    this.meta.updateTag(
      { name: "description", content: "Registra tu negocio en nuestro directorio de Toluca y aumenta tu visibilidad. Únete a una red de comercios locales y atrae nuevos clientes." },
      "name=description");
    this.meta.updateTag(
      { name: "keywords", content: "Registro Negocio, Aumenta Visibilidad, Atrae Nuevos Clientes, Negocios Toluca, Productos, Servicios" },
      "name=keywords");
    this.gettingMunicipios();
    this.gettingCategorias();
    this.municipioSelected = "CALIMAYA";
    this.municipioHasChanged(this.municipioSelected);
  }

  public municipioHasChanged(event: string): void {
    this.gettingColonias(event);
    this.coloniaHasChanged(this.coloniaSelected);
  }

  public categoriaHasChanged(event: any): void {
    this.gettingSubcategorias(event);
  }

  public coloniaHasChanged(event: string): void {
    this.gettingZipCode(event);
  }

  public countChars(event: any): void {
    switch (event.target.id) {
      case "nombreCliente":
        this.conteoNombre = this.nombreCliente.length;
        break;
      case "nombreNegocio":
        this.conteoNombreComercial = this.nombreNegocio.length;
        break;
      case "descripcionComercial":
        this.conteoDescripcionComercial = this.descripcionComercial.length;
        break;
      case "calle":
        this.conteoCalle = this.calle.length;
        break;
      case "numero":
        this.conteoNumero = this.numero.length;
        break;
    }
  }

  public convertir(evento) {
    let fileList: FileList = evento.target.files;
    const elements = this.fetchingIdsValidacionParagraph();
    let validacion = evento.target.id + "Validacion";
    elements[validacion].innerText = "";
    if (fileList.length > 0) {
      const file: File = fileList[0];
      console.log("ARCHIVO: ", file);
      this.handleInputChange(file, evento, elements);
    }
  }

  public enviarFormulario() {
    const mensajes = document.getElementById("mensajes");
    console.log("Subcategoria selected", this.subcategoriaSelected);
    if (this.isValid()) {
      mensajes.innerHTML = "";
      this.enviar();
    } else {
      mensajes
        .innerHTML = `
      <p>Parece que hay algunos campos que tienen error</p>
      `;
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

  private handleInputChange(file, event, elements) {
    this.imagen = file.name;
    let pattern = /image-*/;
    let reader = new FileReader();
    let validacion = event.target.id + "Validacion";
    if (!file.type.match(pattern)) {
      elements[validacion].innerText = this.onlyImagesMessage;
      return;
    } else if (file.size > 300000) {
      elements[validacion].innerText = this.sizeOfImageMessage;
      return;
    } else {
      elements[validacion].innerText = "";
      reader.onloadend = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  private isValid(): boolean {
    const paragraphsObj = this.fetchingIdsValidacionParagraph();
    this.cleanValidations(paragraphsObj);
    if (!this.nombreCliente.trim()) {
      paragraphsObj.nombreClienteValidacion.innerText
        = this.fieldRequerido; return false
    };
    if (!this.telefonoMovil.trim()) {
      paragraphsObj.telefonoMovilValidacion.innerText
        = this.fieldRequerido; return false
    };
    if (!this.correo.trim()) {
      paragraphsObj.correoValidacion.innerText = this.fieldRequerido;
      return false
    };
    if (!this.nombreNegocio.trim()) {
      paragraphsObj.nombreNegocioValidacion.innerText
        = this.fieldRequerido; return false
    };
    if (!this.descripcionComercial.trim()) {
      paragraphsObj.descripcionComercialValidacion.innerText
        = this.fieldRequerido; return false
    };
    if (!this.calle.trim()) {
      paragraphsObj.calleValidacion.innerText = this.fieldRequerido;
      return false
    };
    if (!this.numero.trim()) {
      paragraphsObj.numeroValidacion.innerText = this.fieldRequerido;
      return false
    };
    if (this.subcategoriaSelected == undefined) {
      paragraphsObj.subcategoriaValidacion.innerText = this.subcategoriaRequerida;
      return false
    };

    //this.cleanValidations(paragraphsObj);

    if (!this.validaSoloAlfabeticos(this.nombreCliente)) {
      paragraphsObj.nombreClienteValidacion.innerText
        = this.fieldSoloAlfabeticos; return false;
    }

    if (!this.validaSoloNumeros(this.telefonoMovil.trim())) {
      paragraphsObj.telefonoMovilValidacion.innerText
        = this.fieldSoloNumeros; return false;
    }

    if (!(this.telefonoMovil.trim().length == 10)) {
      paragraphsObj.telefonoMovilValidacion.innerText
        = this.fieldTelefonoDiezDigitos; return false;
    }

    if (!this.validaSoloAlfaNumbericos(this.nombreNegocio.trim())) {
      paragraphsObj.nombreNegocioValidacion.innerText
        = this.fieldSoloLetrasNumeros; return false;
    }

    if (!this.validaSoloAlfaNumbericos_(this.descripcionComercial.trim())) {
      paragraphsObj.descripcionComercialValidacion.innerText
        = this.fieldSoloLetrasNumeros; return false;
    }

    if (!this.validaSoloAlfaNumbericos(this.calle.trim())) {
      paragraphsObj.calleValidacion.innerText
        = this.fieldSoloLetrasNumeros; return false;
    }

    if (!this.validaSoloNumeros(this.numero.trim())) {
      paragraphsObj.numeroValidacion.innerText
        = this.fieldSoloNumeros; return false;
    }

    if (!this.validarEmailFormat(this.correo.trim())) {
      paragraphsObj.correoValidacion.innerText
        = this.fieldEmail; return false;
    }

    if (paragraphsObj.imagen1Validacion.innerText !== ""
      || paragraphsObj.imagen2Validacion.innerText !== ""
      || paragraphsObj.imagen3Validacion.innerText !== ""
      || paragraphsObj.imagen4Validacion.innerText !== ""
      || paragraphsObj.imagen5Validacion.innerText !== ""
      || paragraphsObj.imagen6Validacion.innerText !== "") {
      return false;
    }

    return true;
  }

  private gettingSubcategorias(categoria: any): void {
    console.log("Obteniendo subcategorias de: ", categoria);
    const c = encodeURIComponent(encodeURIComponent(categoria.categoria));
    this.subCategoriaService.getSubCategoriasByCategoria(c).subscribe((result) => {
      console.log("Subcategorias list: ", result);
      this.subcategorias = result;
    }
      , (error) => {
        console.log("Ocurrio un error obteniendo las subcategorias: ", error);
      });
  }



  private validarEmailFormat(inputStr: string): boolean {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(inputStr);
  }

  private validaSoloAlfabeticos(inputStr: string): boolean {
    let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/;
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

  private validaSoloNumeros(inputStr: string): boolean {
    let regex = /^[0-9]*$/;
    return regex.test(inputStr);
  }

  private cleanValidations(paragraphsObj: any) {
    paragraphsObj.nombreClienteValidacion.innerHTML = "";
    paragraphsObj.telefonoMovilValidacion.innerHTML = "";
    paragraphsObj.correoValidacion.innerHTML = "";
    paragraphsObj.nombreNegocioValidacion.innerHTML = "";
    paragraphsObj.descripcionComercialValidacion.innerHTML = "";
    paragraphsObj.calleValidacion.innerHTML = "";
    paragraphsObj.numeroValidacion.innerHTML = "";
    paragraphsObj.subcategoriaValidacion.innerHTML = "";
  }

  private fetchingIdsValidacionParagraph(): any {
    const nombreClienteValidacion = document.getElementById("nombreClienteValidacion");
    const telefonoMovilValidacion = document.getElementById("telefonoMovilValidacion");
    const correoValidacion = document.getElementById("correoValidacion");
    const nombreNegocioValidacion = document.getElementById("nombreNegocioValidacion");
    const descripcionComercialValidacion = document.getElementById("descripcionComercialValidacion");
    const calleValidacion = document.getElementById("calleValidacion");
    const numeroValidacion = document.getElementById("numeroValidacion");
    const subcategoriaValidacion = document.getElementById("subcategoriaValidacion");

    const imagen1Validacion = document.getElementById("imagen1Validacion");
    const imagen2Validacion = document.getElementById("imagen2Validacion");
    const imagen3Validacion = document.getElementById("imagen3Validacion");
    const imagen4Validacion = document.getElementById("imagen4Validacion");
    const imagen5Validacion = document.getElementById("imagen5Validacion");
    const imagen6Validacion = document.getElementById("imagen6Validacion");

    return {
      nombreClienteValidacion, telefonoMovilValidacion, correoValidacion
      , nombreNegocioValidacion, descripcionComercialValidacion, calleValidacion, numeroValidacion
      , imagen1Validacion, imagen2Validacion, imagen3Validacion, imagen4Validacion
      , subcategoriaValidacion, imagen5Validacion, imagen6Validacion
    };
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

  private gettingCategorias(): void {
    this.categoriasService.getCategorias().subscribe((result: any[]) => {
      console.log("Categorias: ", result);
      this.categorias = result;
    },
      (responseError) => {
        console.log("Error obteniendo las categorias: ", responseError);
      });
  }

  private gettingColonias(municipio: string): void {
    //console.log("municipio:",municipio);
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
    this.coloniaSelected = this.colonias[0].colonia;
  }

  private gettingZipCode(colonia: string): void {
    //console.log("colonia:",colonia);
    this.colonia = this.colonias.filter((object) => {
      return object.colonia.indexOf(colonia) != -1;
    });
    //console.log(this.colonia);
    this.codigoPostalSelected = this.colonia[0].codigo_postal;
    //console.log(this.codigoPostalSelected);
  }

  private enviar() {
    console.log("Enviando ...");
    this.tituloModal = "¡ENVIANDO!";
    this.mensajeModal = "ENVIANDO DATOS POR FAVOR ESPERE ...";
    this.abrirModal();
    this.negocioService.createBusiness(this.payload()).subscribe((result) => {
      console.log("datos enviados correctamente", result);
      this.tituloModal = "¡DATOS ENVIADOS!";
      this.mensajeModal = "TUS DATOS HAN SIDO ENVIADOS Y APARECERÁN PUBLICADOS DENTRO DE POCO";
      //this.abrirModal();
    },
      (error) => {
        console.log("ocurrió un error enviando los datos", error);
        this.tituloModal = "¡DATOS NO ENVIADOS!";
        this.mensajeModal = `TUS DATOS NO SE HAN PODIDO ENVIAR DEBIDO A UN PROBLEMA CON ELLOS,
      POR FAVOR MANDANOS UN MENSAJE A LOS TELÉFONOS DE CONTACTO Y CON GUSTO TE AYUDAREMOS`;
        //this.abrirModal();
      });
  }

  private abrirModal() {
    this.modalService.open(this.ventanaModal, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.router.navigate(["/inicio"]);
    });
  }

  /* funcion para capturar accion de teclado en modal */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private getIdUbicacion(): number {
    let locationSelected = locations.find((location) => {
      return location.municipio === this.municipioSelected
        && location.colonia === this.coloniaSelected
        && location.codigo_postal === this.codigoPostalSelected;
    });
    return locationSelected.id;
  }

  private fromSetToArrayImages(): Array<any> {
    console.log("IMAGENES: ", this.imagenes);
    let imagesArray = Array.from(this.imagenes);
    console.log("IMAGES ARRAY: ", imagesArray);
    return imagesArray;
  }

  //MANDAR EL PAYLOAD Y ESPERAR LA RESPUESTA DEL SERVER PARA SABER 
  //SI FUE OK O INFORMAR AL USUARIO DE UN ERROR

  private payload() {
    let payload = {
      calle: this.calle,
      categoria: "pendiente de categorizar",
      correo: this.correo,
      descripcionComercial: this.descripcionComercial,
      idUbicacion: this.getIdUbicacion().toString(),
      idSubcategoria: this.subcategoriaSelected.id.toString(),
      nombre: this.nombreCliente,
      nombreEmpresa: this.nombreNegocio,
      numeroExterior: this.numero,
      telefono: this.telefonoMovil,
      imagenes: this.fromSetToArrayImages()
    }
    return JSON.stringify(payload);
  }

}
