import { Component } from '@angular/core';
import { HotelAdminService } from '../../../../../service/hotel-admin.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  tokenId = Number(localStorage.getItem('token'));
  hotelId: any = null;

  constructor(
    private AdminService: HotelAdminService
  ){}

  ngOnInit(){
    this.AdminService.findHotelByAdmin(this.tokenId).subscribe({
      next: (data) => {
        this.hotelId = data.id;
        localStorage.setItem('hotel', this.hotelId);
      }
    })
  }
  
}
