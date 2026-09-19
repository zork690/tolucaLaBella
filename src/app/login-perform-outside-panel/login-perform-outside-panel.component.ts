import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuariosService } from '../servicios/usuarios/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-perform-outside-panel',
  templateUrl: './login-perform-outside-panel.component.html',
  styleUrls: ['./login-perform-outside-panel.component.css']
})
export class LoginPerformOutsidePanelComponent implements OnInit {

  @Input() modal: any = {}
  @Output() messageFromChild = new EventEmitter<string>();

  formGroup: FormGroup;
  usuarioValidacion: string = "";
  passwordValidacion: string = "";

  constructor(
    private formBuilder: FormBuilder
    , private SpinnerService: NgxSpinnerService
    , private usuarioService: UsuariosService
    , private toastr: ToastrService
  ) {
    this.formGroup = this.formBuilder.group({
      usuario: ["", [Validators.required, this.validateUser()]],
      password: ["", Validators.required]
    });

  }

  ngOnInit(): void {

  }

  public onSubmit() {
    this.validaciones();
    if (this.formGroup.valid) {
      this.SpinnerService.show();
      this.usuarioService.login(this.payload()).subscribe((result: any) => {
        this.SpinnerService.hide();
        console.log("El resultado de inicio de sesión es ", result);
        localStorage.setItem('token', result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
        buttonElement.blur(); // Remove focus from the button
        this.messageFromChild.emit("success");
        this.cerrarModal();
      }, (responseError) => {
        this.SpinnerService.hide();
        console.log("ocurrio un error iniciando sesión ", responseError);
        this.toastr.error("Error al loguear al usuario: ", responseError.error.m)
      });
    }
  }

  public cerrarModal(): void {
    this.modal.close();
  }

  private payload() {
    let payload = {
      email: this.formGroup.controls.usuario.value,
      password: this.formGroup.controls.password.value
    }
    console.log("PAYLOAD: ", payload);
    return JSON.stringify(payload);
  }

  private validaciones() {
    this.usuarioValidacion = "";
    this.passwordValidacion = "";
    if (this.formGroup.controls.usuario.errors?.required) {
      this.usuarioValidacion = "Usuario es requerido";
      return;
    }
    if (this.formGroup.controls.usuario.errors?.invalidUserForm) {
      this.usuarioValidacion = "Usuario parece que no es email o celular válido";
      return;
    }
    if (this.formGroup.controls.password.errors?.required) {
      this.passwordValidacion = "Contraseña es requerida";
      return;
    }
  }

  private validateUser(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.validarEmailFormat(control.value)) {
        return null;
      } else {
        if (this.validaSoloNumeros(control.value)) {
          return null;
        } else {
          return { invalidUserForm: true };
        }
      }
    }
  }

  private validarEmailFormat(inputStr: string): boolean {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(inputStr);
  }

  private validaSoloNumeros(inputStr: string): boolean {
    let regex = /^[0-9]{10}$/;
    return regex.test(inputStr);
  }

}
