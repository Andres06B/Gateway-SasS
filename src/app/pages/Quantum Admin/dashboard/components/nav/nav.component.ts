import { Component, HostListener } from '@angular/core';
import { UsersService } from '../../../../../service/users.service';

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

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.adminData();
  }

  constructor(
    private adminS: UsersService
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
}
