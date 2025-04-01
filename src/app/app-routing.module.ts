import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/Landing/landing.component';
//import { LandingComponent } from './view/landing/landing.component';

const routes: Routes = [
  
  { path: '', component: LandingComponent }, // Página principal
  { path: 'landing', component: LandingComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirige rutas desconocidas a Landing

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
