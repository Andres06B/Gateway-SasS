import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { SuperAdminService } from '../../../../../service/super-admin.service';
import { DecodedToken } from '../../../../../interface/jwtPayload.interface';

@Component({
  selector: 'app-navar-adm',
  standalone: false,
  templateUrl: './navar-adm.component.html',
  styleUrl: './navar-adm.component.css'
})
export class NavarAdmComponent {
  showLogoutModal = false;
  token = localStorage.getItem('token') || ''
  userId: number | null = null;
  dataUser = {
    name: '',
    lastName: '',
    email: '',
  }


  constructor(private router: Router,
    private admin: SuperAdminService
  ) {}

  ngOnInit(): void {
    const decoded = this.token ? jwtDecode<DecodedToken>(this.token) : null;
    if (decoded && decoded.id) {
      this.userId = decoded.id; 
      this.admin.findAllsuperAdminById(this.userId).subscribe({
        next: (response) => {
          this.dataUser.name = response.name;
          this.dataUser.lastName = response.last_name;
          this.dataUser.email = response.email;
        },
        error: (err) => {
          console.error('Error al obtener el super admin:', err);
        }
      });
    }

  }

  getUserInitials(): string {
    if (this.dataUser.name && this.dataUser.lastName) {
      return `${this.dataUser.name.charAt(0).toUpperCase()}${this.dataUser.lastName.charAt(0).toUpperCase()}`;
    }
    return '';
  }
  

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
