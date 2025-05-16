import { Component } from '@angular/core';
import { PagoReservaService } from '../../../../../service/pago-reserva.service';
import { pago_reserva } from '../interfaces/pago_reserva.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pagos',
  standalone: false,
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css',
})
export class PagosComponent {
  id: number = Number(localStorage.getItem('hotel'));
  payments: pago_reserva[] = [];
  FilteredPayments: pago_reserva[] = [];
  totalBalance: number = 0;
  private searchTimeout: any;
  detailsModalState: 'closed' | 'opening' | 'open' | 'closing' = 'closed';
  currentPage = 1
  pageSize = 15 // Puedes ajustar esto según tus necesidades
  public Math = Math

  selectedPayment: pago_reserva | null = null
  

  constructor(
    private paymentService: PagoReservaService
  ){}


  ngOnInit(){
    this.findAll();
  }

  findAll(): void {
    this.paymentService.findAllByHotel(this.id).subscribe({
      next: (data) => {
        this.payments = data;
        this.totalBalance = this.calculateTotalBalance();
      },
      error: (err) => {
        console.error('Error al obtener los pagos:', err);
        this.payments = [];
        this.totalBalance = 0;
      }
    })
  }

  calculateTotalBalance(): number {
    return this.payments.reduce((total, payment) => total + Number(payment.amount), 0);
  }

  getConfirmedPayments(): number {
    return this.payments.reduce((total, payment) => {
      const amount = Number(payment.amount);
      return total + (payment.status === 'confirmed' && !isNaN(amount) ? amount : 0);
    }, 0);
  }

  getRefundedPayments(): number{
    return this.payments.reduce((total, payment) => {
      const amount = Number(payment.amount);
      return total + (payment.status === 'refunded' && !isNaN(amount) ? amount : 0);
    }, 0);
  }

  getPaymentMethodPercentages(): { percentages: { [key: string]: number }, mostUsedMethod: { method: string, percentage: number } } {
    const totalPayments = this.payments.length;
  
    if (totalPayments === 0) {
      return { percentages: {}, mostUsedMethod: { method: 'N/A', percentage: 0 } };
    }
  
    const methodCounts = this.payments.reduce((acc, payment) => {
      acc[payment.payment_method] = (acc[payment.payment_method] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  
    const percentages: { [key: string]: number } = {};
    let mostUsedMethod = { method: '', percentage: 0 };
  
    for (const method in methodCounts) {
      const percentage = (methodCounts[method] / totalPayments) * 100;
      percentages[method] = percentage;
  
      if (percentage > mostUsedMethod.percentage) {
        mostUsedMethod = { method, percentage };
      }
    }
  
    return { percentages, mostUsedMethod };
  }

  onFilterByStatus(event: Event): void {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    if (!selectedStatus) {
      this.findAll();
      return;
    }

    this.paymentService.findByStatus(selectedStatus, this.id).subscribe({
      next: (data) => {
        this.payments = data;
      },
      error: (err) => {
        console.error('Error al filtrar pagos por estado:', err);
        this.payments = [];
        this.totalBalance = 0;
      }
    })
    
  }

  onFilterByMethod(event: Event): void {
    const selectedMethod = (event.target as HTMLSelectElement).value;
    if (!selectedMethod) {
      this.findAll();
      return;
    }

    this.paymentService.findByMethod(selectedMethod, this.id).subscribe({
      next: (data) => {
        this.payments = data;
      },
      error: (err) => {
        console.error('Error al filtrar pagos por método:', err);
        this.payments = [];
        this.totalBalance = 0;
      }
    })
  }

  findByName(name: string): void {
    this.paymentService.findByNameClient(name,this.id).subscribe({
      next: (data) => {
        this.payments = data ? [data] : []
      },
      error: (err) => {
        console.error('Error al filtrar pagos por método:', err);
        this.payments = [];
        this.totalBalance = 0;
      }
    })
  }

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value.trim()
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      if(!input){
        this.findAll()
        return
      }
      const isName = /^[a-zA-Z0-9\s]+$/.test(input);

      if(isName) this.findByName(input)
    }, 300)
  }

  showDetails(id: number): void {
    this.paymentService.findById(id).subscribe({
      next: (data) => {
        this.selectedPayment = data;
        this.detailsModalState = 'opening';

        setTimeout(() => {
          this.detailsModalState = 'open';
        }, 50);
      },
      error: (err) => {
        console.error('Error al obtener los datos:',err)
      }
    })
  }

  closeDetails(): void {
    this.detailsModalState = 'closing';

    setTimeout(() => {
      this.detailsModalState = 'closed';
      this.selectedPayment = null;
    }, 300); // Duración de la animación
  }

  onPageChange(page: number): void {
      console.log("Cambiando a página:", page)
      this.currentPage = page
    }
  
    // Este método es opcional, puedes usarlo en lugar del pipe slice
    get pagedClients(): any[] {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      const result = this.payments.slice(start, Math.min(end, this.payments.length))
      console.log(`Mostrando ${result.length} clientes de ${this.payments.length} (página ${this.currentPage})`)
      return result
    }
  
    get totalPages(): number {
      return Math.ceil(this.payments.length / this.pageSize)
    }







}
