import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/Components/header/header.component';
import { FooterComponent } from './shared/Components/footer/footer.component';
import { PopupComponent } from './shared/Components/popup/popup.component';
import { LandingComponent } from './pages/Landing/landing.component';
import { LoginUserComponent } from './pages/Users/login-users/login-user.component';
import { Error404Component } from './shared/Components/error404/error404.component';
import { AboutAdminComponent } from './pages/Admin/about-admin/about-admin.component';
import { LoginAdminComponent } from './pages/Admin/login-admin/login-admin.component';
import { HotelUsersComponent } from './pages/Users/hotel-users/hotel-users.component';
import { CompanyRegistrationComponent } from './pages/Admin/company-registration/company-registration.component';
import { AdministrativeInformationComponent } from './pages/Admin/administrative-information/administrative-information.component';
import { SidebarComponent } from './pages/Admin/dashboard/components/sidebar/sidebar.component';
import { InicioComponent } from './pages/Admin/dashboard/views/inicio/inicio.component';
import { NavComponent } from './pages/Admin/dashboard/components/nav/nav.component';
import { LayoutComponent } from './pages/Admin/dashboard/components/layout/layout.component';
import { UsuariosComponent } from './pages/Admin/dashboard/views/usuarios/usuarios.component';
import { ReservasComponent } from './pages/Admin/dashboard/views/reservas/reservas.component';
import { HabitacionesComponent } from './pages/Admin/dashboard/views/habitaciones/habitaciones.component';
import { PrediccionesComponent } from './pages/Admin/dashboard/views/predicciones/predicciones.component';



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
    HotelUsersComponent,
    CompanyRegistrationComponent,
    AdministrativeInformationComponent,
    SidebarComponent,
    InicioComponent,
    NavComponent,
    LayoutComponent,
    UsuariosComponent,
    ReservasComponent,
    HabitacionesComponent,
    PrediccionesComponent,

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
