import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-payments-application',
  standalone: false,
  templateUrl: './reservation-payments-application.component.html',
  styleUrl: './reservation-payments-application.component.css'
})
export class ReservationPaymentsApplicationComponent {
  pagos = [
    {
      hotelNombre: 'Hotel Bogotá Centro',
      fechaEntrada: new Date('2024-03-10'),
      fechaSalida: new Date('2024-03-15'),
      fechaPago: new Date('2024-03-05'),
      monto: 1500000,
      moneda: 'COP',
      estado: 'Completado',
      referencia: 'RES20240305123',
      metodoPago: 'Tarjeta MasterCard',
      detalles: {
        noches: 5,
        habitacion: 'Suite Ejecutiva'
      }
    },
    {
      hotelNombre: 'Hotel Cali Sol',
      fechaEntrada: new Date('2024-12-01'),
      fechaSalida: new Date('2024-12-05'),
      fechaPago: new Date('2024-11-28'),
      monto: 800000,
      moneda: 'COP',
      estado: 'Cancelado',
      referencia: 'RES20241128123',
      metodoPago: 'Transferencia bancaria',
      detalles: {
        noches: 4,
        habitacion: 'Habitación Estándar'
      }
    },
    {
      hotelNombre: 'Hotel Bucaramanga Real',
      fechaEntrada: new Date('2005-06-15'),
      fechaSalida: new Date('2005-06-20'),
      fechaPago: new Date('2005-06-10'),
      monto: 500000,
      moneda: 'COP',
      estado: 'Completado',
      referencia: 'RES20050610123',
      metodoPago: 'Tarjeta Visa',
      detalles: {
        noches: 5,
        habitacion: 'Habitación Estándar'
      }
    },
    {
      hotelNombre: 'Hotel Pereira Campestre',
      fechaEntrada: new Date('2005-12-01'),
      fechaSalida: new Date('2005-12-05'),
      fechaPago: new Date('2005-11-28'),
      monto: 600000,
      moneda: 'COP',
      estado: 'Cancelado',
      referencia: 'RES20051128123',
      metodoPago: 'Transferencia bancaria',
      detalles: {
        noches: 4,
        habitacion: 'Habitación Estándar'
      }
    },
    {
      hotelNombre: 'Hotel Manizales Nevado',
      fechaEntrada: new Date('2024-02-15'),
      fechaSalida: new Date('2024-02-20'),
      fechaPago: new Date('2024-02-10'),
      monto: 1300000,
      moneda: 'COP',
      estado: 'Completado',
      referencia: 'RES20240210123',
      metodoPago: 'Tarjeta Visa',
      detalles: {
        noches: 5,
        habitacion: 'Habitación Deluxe'
      }
    }
  ];

  pagosFiltrados = this.pagos;

  filtrarReservaciones(event: any) {
    const filtro = event.target.value;
    const hoy = new Date();
    const tresMesesAtras = new Date();
    tresMesesAtras.setMonth(hoy.getMonth() - 3);

    switch(filtro) {
      case '3meses':
        this.pagosFiltrados = this.pagos.filter(pago => 
          pago.fechaPago && pago.fechaPago >= tresMesesAtras
        );
        break;
      case '2023':
        this.pagosFiltrados = this.pagos.filter(pago => 
          pago.fechaPago && pago.fechaPago.getFullYear() === 2025
        );
        break;
      case '2022':
        this.pagosFiltrados = this.pagos.filter(pago => 
          pago.fechaPago && pago.fechaPago.getFullYear() === 2024
        );
        break;
      case 'pendientes':
        this.pagosFiltrados = this.pagos.filter(pago => 
          pago.estado === 'Pendiente'
        );
        break;
      default:
        this.pagosFiltrados = this.pagos;
    }
  }
}
