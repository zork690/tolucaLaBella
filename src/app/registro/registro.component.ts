import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegistroService } from '../../app/servicios/registro/registro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formularioRegistro: FormGroup;
  enviado = false;
  passwordValidacion: string;
  nombreValidacion: string;
  usuarioValidacion: string;
  apellidoValidacion: string;
  phoneValidacion: string;
  confirmPasswordValidacion: string;
  private pass: string;

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService
    , private SpinnerService: NgxSpinnerService
    , private toastr: ToastrService
    , private router: Router

  ) { }

  ngOnInit(): void {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required, this.validateNombre()]],
      apellido: ['', [Validators.required, this.validateApellido()]],
      telefono: ['', [Validators.required, this.validatePhone()]],
      usuario: ['', [Validators.required, this.validateUser()]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validatePassword()]],
      confirmPassword: ['', [Validators.required, this.validateConfirmPassword()]]
    });
  }

  get f() { return this.formularioRegistro.controls; }

  onSubmit() {
    this.validaciones();
    this.enviado = true;
    // stop here if form is invalid
    if (this.formularioRegistro.invalid) {
      return;
    }

    this.SpinnerService.show();
    console.log("ENVIANDO: ", this.formularioRegistro.value);
    this.registroService.registrarUsuario(this.formularioRegistro.value).subscribe((result) => {
      this.SpinnerService.hide();
      console.log("RESULTADO REGISTRANDO USUARIO: ", result);
      this.SpinnerService.show();
      this.registroService.sendEmailVerification(this.formularioRegistro.controls.correo.value)
        .subscribe((result) => {
          this.SpinnerService.hide();
          console.log("RESULTADO ENVIANDO EMAIL VERIFICACIÓN: ", result);
          this.toastr.success('Registro exitoso, se envio un correo al correo indicado para verificación de la cuenta antes de poderla usar.');
          this.router.navigate(['/login']);
        },
          (error) => {
            this.SpinnerService.hide();
            console.log("ERROR: ENVIANDO EMAIL VERIFICACIÓN", error);
            this.toastr.error('Registro erroneo.', error.error.m);
          });
    },
      (error) => {
        this.SpinnerService.hide();
        console.log("ERROR REGISTRANDO USUARIO: ", error);
        this.toastr.error('Registro erroneo.', error.error.m);
      });

  }

  private validaciones() {
    if (this.formularioRegistro.controls.nombre.errors?.invalidNameForm) {
      this.nombreValidacion = "Nombre parece que contiene carácteres no permitidos";
    } else {
      this.nombreValidacion = "";
    }
    if (this.formularioRegistro.controls.apellido.errors?.invalidApellidoForm) {
      this.apellidoValidacion = "Apellido parece que contiene carácteres no permitidos";
    } else {
      this.apellidoValidacion = "";
    }
    if (this.formularioRegistro.controls.telefono.errors?.invalidPhoneForm) {
      this.phoneValidacion = "Teléfono parece que no es válido";
    } else {
      this.phoneValidacion = "";
    }
    if (this.formularioRegistro.controls.usuario.errors?.invalidUserForm) {
      this.usuarioValidacion = "Usuario parece que contiene carácteres no permitidos";
    } else {
      this.usuarioValidacion = "";
    }
    if (this.formularioRegistro.controls.password.errors?.invalidPasswordForm) {
      this.passwordValidacion = "Password parece que contiene carácteres no permitidos o longitud mínima de 8 carácteres";
    } else {
      this.passwordValidacion = "";
    }
    if (this.formularioRegistro.controls.confirmPassword.errors?.invalidConfirmPasswordForm) {
      this.confirmPasswordValidacion = "El password y la confirmación no coinciden";
    } else {
      this.confirmPasswordValidacion = "";
    }
  }

  private validateNombre(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.validaSoloAlfabeticos(control.value)) {
        return null;
      } else {
        return { invalidNameForm: true };
      }
    }
  }

  private validateApellido(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.validaSoloAlfabeticos(control.value)) {
        return null;
      } else {
        return { invalidApellidoForm: true };
      }
    }
  }

  private validatePhone(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.validaSoloNumericos(control.value)) {
        return null;
      } else {
        return { invalidPhoneForm: true };
      }
    }
  }

  private validateUser(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.validaSoloAlfanumericos(control.value)) {
        return null;
      } else {
        return { invalidUserForm: true };
      }
    }
  }

  private validatePassword(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.validaPassword(control.value)) {
        return null;
      } else {
        return { invalidPasswordForm: true };
      }
    }
  }

  private validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.validaConfirmPassword(control.value)) {
        return null;
      } else {
        return { invalidConfirmPasswordForm: true };
      }
    }
  }

  private validaSoloAlfabeticos(inputStr: string): boolean {
    let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
    return regex.test(inputStr);
  }

  private validaSoloAlfanumericos(inputStr: string): boolean {
    let regex = /^[a-zA-Z0-9]*$/;
    return regex.test(inputStr);
  }

  private validaSoloNumericos(inputStr: string): boolean {
    let regex = /^[0-9]{10}$/;
    return regex.test(inputStr);
  }

  private validaPassword(inputStr: string): boolean {
    this.pass = inputStr;
    let regex = /^[a-zA-Z0-9!$?¿#.,]{8,}$/;
    return regex.test(inputStr);
  }

  private validaConfirmPassword(inputStr: string): boolean {
    console.log("pass",this.pass);
    console.log("conf",inputStr);
    return inputStr == this.pass;
  }

}
