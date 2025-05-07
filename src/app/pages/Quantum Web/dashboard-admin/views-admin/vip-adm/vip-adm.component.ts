import { Component } from '@angular/core';
import { paymentService } from '../../../../../interface/payment.interface';
import { PaymentServiceService } from '../../../../../service/payment-service.service';

@Component({
  selector: 'app-vip-adm',
  standalone: false,
  templateUrl: './vip-adm.component.html',
  styleUrl: './vip-adm.component.css'
})
export class VipAdmComponent {
  payments: paymentService[] = [];
    totalBalance: number = 0;
  
    constructor(
      private service: PaymentServiceService
    ){}
  
    ngOnInit(): void {
      this.findAll();
    }
  
    findAll(): void {
      this.service.findVipUsers().subscribe({
        next: (res) => {
          this.payments = res;
          console.log(this.payments);
          this.calculateVipIncome();
        }
        , error: (err) => {
          console.log(err);
        }
      });
    }
  
    calculateVipIncome(): void {
      this.totalBalance = this.payments.reduce((total, payment) =>{
         return total + payment.price
      } , 0);
    }
}
