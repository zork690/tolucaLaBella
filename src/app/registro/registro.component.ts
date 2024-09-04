import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegistroService } from '../../app/servicios/registro/registro.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formularioRegistro: FormGroup;
  enviado = false;
  passwordValidacion: string;

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService
    , private SpinnerService: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get f() { return this.formularioRegistro.controls; }

  onSubmit() {
    this.SpinnerService.show();
    if (!this.validaciones()) return;
    this.enviado = true;
    // stop here if form is invalid
    if (this.formularioRegistro.invalid) {
      return;
    }

    console.log("ENVIANDO: ", this.formularioRegistro.value);
    this.registroService.registrarUsuario(this.formularioRegistro.value).subscribe((result) => {
      console.log("RESULTADO REGISTRANDO USUARIO: ", result);
      this.registroService.sendEmailVerification(this.formularioRegistro.controls.email.value)
        .subscribe((result) => {
          console.log("RESULTADO ENVIANDO EMAIL VERIFICACIÓN: ", result);
        },
          (error) => {
            console.log("ERROR: ENVIANDO EMAIL VERIFICACIÓN", error);
          });
    },
      (error) => {
        console.log("ERROR REGISTRANDO USUARIO: ", error);
      });

  }

  private validaciones(): boolean {
    if (this.formularioRegistro.controls.password.value
      !== this.formularioRegistro.controls.confirmPassword.value) {
      this.passwordValidacion = "El password y la confirmación no coinciden";
      return false;
    } else {
      this.passwordValidacion = "";
      return true;
    }
  }

}
