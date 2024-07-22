import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UsuariosService } from '../../app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  usuarioValidacion: string = "";
  passwordValidacion: string = "";

  constructor(private formBuilder: FormBuilder
    , private usuarioService: UsuariosService) {

    this.formGroup = this.formBuilder.group({
      usuario: ["", [Validators.required, this.validateUser()]],
      password: ["", Validators.required]
    });

  }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    this.validaciones();
    if (this.formGroup.valid) {
      console.log("Enviando info...");
      return;
      this.usuarioService.login(form).subscribe((result: any) => {
        console.log("El resultado de inicio de sesión es ", result);
      }, (responseError) => {
        console.log("ocurrio un error iniciando sesión ", responseError);
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

}
