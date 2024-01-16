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

const routes: Routes = [
  {
    path: 'principal',
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
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
