import { Component, OnInit } from '@angular/core';
import { PagoReservaService } from '../../../../../service/pago-reserva.service';
import { pago_reserva } from '../../../../../interface/pago_reserva.interface';

@Component({
  selector: 'app-reservation-payments-application',
  standalone: false,
  templateUrl: './reservation-payments-application.component.html',
  styleUrl: './reservation-payments-application.component.css'
})
export class ReservationPaymentsApplicationComponent implements OnInit {
  payments: pago_reserva[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private paymentService: PagoReservaService) { }

  ngOnInit(): void {
    this.loadUserPayments();
  }

  private loadUserPayments(): void {
    const userId = localStorage.getItem('id');
    if (!userId) {
      this.error = 'No se encontró el ID del usuario';
      this.loading = false;
      return;
    }

    this.paymentService.findByIdClient(parseInt(userId)).subscribe({
      next: (data) => {
        this.payments = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar los pagos:', error);
        this.error = 'Error al cargar los pagos';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'canceled':
        return 'Cancelado';
      case 'refunded':
        return 'Reembolsado';
      default:
        return status;
    }
  }

  getPaymentMethodText(method: string): string {
    switch (method) {
      case 'visa':
        return 'Visa';
      case 'mastercard':
        return 'Mastercard';
      default:
        return method;
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'Fecha no disponible';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatPrice(amount: number | undefined): string {
    if (!amount) return '$0';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  }
}
