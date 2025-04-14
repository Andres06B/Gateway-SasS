import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/Landing/landing.component';
import { LoginAdminComponent } from './pages/Admin/login-admin/login-admin.component';
import { Error404Component } from './shared/Components/error404/error404.component';
import { LoginUserComponent } from './pages/Users/login-users/login-user.component';
import { AboutAdminComponent } from './pages/Admin/about-admin/about-admin.component';
import { AdministrativeInformationComponent } from './pages/Admin/administrative-information/administrative-information.component';
import { InicioComponent } from './pages/Admin/dashboard/views/inicio/inicio.component';
import { PrediccionesComponent } from './pages/Admin/dashboard/views/predicciones/predicciones.component';
import { UsuariosComponent } from './pages/Admin/dashboard/views/usuarios/usuarios.component';
import { HabitacioenesComponent } from './pages/Admin/dashboard/views/habitacioenes/habitacioenes.component';
import { PagosComponent } from './pages/Admin/dashboard/views/pagos/pagos.component';
import { PaginaWebComponent } from './pages/Admin/dashboard/views/pagina-web/pagina-web.component';
import { ReservasComponent } from './pages/Admin/dashboard/views/reservas/reservas.component';
import { ConfiguracionComponent } from './pages/Admin/dashboard/views/configuracion/configuracion.component';
//import { LandingComponent } from './view/landing/landing.component';

const routes: Routes = [

  {
    path: '', component: LandingComponent
  }, // Página principal
  {
    path: 'landing', component: LandingComponent
  },

  //{ path: '**', redirectTo: '', pathMatch: 'full' }, // Redirige rutas desconocidas a Landing
  { path: 'loginAdmin', component: LoginAdminComponent }, // Página de inicio de sesión
  { path: 'error404', component: Error404Component }, // Página de error 404
  {path: 'loginUser', component: LoginUserComponent}, // Página de inicio de sesión usuarios
  {path:'about', component: AboutAdminComponent}, // Página de información sobre la aplicaciónAdministrativa
  {path:'infoAdmi', component: AdministrativeInformationComponent}, // Página de información sobre la aplicaciónAdministrativa
  {path: 'inicio', component: InicioComponent},
  {path: 'predicciones', component: PrediccionesComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'habitaciones', component: HabitacioenesComponent},
  {path: 'pagos', component: PagosComponent},
  {path: 'paginaweb', component: PaginaWebComponent}, // Página de información sobre la aplicaciónAdministrativa
  {path: 'reservas', component: ReservasComponent}, // Página de reservas
  {path: 'configuracion', component: ConfiguracionComponent}, // Página de configuración
  {path: 'pagina-web', component: PaginaWebComponent}, // Redirige rutas desconocidas a Landing}





]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
