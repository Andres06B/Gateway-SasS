import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navar-adm',
  standalone: false,
  templateUrl: './navar-adm.component.html',
  styleUrl: './navar-adm.component.css'
})
export class NavarAdmComponent {
  showLogoutModal = false;

  constructor(private router: Router) {}

  // Abrir modal
  openLogoutModal(event: Event): void {
    event.preventDefault();
    this.showLogoutModal = true;
    document.body.classList.add('overflow-hidden');
  }

  // Cerrar modal
  closeLogoutModal(): void {
    this.showLogoutModal = false;
    document.body.classList.remove('overflow-hidden');
  }

  // Confirmar logout
  confirmLogout(): void {
    // Limpiar datos de sesión si es necesario
    // localStorage.removeItem('token');
    this.closeLogoutModal();
    this.router.navigate(['/loginCorp']);
  }

  // Tecla Escape
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.showLogoutModal) {
      this.closeLogoutModal();
    }
  }


}
