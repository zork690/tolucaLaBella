import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../app/servicios/registro/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formularioRegistro: FormGroup;
  enviado = false;

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService

    ) { }

  ngOnInit(): void {
    this.formularioRegistro = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
  });
  }

  get f() { return this.formularioRegistro.controls; }

  onSubmit() {
    this.enviado = true;
    // stop here if form is invalid
    if (this.formularioRegistro.invalid) {
      return;
    }

    console.log("ENVIANDO: ",this.formularioRegistro.value);
    this.registroService.registrarUsuario(this.formularioRegistro.value).subscribe((result) => {
      console.log("RESULTADO: ", result);
    },
    (error) => {
      console.log("ERROR: ", error);
    });

  }


}
