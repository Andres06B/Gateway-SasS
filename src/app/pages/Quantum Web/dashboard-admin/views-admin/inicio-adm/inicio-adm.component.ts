import { Component } from '@angular/core';
import { PaymentServiceService } from '../../../../../service/payment-service.service';
import { HotelsService } from '../../../../../service/hotels.service';
import { hotels } from '../../../../../interface/hotels.interface';

@Component({
  selector: 'app-inicio-adm',
  standalone: false,
  templateUrl: './inicio-adm.component.html',
  styleUrl: './inicio-adm.component.css'
})
export class InicioAdmComponent {

  hotel: hotels[] = [];
  premiumUsers: any[] = [];
  vipUsers: any[] = [];
  totalPriceVip: number = 0;
  totalPricePremium: number = 0;

  constructor(
    private payment: PaymentServiceService,
    private hotels: HotelsService
  ){}

  ngOnInit(): void {
    this.findAllHotels();
  }

  findAllHotels() {
    this.hotels.getHotels().subscribe({
      next: (res) => {
        this.hotel = res;
        console.log('Hoteles cargados:', this.hotel);
        // Una vez que tenemos los hoteles, cargamos los usuarios
        this.premiumUsersList();
        this.vipUsersList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  premiumUsersList() {
    this.payment.findPremiumUsers().subscribe({
      next: (res) => {
        if (res.length === 0) {
          console.log("No hay usuarios premium");
          this.premiumUsers = [];
        } else {
          // Asociar cada usuario premium con el nombre de su hotel
          this.premiumUsers = res.map(user => {
            const hotelName = this.hotel.find(h => h.id === user.hotel_id)?.name || 'N/A';
            return {
              ...user,
              hotelName: hotelName
            };
          });
          console.log("Premium users con nombres de hoteles:", this.premiumUsers);
          this.calculateTotalPricePremium();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  vipUsersList() {
    this.payment.findVipUsers().subscribe({
      next: (res) => {
        // Asociar cada usuario VIP con el nombre de su hotel
        this.vipUsers = res.map(user => {
          const hotelName = this.hotel.find(h => h.id === user.hotel_id)?.name || 'N/A';
          return {
            ...user,
            hotelName: hotelName
          };
        });
        console.log("VIP users con nombres de hoteles:", this.vipUsers);
        this.calculateTotalPriceVip();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  calculateTotalPriceVip(): void {
    this.totalPriceVip = this.vipUsers.reduce((total, user) => {
      return total + (user.price || 0); 
    }, 0);
  } 

  calculateTotalPricePremium(): void {
    this.totalPricePremium = this.premiumUsers.reduce((total, user) => {
      return total + (user.price || 0); 
    }, 0);
  }
}
