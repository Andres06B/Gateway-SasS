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
    this.premiumUsersList();
    this.vipUsersList();
    this.findAllHotels();
  }

  premiumUsersList() {
    this.payment.findPremiumUsers().subscribe({
      next: (res) => {
        if (res.length === 0) {
          console.log("No hay usuarios premium");
          this.premiumUsers = [];
        } else {
          this.premiumUsers = res;
          console.log("Premiun user: ", this.premiumUsers);
          this.calculateTotalPricePremium();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  vipUsersList() {
    this.payment.findVipUsers().subscribe({
      next: (res) => {
        this.vipUsers = res;
        console.log(this.vipUsers);
        this.calculateTotalPriceVip();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  findAllHotels() {
    this.hotels.getHotels().subscribe({
      next: (res) => {
        this.hotel = res;
        console.log(this.hotel);
      },
      error: (err) => {
        console.log(err);
      }
    })

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
