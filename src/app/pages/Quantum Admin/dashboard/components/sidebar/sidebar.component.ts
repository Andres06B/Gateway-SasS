import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  getStatus(key: string): string {
    const value = localStorage.getItem(key);
    return value === 'true' ? 'Activo' : 'Inactivo';
  }
}
