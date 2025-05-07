import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  standalone: false,
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css'
})
export class NavAdminComponent {
  isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goBack(): void {
    // Aquí puedes implementar la lógica para volver atrás
    // Por ejemplo:
    this.router.navigate(['/landing']);
    console.log('Volviendo a Quantum...');
  }

  goToAdmin(): void {
    // Aquí puedes implementar la navegación al portal de admin
    // Por ejemplo:
    this.router.navigate(['/loginAdmin']);
    console.log('Navegando al Admin Portal...');
  }
}
