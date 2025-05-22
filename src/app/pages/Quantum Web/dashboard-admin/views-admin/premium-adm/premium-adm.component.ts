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
  itemsPerPage: number = 10;
  currentPage: number = 1;

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

  get paginatedPayments(): paymentService[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.payments.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.payments.length / this.itemsPerPage);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.payments.length);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  changeItemsPerPage(items: number): void {
    this.itemsPerPage = items;
    this.currentPage = 1;
  }
}
