import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-web',
  standalone: false,
  templateUrl: './header-web.component.html',
  styleUrl: './header-web.component.css'
})
export class HeaderWEbComponent {
  mobileMenuOpen = false;

  menuItems = [
    {
      label: 'Hotel',
      route: '/infohotel',
      iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    },
    {
      label: 'Hostal',
      route: '/infohostal',
      iconPath: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
    },
    {
      label: 'Cabaña',
      route: '/infocabaña',
      iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    }
  ];

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.mobileMenuOpen = false;
  }

  onLogin() {
    // Tu lógica de login aquí
    this.mobileMenuOpen = false;
  }

  searchReservation() {
    // Tu lógica de búsqueda de reserva aquí
    this.mobileMenuOpen = false;
  }
}
