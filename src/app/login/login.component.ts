import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import { UsuariosService } from '../../app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder
    , private usuarioService: UsuariosService) {

    this.formGroup = this.formBuilder.group({
      usuario:["", Validators.required]
      ,password:["", Validators.required]
    });

   }

  ngOnInit(): void {
  }

  onSubmit(form:FormGroup){
    console.log("usuario: ",form.value.usuario);
    console.log("pass: ", form.value.password);

    this.usuarioService.login(form).subscribe((result: any) =>{
      console.log("El resultado de inicio de sesión es ", result);
    },(responseError)=>{
      console.log("ocurrio un error iniciando sesión ", responseError);
    });
  }

}
