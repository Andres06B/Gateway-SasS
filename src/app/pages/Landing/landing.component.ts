import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  // Control del popup
  showPopup: boolean = false;

  // Función para abrir el popup
  openPopup(): void {
    console.log('Abriendo popup'); // Para debug
    this.showPopup = true;
  }

  // Función para cerrar el popup
  closePopup(): void {
    this.showPopup = false;
  }

  // Función para manejar la selección
  selectUserType(userType: 'admin' | 'user'): void {
    console.log(`Tipo seleccionado: ${userType}`);
    this.closePopup();
    
    // Aquí puedes añadir la lógica de redirección
    if (userType === 'admin') {
      // Redirigir a administrador
    } else {
      // Redirigir a usuario
    }
  }
}