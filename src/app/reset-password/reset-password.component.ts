import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from '../servicios/registro/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  enviado = false;

  constructor(
    private formBuilder: FormBuilder
    , private SpinnerService: NgxSpinnerService
    , private toastr: ToastrService
    , private registroService: RegistroService
    , private router: Router
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.resetPasswordForm.controls; }


  onSubmit() {
    //this.validaciones();
    this.enviado = true;
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.SpinnerService.show();
    console.log("ENVIANDO: ", this.resetPasswordForm.value);
    this.registroService.sendEmailPasswordReset(this.resetPasswordForm.controls.correo.value)
    .subscribe((result) => {
      this.SpinnerService.hide();
      console.log("RESULTADO ENVIANDO EMAIL RESET PASSWORD: ", result);
      this.toastr.success("Email enviado exitosamente, favor de revisar su correo.");
      this.router.navigate(['/login']);
    },
      (error) => {
        this.SpinnerService.hide();
        console.log("ERROR ENVIANDO EMAIL RESET PASSWORD: ", error);
        this.toastr.error('envio de email erroneo.', error.error.m);
      });

  }

}
