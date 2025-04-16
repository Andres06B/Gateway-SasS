import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

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
import { HabitacioenesComponent } from './pages/Quantum Admin/dashboard/views/habitacioenes/habitacioenes.component';
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
import { AdminQuantumComponent } from './pages/Quantum Web/admin-quantum/admin-quantum.component';



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
    HabitacioenesComponent,
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
    AdminQuantumComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
