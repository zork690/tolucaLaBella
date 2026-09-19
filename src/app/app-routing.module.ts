import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { FontsIconosComponent } from './fonts-iconos/fonts-iconos.component';
import { VentanasModalesComponent } from './ventanas-modales/ventanas-modales.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
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
import { MisNegociosComponent } from './mis-negocios/mis-negocios.component';
import { MisCategoriasComponent } from './mis-categorias/mis-categorias.component';
import { CategoriasSociosComercialesComponent } from './categorias-socios-comerciales/categorias-socios-comerciales.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MisSubcategoriasComponent } from './mis-subcategorias/mis-subcategorias.component';
import { AuthGuardService } from './servicios/auth-guard/auth-guard.service';
import { MisArticulosComponent } from './mis-articulos/mis-articulos.component';
import { MisHistoriasDeExitoComponent } from './mis-historias-de-exito/mis-historias-de-exito.component';
import { MisNoticiasComponent } from './mis-noticias/mis-noticias.component';
import { NoticiasArticulosComponent } from './noticias-articulos/noticias-articulos.component';
import { SubcategoriasSociosComercialesComponent } from './subcategorias-socios-comerciales/subcategorias-socios-comerciales.component';
import { MisNoticiasSeccionesComponent } from './mis-noticias-secciones/mis-noticias-secciones.component';
import { AuthValidRoleService } from './servicios/auth-valid-role/auth-valid-role.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: PaginaInicialComponent },
      { path: 'fonts', component: FontsIconosComponent },
      { path: 'modales', component: VentanasModalesComponent },
      { path: 'imagenes', component: ImagenesComponent },
      { path: 'registrate', component: RegistroComponent },
      { path: 'login', component: LoginComponent },
      { path: 'formato-pago', component: FormatoPagoComponent },
      { path: 'registro', component: FormularioNegociosComponent },
      { path: 'directorio-de-negocios', component: SociosComercialesComponent}, 
      { path: 'directorio-de-negocios/:categoria', component: CategoriasSociosComercialesComponent },
      { path: 'directorio-de-negocios/:categoria/:subcategoria', component: SubcategoriasSociosComercialesComponent},
      { path: 'directorio-de-negocios/:categoria/:subcategoria/:negocio', component: DetalleSociosComercialesComponent },
      {
        path: 'panel-socios', component: PanelComponent,
        canActivate: [AuthGuardService],
        children: [
          { path: 'mis-categorias', component: MisCategoriasComponent, canActivate:[AuthValidRoleService] },
          { path: 'mis-subcategorias', component: MisSubcategoriasComponent, canActivate:[AuthValidRoleService] },
          { path: 'mis-articulos', component: MisArticulosComponent, canActivate:[AuthValidRoleService] },
          { path: 'mis-negocios', component: MisNegociosComponent },
          { path: 'mis-historias-de-exito', component: MisHistoriasDeExitoComponent, canActivate:[AuthValidRoleService] },
          { path: 'mis-noticias', component: MisNoticiasComponent, canActivate:[AuthValidRoleService] },
          { path: 'mis-noticias-secciones', component: MisNoticiasSeccionesComponent, canActivate:[AuthValidRoleService] }
        ]
      },
      { path: 'sobre-nosotros', component: NosotrosComponent },
      { path: 'marketing-digital', component: MarketingDigitalComponent },
      { 
        path: 'noticias-de-toluca', component: NoticiasComponent,
        children: [
          { path: 'noticias/:categoria', component: NoticiasArticulosComponent}
        ]
      },
      { path: 'noticias-de-toluca/noticias/:categoria/:articulo', component: NoticiasDetalleComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      {path: 'pagina-no-encontrada', component: NotFoundComponent},
      {path: '**', redirectTo: '/pagina-no-encontrada'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
