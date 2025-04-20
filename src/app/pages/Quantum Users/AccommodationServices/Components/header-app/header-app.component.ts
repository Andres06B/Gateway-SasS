import { Component } from '@angular/core';


@Component({
  selector: 'app-header-app',
  standalone: false,
  templateUrl: './header-app.component.html',
  styleUrl: './header-app.component.css'
})
export class HeaderAppComponent {
// Variables de estado
mobileMenuOpen = false;
userMenuOpen = false;
searchOpen = false;
userName = 'Juan Pérez'; // Esto vendría de tu servicio de autenticación
userPhoto = ''; // URL de la foto de perfil
hasNotifications: any;

// Métodos
toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
  if (this.mobileMenuOpen) {
    this.searchOpen = false;
  }
}

toggleUserMenu() {
  this.userMenuOpen = !this.userMenuOpen;
}

toggleSearch() {
  this.searchOpen = !this.searchOpen;
  if (this.searchOpen) {
    this.mobileMenuOpen = false;
  }
}

onLogout() {
  // Lógica para cerrar sesión
  console.log('Sesión cerrada');
  // Redirigir al login
}

navigateTo(route: string) {
  // Lógica de navegación
}
}
