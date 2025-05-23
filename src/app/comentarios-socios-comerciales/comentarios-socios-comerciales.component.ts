import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NegociosService } from '../servicios/negocios/negocios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth/auth.service';

@Component({
  selector: 'app-comentarios-socios-comerciales',
  templateUrl: './comentarios-socios-comerciales.component.html',
  styleUrls: ['./comentarios-socios-comerciales.component.css']
})
export class ComentariosSociosComercialesComponent implements OnInit {

  @Input() idNegocio: any = {};
  public comentariosList: Array<any>;
  public modal: any;

  public isLoaded: boolean = false;
  modalOptions: NgbModalOptions;
  closeResult: string;
  comentarioNegocioFormGroup: FormGroup;
  private comentarioRequerido: string = "La reseña es requerida";
  private comentarioCaracteresInvalidos: string = "La reseña tiene caracteres no válidos";

  private valorComentario: string;

  public conteoComentario: number = 0;
  public maxComentario: number = 350;
  @ViewChild('loginModal') loginModal: any;

  constructor(
    private negocioService: NegociosService
    , private SpinnerServices: NgxSpinnerService
    , private modalService: NgbModal
    , private fb: FormBuilder
    , private auth: AuthService
  ) {

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };

  }

  ngOnInit(): void {
    console.log("obteniendo comentarios del negocio id: ", this.idNegocio);

    this.comentarioNegocioFormGroup = this.fb.group({
      comentarioFormField: [""]
    });

    this.getComentarios();
  }

  public abrirModal(content) {
    this.comentarioNegocioFormGroup.reset();
    this.conteoComentario = 0;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public onSubmitForm() {

    this.validacionesComentarioForm();

    if (this.comentarioNegocioFormGroup.valid) {
      if (!this.auth.isAuthenticated()) {
        console.log("Mandando pantalla para que se loguie...");
        const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
        buttonElement.blur(); // Remove focus from the button
        this.modal = this.abrirModal(this.loginModal);
      } else {
        this.enviarComentario();
      }

    }
  }

  public countChars(): void {
    this.conteoComentario = this.comentarioNegocioFormGroup.controls.comentarioFormField.value.length;
  }

  public receiveFromChild(data: string): void {
    console.log("From child: ", data);
    if (data == "success") {
      this.enviarComentario();
    }
  }


  private getComentarios(): void {
    this.SpinnerServices.show("spinnerComentarios");
    this.negocioService.getNegocioComentarios(this.idNegocio).subscribe((result) => {
      console.log("comentarios: ", result);
      this.comentariosList = result;
      this.SpinnerServices.hide("spinnerComentarios");
      this.isLoaded = true;
    }
      , (error) => {
        this.SpinnerServices.hide("spinnerComentarios");
        console.log("Ocurrio un error obteniendo los comentarios del negocio: ", error);
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

  private validacionesComentarioForm() {
    const comentarioTextArea = this.comentarioNegocioFormGroup.controls.comentarioFormField;
    const regex: RegExp = new RegExp('^[a-zA-ZáéíóúÁÉÍÓÚñÑ$%\"!0-9()?¿=.,#& ]+$');

    if (comentarioTextArea.value == null
      || comentarioTextArea.value == "") {
      document.getElementById("validacion").innerText = this.comentarioRequerido;
      comentarioTextArea.setErrors(Validators.required);
    } else {
      if (!regex.test(comentarioTextArea.value)) {
        document.getElementById("validacion").innerText = this.comentarioCaracteresInvalidos;
        comentarioTextArea.setErrors(Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ$%\"!0-9()?¿=.,#& ]+$'));
      } else {
        this.valorComentario = comentarioTextArea.value;
        document.getElementById("validacion").innerText = "";
      }
    }

  }

  private enviarComentario(): void {
    console.log("Enviando comentario: ", this.payloadForAddComment());
    this.SpinnerServices.show();
    this.negocioService.createNegocioComentario(this.payloadForAddComment())
      .subscribe((result: any) => {
        this.SpinnerServices.hide();
        console.log("Enviando comentario: ", result);
        this.cancelModal();
        this.getComentarios();
      }, (responseError) => {
        this.SpinnerServices.hide();
        console.log("ocurrio un error enviando el comentario: ", responseError);
        this.cancelModal();
      });
  }

  private payloadForAddComment() {
    let payload = {
      idNegocio: this.idNegocio,
      comentario: this.valorComentario
    };
    return JSON.stringify(payload);
  }

  private cancelModal() {
    this.modalService.dismissAll();
  }

}
