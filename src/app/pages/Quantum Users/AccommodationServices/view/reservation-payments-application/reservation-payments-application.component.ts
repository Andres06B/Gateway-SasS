import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-payments-application',
  standalone: false,
  templateUrl: './reservation-payments-application.component.html',
  styleUrl: './reservation-payments-application.component.css'
})
export class ReservationPaymentsApplicationComponent {
// Agrega estas propiedades a tu componente
pagos = [
  {
    id: 1,
    hotelNombre: "Hotel Paradise Beach",
    fechaEntrada: new Date('2023-05-10'),
    fechaSalida: new Date('2023-05-17'),
    monto: 1250000,
    moneda: 'COP',
    metodoPago: "Tarjeta Visa •••• 4567",
    fechaPago: new Date('2023-05-01'),
    estado: "Completado",
    referencia: "PAY-78945612",
    detalles: {
      habitacion: "Suite Premium Vista al Mar",
      noches: 7,
      impuestos: 175000,
      servicios: 85000,
      descuentos: 150000
    }
  },
  {
    id: 2,
    hotelNombre: "Mountain Lodge",
    fechaEntrada: new Date('2023-08-22'),
    fechaSalida: new Date('2023-08-25'),
    monto: 780000,
    moneda: 'COP',
    metodoPago: "PayPal",
    fechaPago: new Date('2023-08-15'),
    estado: "Completado",
    referencia: "PAY-96325874",
    detalles: {
      habitacion: "Habitación Doble Deluxe",
      noches: 3,
      impuestos: 109200,
      servicios: 45000,
      descuentos: 0
    }
  },
  {
    id: 3,
    hotelNombre: "Urban Central Hotel",
    fechaEntrada: new Date('2023-11-05'),
    fechaSalida: new Date('2023-11-07'),
    monto: 420000,
    moneda: 'COP',
    metodoPago: "Tarjeta Mastercard •••• 3210",
    fechaPago: new Date('2023-10-28'),
    estado: "Reembolsado",
    referencia: "PAY-14785236",
    detalles: {
      habitacion: "Habitación Individual",
      noches: 2,
      impuestos: 58800,
      servicios: 0,
      descuentos: 0
    }
  }
];

verDetallePago(pago: any) {
  // Aquí puedes implementar la lógica para mostrar un modal o redirigir a una página de detalle
  console.log('Ver detalle del pago:', pago);
  alert(`Detalles del pago:\nHotel: ${pago.hotelNombre}\nHabitación: ${pago.detalles.habitacion}\nTotal: ${pago.moneda} ${pago.monto.toLocaleString()}`);
}
}
