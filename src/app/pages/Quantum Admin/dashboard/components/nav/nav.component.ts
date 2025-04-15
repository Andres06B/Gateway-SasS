import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
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
