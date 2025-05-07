import { Component } from '@angular/core';
import { PaymentServiceService } from '../../../../../service/payment-service.service';
import { paymentService } from '../../../../../interface/payment.interface';

@Component({
  selector: 'app-premium-adm',
  standalone: false,
  templateUrl: './premium-adm.component.html',
  styleUrl: './premium-adm.component.css'
})
export class PremiumAdmComponent {

  payments: paymentService[] = [];
  totalBalance: number = 0;

  constructor(
    private service: PaymentServiceService
  ){}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findPremiumUsers().subscribe({
      next: (res) => {
        this.payments = res;
        console.log(this.payments);
        this.calculatePremiumIncome();
      }
      , error: (err) => {
        console.log(err);
      }
    });
  }

  calculatePremiumIncome(): void {
    this.totalBalance = this.payments.reduce((total, payment) =>{
       return total + payment.price
    } , 0);
  }
}
