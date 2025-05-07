import { Component } from '@angular/core';
import { PaymentServiceService } from '../../../../../service/payment-service.service';
import { paymentService } from '../../../../../interface/payment.interface';

@Component({
  selector: 'app-pagos-adm',
  standalone: false,
  templateUrl: './pagos-adm.component.html',
  styleUrl: './pagos-adm.component.css'
})
export class PagosAdmComponent {
  payments: paymentService[] = [];
  balanceTotal: number = 0;

  constructor(

    private payment: PaymentServiceService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.payment.findAll().subscribe({
      next: (res) => {
        this.payments = res;
        this.calculateBalanceTotal(); // Asegurarse de calcular el balance después de cargar los datos
        console.log(this.payments);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  
  calculateBalanceTotal(): void {
    this.balanceTotal = this.payments.reduce((total, payment) => {
      const price = typeof payment.price === 'string' ? parseFloat(payment.price) : payment.price;
      if (isNaN(price)) {
        console.warn(`El valor de price no es válido: ${payment.price}`);
        return total; 
      }
      return total + price;
    }, 0);
  }
  
}
