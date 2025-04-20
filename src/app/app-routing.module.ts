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
import { WebHotelComponent } from './pages/Quantum Users/web-hotel/web-hotel.component';
import { InfoHotelComponent } from './pages/Quantum Users/web-hotel/info-hotel/info-hotel.component';
import { InfoHostalComponent } from './pages/Quantum Users/web-hotel/info-hostal/info-hostal.component';
import { InfoCabanaComponent } from './pages/Quantum Users/web-hotel/info-cabana/info-cabana.component';
import { InicioAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/inicio-adm/inicio-adm.component';
import { PagosAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/pagos-adm/pagos-adm.component';
import { HotelesAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/hoteles-adm/hoteles-adm.component';
import { ServiciosAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/servicios-adm/servicios-adm.component';
import { PremiumAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/premium-adm/premium-adm.component';
import { VipAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/vip-adm/vip-adm.component';
import { ConfigAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/config-adm/config-adm.component';
import { UserRegistrationComponent } from './pages/Quantum Users/user-registration/user-registration.component';
import { HomeApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/home-application/home-application.component';
import { DestinationApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/destination-application/destination-application.component';
import { UserProfileApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/user-profile-application/user-profile-application.component';
import { ReservationPaymentsApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/reservation-payments-application/reservation-payments-application.component';
import { ReserveCompanionsApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/reserve-companions-application/reserve-companions-application.component';
import { PreferredStaysApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/preferred-stays-application/preferred-stays-application.component';
import { ReserveStatusApplicationsComponent } from './pages/Quantum Users/AccommodationServices/view/reserve-status-applications/reserve-status-applications.component';
import { MyreseRevationsApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/myrese-revations-application/myrese-revations-application.component';
import { ReservationsApplicationsComponent } from './pages/Quantum Users/AccommodationServices/view/reservations-applications/reservations-applications.component';

//import { LandingComponent } from './view/landing/landing.component';

const routes: Routes = [
  // Rutas públicas
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'loginCorp', component: LoginWebComponent },
  { path: 'loginAdmin', component: LoginAdminComponent },
  { path: 'about', component: AboutAdminComponent },
  { path: 'infoAdmi', component: AdministrativeInformationComponent },
  { path: 'error404', component: Error404Component },

  // Rutas administrativas (protegidas)
  { path: 'inicio', component: InicioComponent },
  { path: 'predicciones', component: PrediccionesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'habitaciones', component: HabitacioenesComponent },
  { path: 'pagos', component: PagosComponent },
  { path: 'pagina-web', component: PaginaWebComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'configuracion', component: ConfiguracionComponent },

  //rutas pagina web usuarios
  { path: '',  component: WebHotelComponent,}, // Página principal
  { path: 'Webhotel', component: WebHotelComponent,},
  { path: 'loginUser', component: LoginUserComponent },
  { path: 'userRegister', component: UserRegistrationComponent},
  { path: 'infohotel', component: InfoHotelComponent,},
  { path: 'infohostal', component: InfoHostalComponent,},
  { path: 'infocabaña', component: InfoCabanaComponent,},
  {path: 'apphome', component:HomeApplicationComponent},
  {path: 'appdestination', component:DestinationApplicationComponent},
  {path: 'UserProfileapp', component:UserProfileApplicationComponent},
  {path: 'reservationpayments', component:ReservationPaymentsApplicationComponent},
  {path: 'companionreservation', component:ReserveCompanionsApplicationComponent},
  {path: 'preferredstays', component:PreferredStaysApplicationComponent},
  {path: 'reserveStatus', component:ReserveStatusApplicationsComponent},
  {path: 'myreservation', component:MyreseRevationsApplicationComponent},
  {path: 'Reservation', component:ReservationsApplicationsComponent},

  //rutas administrativas (protegidas) para el admin de la pagina web
  {path: 'inicio-adm', component: InicioAdmComponent},
  {path: 'pagos-adm', component: PagosAdmComponent},
  {path: 'hoteles-adm', component: HotelesAdmComponent},
  {path: 'servicios-adm', component: ServiciosAdmComponent},
  {path: 'premium-adm', component: PremiumAdmComponent},
  {path: 'vip-adm', component: VipAdmComponent},
  {path: 'config-adm', component: ConfigAdmComponent},


  // Redirecciones y captura de rutas no encontradas (DEBE IR AL FINAL)
  { path: '**', redirectTo: 'error404', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
