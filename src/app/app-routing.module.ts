import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { FontsIconosComponent } from './fonts-iconos/fonts-iconos.component';
import { VentanasModalesComponent } from './ventanas-modales/ventanas-modales.component';
//import { FormulariosComponent } from './formularios/formularios.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { AuthSecureService } from './secure/auth-secure.service';
import { FormatoPagoComponent } from './formato-pago/formato-pago.component';
import { FormularioNegociosComponent } from './formulario-negocios/formulario-negocios.component';
import { SociosComercialesComponent } from './socios-comerciales/socios-comerciales.component';
import { DetalleSociosComercialesComponent } from 
'./detalle-socios-comerciales/detalle-socios-comerciales.component';
import { PanelComponent } from 
'./panel/panel.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { MarketingDigitalComponent } from './marketing-digital/marketing-digital.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiasDetalleComponent } from './noticias-detalle/noticias-detalle.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '',  redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: PaginaInicialComponent },
      { path: 'fonts', component: FontsIconosComponent },
      { path: 'modales', component: VentanasModalesComponent },
      //{ path: 'formularios', component: FormulariosComponent },
      { path: 'imagenes', component: ImagenesComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'login', component: LoginComponent },
      { path: 'formato-pago', component: FormatoPagoComponent },
      { path: 'registrate', component: FormularioNegociosComponent },
      { path: 'directorio-de-negocios', component: SociosComercialesComponent },
      { path: 'directorio-de-negocios/:idNegocio', component: DetalleSociosComercialesComponent },
      { path: 'panel-socios', component: PanelComponent },
      { path: 'sobre-nosotros', component: NosotrosComponent },
      { path: 'marketing-digital', component: MarketingDigitalComponent },
      { path: 'noticias-de-toluca', component: NoticiasComponent },
      { path: 'noticias-de-toluca/:idNoticia', component: NoticiasDetalleComponent },
      { path: 'reset-password', component: ResetPasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
