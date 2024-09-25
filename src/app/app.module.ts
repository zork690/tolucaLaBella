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
import { FormatoPagoComponent } from './formato-pago/formato-pago.component';
import { FormularioNegociosComponent } from './formulario-negocios/formulario-negocios.component';
import { SeccionesNavComponent } from './secciones-nav/secciones-nav.component';
import { SociosComercialesComponent } from './socios-comerciales/socios-comerciales.component';
import { VentanaModalInfoComponent } from './ventana-modal-info/ventana-modal-info.component';
import { DetalleSociosComercialesComponent } from './detalle-socios-comerciales/detalle-socios-comerciales.component';
import { PanelComponent } from './panel/panel.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { MarketingDigitalComponent } from './marketing-digital/marketing-digital.component';
import { FooterComponent } from './footer/footer.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiasDetalleComponent } from './noticias-detalle/noticias-detalle.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MisNegociosComponent } from './mis-negocios/mis-negocios.component';
import { MisCategoriasComponent } from './mis-categorias/mis-categorias.component';
import { CategoriasSociosComercialesComponent } from './categorias-socios-comerciales/categorias-socios-comerciales.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MisSubcategoriasComponent } from './mis-subcategorias/mis-subcategorias.component';
import { MisDestinosPopularesComponent } from './mis-destinos-populares/mis-destinos-populares.component';
import { MisRecomendacionesComponent } from './mis-recomendaciones/mis-recomendaciones.component';
import { MisArticulosComponent } from './mis-articulos/mis-articulos.component';
import { MisHistoriasDeExitoComponent } from './mis-historias-de-exito/mis-historias-de-exito.component';
import { MisNoticiasComponent } from './mis-noticias/mis-noticias.component';
import { MisArticulosAddImagesComponent } from './mis-articulos-add-images/mis-articulos-add-images.component';
import { MisArticulosEditImagesComponent } from './mis-articulos-edit-images/mis-articulos-edit-images.component';

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
    ImagenesComponent,
    FormatoPagoComponent,
    FormularioNegociosComponent,
    SeccionesNavComponent,
    SociosComercialesComponent,
    VentanaModalInfoComponent,
    DetalleSociosComercialesComponent,
    PanelComponent,
    NosotrosComponent,
    MarketingDigitalComponent,
    FooterComponent,
    NoticiasComponent,
    NoticiasDetalleComponent,
    ResetPasswordComponent,
    MisNegociosComponent,
    MisCategoriasComponent,
    CategoriasSociosComercialesComponent,
    NotFoundComponent,
    MisSubcategoriasComponent,
    MisDestinosPopularesComponent,
    MisRecomendacionesComponent,
    MisArticulosComponent,
    MisHistoriasDeExitoComponent,
    MisNoticiasComponent,
    MisArticulosAddImagesComponent,
    MisArticulosEditImagesComponent
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