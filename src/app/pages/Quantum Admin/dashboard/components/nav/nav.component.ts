import { Component, HostListener } from '@angular/core';
import { UsersService } from '../../../../../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  admin: number = Number(localStorage.getItem('token'));
  isMenuOpen = false;
  adminInfo: { name: string; last_name: string; email: string } | null = null;
  showLogoutModal = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.adminData();
  }

  constructor(
    private adminS: UsersService,
    private router: Router
  ) {}

  adminData():void {
    this.adminS.getUser(this.admin).subscribe({
      next: res => {
        this.adminInfo = {
          name: res.name,
          last_name: res.last_name,
          email: res.email
        };
      }
    });
  }

  getAdminInitials(): string {
    if (this.adminInfo) {
      const nameParts = this.adminInfo.name.split(' ');
      const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
      return initials;
    }
    return '';
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-menu-container')) {
      this.isMenuOpen = false;
    }
  }

  // Opcional: hover para desktop
  onMouseEnter(): void {
    if (window.innerWidth > 768) {
      this.isMenuOpen = true;
    }
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
    localStorage.removeItem('token');
    this.closeLogoutModal();
    this.router.navigate(['/loginAdmin']);
  }

  // Tecla Escape
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.showLogoutModal) {
      this.closeLogoutModal();
    }
  }
}