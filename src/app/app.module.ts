import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/Components/header/header.component';
import { FooterComponent } from './shared/Components/footer/footer.component';
import { PopupComponent } from './shared/Components/popup/popup.component';

import { LoginUserComponent } from './pages/Quantum Users/login-users/login-user.component';
import { Error404Component } from './shared/Components/error404/error404.component';
import { AboutAdminComponent } from './pages/Quantum Admin/about-admin/about-admin.component';
import { LoginAdminComponent } from './pages/Quantum Admin/login-admin/login-admin.component';

import { CompanyRegistrationComponent } from './pages/Quantum Admin/company-registration/company-registration.component';
import { AdministrativeInformationComponent } from './pages/Quantum Admin/administrative-information/administrative-information.component';
import { SidebarComponent } from './pages/Quantum Admin/dashboard/components/sidebar/sidebar.component';
import { InicioComponent } from './pages/Quantum Admin/dashboard/views/inicio/inicio.component';
import { NavComponent } from './pages/Quantum Admin/dashboard/components/nav/nav.component';
import { LayoutComponent } from './pages/Quantum Admin/dashboard/components/layout/layout.component';
import { ReservasComponent } from './pages/Quantum Admin/dashboard/views/reservas/reservas.component';
import { PrediccionesComponent } from './pages/Quantum Admin/dashboard/views/predicciones/predicciones.component';
import { PaginaWebComponent } from './pages/Quantum Admin/dashboard/views/pagina-web/pagina-web.component';
import { UsuariosComponent } from './pages/Quantum Admin/dashboard/views/usuarios/usuarios.component';

import { PagosComponent } from './pages/Quantum Admin/dashboard/views/pagos/pagos.component';
import { ConfiguracionComponent } from './pages/Quantum Admin/dashboard/views/configuracion/configuracion.component';
import { LandingComponent } from './pages/Quantum Web/Landing/landing.component';
import { LoginWebComponent } from './pages/Quantum Web/login-web/login-web.component';
import { NavAdminComponent } from './pages/Quantum Admin/about-admin/Components/nav-admin/nav-admin.component';
import { WebHotelComponent } from './pages/Quantum Users/web-hotel/web-hotel.component';
import { InfoHotelComponent } from './pages/Quantum Users/web-hotel/info-hotel/info-hotel.component';
import { InfoHostalComponent } from './pages/Quantum Users/web-hotel/info-hostal/info-hostal.component';
import { InfoCabanaComponent } from './pages/Quantum Users/web-hotel/info-cabana/info-cabana.component';
import { HeaderWEbComponent } from './pages/Quantum Users/web-hotel/Components/header-web/header-web.component';
import { FooterWEbComponent } from './pages/Quantum Users/web-hotel/Components/footer-web/footer-web.component';
import { NavarAdmComponent } from './pages/Quantum Web/dashboard-admin/components-admin/navar-adm/navar-adm.component';
import { SidebarAdmComponent } from './pages/Quantum Web/dashboard-admin/components-admin/sidebar-adm/sidebar-adm.component';
import { InicioAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/inicio-adm/inicio-adm.component';
import { ServiciosAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/servicios-adm/servicios-adm.component';
import { LayoutAdmComponent } from './pages/Quantum Web/dashboard-admin/components-admin/layout-adm/layout-adm.component';
import { HotelesAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/hoteles-adm/hoteles-adm.component';
import { PagosAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/pagos-adm/pagos-adm.component';
import { PremiumAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/premium-adm/premium-adm.component';
import { VipAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/vip-adm/vip-adm.component';
import { ConfigAdmComponent } from './pages/Quantum Web/dashboard-admin/views-admin/config-adm/config-adm.component';
import { UserRegistrationComponent } from './pages/Quantum Users/user-registration/user-registration.component';


import { ReactiveFormsModule } from '@angular/forms';

// app.module.ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/home-application/home-application.component';
import { HeaderAppComponent } from './pages/Quantum Users/AccommodationServices/Components/header-app/header-app.component';
import { FooterAppComponent } from './pages/Quantum Users/AccommodationServices/Components/footer-app/footer-app.component';
import { DestinationApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/destination-application/destination-application.component';
import { UserProfileApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/user-profile-application/user-profile-application.component';
import { ReservationPaymentsApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/reservation-payments-application/reservation-payments-application.component';
import { ReserveCompanionsApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/reserve-companions-application/reserve-companions-application.component';
import { PreferredStaysApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/preferred-stays-application/preferred-stays-application.component';
import { ReserveStatusApplicationsComponent } from './pages/Quantum Users/AccommodationServices/view/reserve-status-applications/reserve-status-applications.component';
import { MyreseRevationsApplicationComponent } from './pages/Quantum Users/AccommodationServices/view/myrese-revations-application/myrese-revations-application.component';
import { ReservationsApplicationsComponent } from './pages/Quantum Users/AccommodationServices/view/reservations-applications/reservations-applications.component';
import { PasarelaComponent } from './shared/pasarela/pasarela.component';
import { HabitacionesComponent } from './pages/Quantum Admin/dashboard/views/habitaciones/habitaciones.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PopupComponent,
    LandingComponent,
    LoginUserComponent,
    Error404Component,
    AboutAdminComponent,
    LoginAdminComponent,
    CompanyRegistrationComponent,
    AdministrativeInformationComponent,
    SidebarComponent,
    InicioComponent,
    NavComponent,
    LayoutComponent,
    ReservasComponent,
    PrediccionesComponent,
    PaginaWebComponent,
    UsuariosComponent,
   
    PagosComponent,
    ConfiguracionComponent,
    LoginWebComponent,
    NavAdminComponent,
    WebHotelComponent,
    InfoHotelComponent,
    InfoHostalComponent,
    InfoCabanaComponent,
    HeaderWEbComponent,
    FooterWEbComponent,
    NavarAdmComponent,
    SidebarAdmComponent,
    InicioAdmComponent,
    ServiciosAdmComponent,
    LayoutAdmComponent,
    HotelesAdmComponent,
    PagosAdmComponent,
    PremiumAdmComponent,
    VipAdmComponent,
    ConfigAdmComponent,
    UserRegistrationComponent,
    HomeApplicationComponent,
    HeaderAppComponent,
    FooterAppComponent,
    DestinationApplicationComponent,
    UserProfileApplicationComponent,
    ReservationPaymentsApplicationComponent,
    ReserveCompanionsApplicationComponent,
    PreferredStaysApplicationComponent,
    ReserveStatusApplicationsComponent,
    MyreseRevationsApplicationComponent,
    ReservationsApplicationsComponent,
    PasarelaComponent,
    HabitacionesComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
