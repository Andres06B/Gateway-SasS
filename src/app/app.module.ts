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
import { CompanyRegistrationComponent } from './shared/Components/company-registration/company-registration.component';
import { HotelUsersComponent } from './pages/Users/hotel-users/hotel-users.component';



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
    HotelUsersComponent,

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
