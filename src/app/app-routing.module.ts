import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginAdminComponent } from './pages/Quantum Admin/login-admin/login-admin.component';
import { Error404Component } from './shared/Components/error404/error404.component';
import { LoginUserComponent } from './pages/Quantum Users/login-users/login-user.component';
import { AboutAdminComponent } from './pages/Quantum Admin/about-admin/about-admin.component';
import { AdministrativeInformationComponent } from './pages/Quantum Admin/administrative-information/administrative-information.component';
import { InicioComponent } from './pages/Quantum Admin/dashboard/views/inicio/inicio.component';
import { PrediccionesComponent } from './pages/Quantum Admin/dashboard/views/predicciones/predicciones.component';
import { UsuariosComponent } from './pages/Quantum Admin/dashboard/views/usuarios/usuarios.component';
import { HabitacioenesComponent } from './pages/Quantum Admin/dashboard/views/habitacioenes/habitacioenes.component';
import { PagosComponent } from './pages/Quantum Admin/dashboard/views/pagos/pagos.component';
import { PaginaWebComponent } from './pages/Quantum Admin/dashboard/views/pagina-web/pagina-web.component';
import { ReservasComponent } from './pages/Quantum Admin/dashboard/views/reservas/reservas.component';
import { ConfiguracionComponent } from './pages/Quantum Admin/dashboard/views/configuracion/configuracion.component';
import { LandingComponent } from './pages/Quantum Web/Landing/landing.component';
import { LoginWebComponent } from './pages/Quantum Web/login-web/login-web.component';
//import { LandingComponent } from './view/landing/landing.component';

const routes: Routes = [



  //rutas globales
  { path: 'error404', component: Error404Component }, // Página de error 404


  //Rutas para la aplicación web
  { path: '', component: LandingComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'loginCorp', component: LoginWebComponent},
  

  //rutas para la aplicación web (Quantum Web)
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirige rutas desconocidas a Landing
  { path: 'loginAdmin', component: LoginAdminComponent }, // Página de inicio de sesión
  {path:'about', component: AboutAdminComponent}, // Página de información sobre la aplicaciónAdministrativa
  {path:'infoAdmi', component: AdministrativeInformationComponent}, // Página de información sobre la aplicaciónAdministrativa
  
  //Rutas para la aplicación administrativa (Dashboard Admin Empresas)
  {path: 'inicio', component: InicioComponent},
  {path: 'predicciones', component: PrediccionesComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'habitaciones', component: HabitacioenesComponent},
  {path: 'pagos', component: PagosComponent},
  {path: 'paginaweb', component: PaginaWebComponent}, // Página de información sobre la aplicaciónAdministrativa
  {path: 'reservas', component: ReservasComponent}, // Página de reservas
  {path: 'configuracion', component: ConfiguracionComponent}, // Página de configuración
  {path: 'pagina-web', component: PaginaWebComponent}, // Redirige rutas desconocidas a Landing}


  //rutas de usuarios
  {path: 'loginUser', component: LoginUserComponent}, // Página de inicio de sesión usuarios


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
