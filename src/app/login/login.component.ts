import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UsuariosService } from '../../app/servicios/usuarios/usuarios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../servicios/auth/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  usuarioValidacion: string = "";
  passwordValidacion: string = "";

  constructor(
    private formBuilder: FormBuilder
    , private usuarioService: UsuariosService
    , private SpinnerService: NgxSpinnerService
    , private toastr: ToastrService
    , private authService: AuthService
    , private router: Router
    , private modalService: NgbModal
  ) {

    this.formGroup = this.formBuilder.group({
      usuario: ["", [Validators.required, this.validateUser()]],
      password: ["", Validators.required]
    });

  }

  ngOnInit(): void {
    this.cancelModal();
  }


  onSubmit(form: FormGroup) {
    this.validaciones();
    if (this.formGroup.valid) {
      this.SpinnerService.show();
      this.usuarioService.login(this.payload()).subscribe((result: any) => {
        this.SpinnerService.hide();
        console.log("El resultado de inicio de sesión es ", result);
        localStorage.setItem('token', result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        this.router.navigate(['/panel-socios']);
      }, (responseError) => {
        this.SpinnerService.hide();
        console.log("ocurrio un error iniciando sesión ", responseError);
        this.toastr.error("Error al loguear al usuario: ", responseError.error.m)
      });
    }
  }

  get registerFormControl() {
    return this.formGroup.controls;
  }

  private validarEmailFormat(inputStr: string): boolean {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(inputStr);
  }

  private validaSoloNumeros(inputStr: string): boolean {
    let regex = /^[0-9]{10}$/;
    return regex.test(inputStr);
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

  private payload() {
    let payload = {
      email: this.formGroup.controls.usuario.value,
      password: this.formGroup.controls.password.value
    }
    console.log("PAYLOAD: ", payload);
    return JSON.stringify(payload);
  }

  private cancelModal() {
    this.modalService.dismissAll();
  }

}
