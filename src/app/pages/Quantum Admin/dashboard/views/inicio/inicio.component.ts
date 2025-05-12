import { Component } from '@angular/core';
import { HotelAdminService } from '../../../../../service/hotel-admin.service';
import { ClientsService } from '../../../../../service/clients.service';
import { RoomsService } from '../../../../../service/rooms.service';
import { PagoReservaService } from '../../../../../service/pago-reserva.service';
import { ReservationsService } from '../../../../../service/reservations.service';
import { rooms } from '../interfaces/rooms.interface';
import { pago_reserva } from '../interfaces/pago_reserva.interface';
import { reservations } from '../interfaces/reservations.interface';
import { clients } from '../interfaces/clients.interface';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  tokenId = Number(localStorage.getItem('token'));
  hotelId: any = null;
  clientsList: clients[] = [];
  roomsList: rooms[] = [];
  paymentsList: pago_reserva[] = [];
  reservationsList: reservations[] = [];

  


  constructor(
    private AdminService: HotelAdminService,
    private client: ClientsService,
    private room: RoomsService,
    private payment: PagoReservaService,
    private booking: ReservationsService
  ) {}

  ngOnInit() {
    this.AdminService.findHotelByAdmin(this.tokenId).subscribe({
      next: (data) => {
        this.hotelId = data.id;
        localStorage.setItem('hotel', this.hotelId);
        this.getPayments();
        this.getReservations();
      }
    });

    this.getClients();
    this.getRooms();
  }

  getClients() {
    this.client.findClients(this.tokenId).subscribe({
      next: (data) => {
        this.clientsList = data; 
      }
    });
  }

  getRooms() {
    this.room.getRoomByAdmin(this.tokenId).subscribe({
      next: (data) => {
        this.roomsList = data; 
      }
    });
  }

  getPayments() {
    this.payment.findAllByHotel(this.hotelId).subscribe({
      next: (data) => {
        this.paymentsList = data; 
      }
    });
  }

  getReservations() {
    this.booking.findByHotel(this.hotelId).subscribe({
      next: (data) => {
        this.reservationsList = data; 
      }
    });
  }


  calculateTotalBalance(): number {
    return this.paymentsList.reduce((total, payment) => total + Number(payment.amount), 0);
  }


  calculateBusyRooms(): number {
    return this.roomsList.filter(room => room.status === 'busy').length;
  }

  calculateFreeRooms(): number {
    return this.roomsList.filter(room => room.status === 'free').length;
  }

  calculateBookingRooms(): number {
    return this.roomsList.filter(room => room.status === 'booked').length;
  }

  
  calculateConfirmedPayments(): number {
    return this.paymentsList.filter(payment => payment.status === 'confirmed').length;
  }

  calculatePendingPayments(): number {
    return this.paymentsList.filter(payment => payment.status === 'pending').length;
  }

  calculateConfirmedReservations(): number {
    return this.reservationsList.filter(reservation => reservation.status === 'confirmed').length;
  }

  calculateCanceledReservations(): number {
    return this.reservationsList.filter(reservation => reservation.status === 'canceled').length;
  }

  calculateRefundedReservations(): number {
    return this.reservationsList.filter(reservation => reservation.status === 'refunded').length;
  }

  calculateTotalConfirmedBalance(): number {
    return this.paymentsList
      .filter(payment => payment.status === 'confirmed')
      .reduce((total, payment) => total + Number(payment.amount), 0);
  }
  
  
  
  getStatus(key: string): string {
    const value = localStorage.getItem(key);
    return value === 'true' ? 'Activo' : 'Inactivo';
  }
  
}
