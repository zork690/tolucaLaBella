import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { FontsIconosComponent } from './fonts-iconos/fonts-iconos.component';
import { VentanasModalesComponent } from './ventanas-modales/ventanas-modales.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { RegistroComponent } from './registro/registro.component';
import { AppConfig } from './servicios/config/app.config';
import { Interceptor } from './servicios/config/interceptor.config';
import { LoginComponent } from './login/login.component';
import { AuthSecureService } from './secure/auth-secure.service';
import { APP_INITIALIZER } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination';
import { ImagenesComponent } from './imagenes/imagenes.component';

export function initConfig(config: AppConfig) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    FontsIconosComponent,
    VentanasModalesComponent,
    FormulariosComponent,
    LayoutsComponent,
    RegistroComponent,
    LoginComponent,
    ImagenesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthSecureService, AppConfig,
  { 
    provide: APP_INITIALIZER,
    useFactory: initConfig,
    deps: [AppConfig],
    multi: true 
  },
  { provide: HTTP_INTERCEPTORS, 
    useClass: Interceptor, 
    multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }