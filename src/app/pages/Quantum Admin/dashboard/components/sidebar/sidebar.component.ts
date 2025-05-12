import { Component } from '@angular/core';
import { UsersService } from '../../../../../service/users.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  admin: number = Number(localStorage.getItem('token'));
  adminInfo: { name: string; last_name: string; email: string } | null = null;

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
          console.log(this.adminInfo)
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


  getStatus(key: string): string {
    const value = localStorage.getItem(key);
    return value === 'true' ? 'Activo' : 'Inactivo';
  }
}
