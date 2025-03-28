import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/Components/header/header.component';
import { FooterComponent } from './shared/Components/footer/footer.component';
import { PopupComponent } from './shared/Components/popup/popup.component';
import { LandingComponent } from './pages/Landing/landing.component';
import { LoginHotelComponent } from './pages/Admin/login-admin/login-hotel.component';
import { LoginUserComponent } from './pages/Users/login-users/login-user.component';
import { AboutAdminComponent } from './pages/Admin/about-admin/about-admin.component';
import { Error404Component } from './shared/Components/error404/error404.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PopupComponent,
    LandingComponent,
    LoginHotelComponent,
    LoginUserComponent,
    AboutAdminComponent,
    Error404Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
