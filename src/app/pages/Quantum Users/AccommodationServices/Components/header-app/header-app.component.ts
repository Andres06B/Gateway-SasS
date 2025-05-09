import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
  icon: string;
  exact: boolean;
}

interface UserLink {
  path: string;
  label: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

@Component({
  selector: 'app-header-app',
  standalone: false,
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.css']
})
export class HeaderAppComponent {
  
  mobileMenuOpen = false;
  userMenuOpen = false;
  userName = 'Juan Pérez';
  userPhoto = '';

  // Configuración de enlaces de navegación
  navLinks: NavLink[] = [
    { 
      path: '/apphome', 
      label: 'Inicio', 
      icon: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
      exact: true
    },
    { 
      path: '/appdestination', 
      label: 'Sugerencia de Destinos', 
      icon: 'M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z',
      exact: false
    },
    { 
      path: '/preferredstays', 
      label: 'Estadias preferidas', 
      icon: 'M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z',
      exact: false
    }
  ];

  // Configuración de enlaces de usuario
  userLinks: UserLink[] = [
    { 
      path: '/UserProfileapp', 
      label: 'Mi perfil', 
      icon: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    { 
      path: '/myreservation', 
      label: 'Mis reservas', 
      icon: 'M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    { 
      path: '/reservationpayments', 
      label: 'Mis pagos', 
      icon: 'M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    { 
      path: '/companionreservation', 
      label: 'Mis acompañantes', 
      icon: 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500'
    },
    
  ];

  constructor(public router: Router) {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      this.userMenuOpen = false;
    }
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
    if (this.userMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.mobileMenuOpen = false;
    this.userMenuOpen = false;
  }

  onLogout(): void {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
    this.mobileMenuOpen = false;
    this.userMenuOpen = false;
  }
}