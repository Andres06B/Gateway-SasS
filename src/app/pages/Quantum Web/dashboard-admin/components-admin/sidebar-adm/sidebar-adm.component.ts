import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from '../../../../../service/super-admin.service';
import { DecodedToken } from '../../../../../interface/jwtPayload.interface';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar-adm',
  standalone: false,
  templateUrl: './sidebar-adm.component.html',
  styleUrl: './sidebar-adm.component.css'
})
export class SidebarAdmComponent {
  token = localStorage.getItem('token') || ''
  userId: number | null = null;
  dataUser = {
    name: '',
    lastName: '',
    email: '',
  }


  constructor(
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
}
