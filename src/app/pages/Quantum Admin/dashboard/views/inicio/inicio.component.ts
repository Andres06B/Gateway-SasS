import { Component } from '@angular/core';
import { HotelAdminService } from '../../../../../service/hotel-admin.service';
import { ClientsService } from '../../../../../service/clients.service';
import { RoomsService } from '../../../../../service/rooms.service';
import { PagoReservaService } from '../../../../../service/pago-reserva.service';
import { ReservationsService } from '../../../../../service/reservations.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  tokenId = Number(localStorage.getItem('token'));
  hotelId: any = null;

  // Listas para almacenar los datos
  clientsList: any[] = [];
  roomsList: any[] = [];
  paymentsList: any[] = [];
  reservationsList: any[] = [];

  totalBalance: number = 0;

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
        this.clientsList = data; // Guardar los datos en la lista
        console.log(this.clientsList);
      }
    });
  }

  getRooms() {
    this.room.getRoomByAdmin(this.tokenId).subscribe({
      next: (data) => {
        this.roomsList = data; // Guardar los datos en la lista
        console.log(this.roomsList);
      }
    });
  }

  getPayments() {
    this.payment.findAllByHotel(this.hotelId).subscribe({
      next: (data) => {
        this.paymentsList = data; // Guardar los datos en la lista
        console.log(this.paymentsList);
      }
    });
  }

  getReservations() {
    this.booking.findByHotel(this.hotelId).subscribe({
      next: (data) => {
        this.reservationsList = data; // Guardar los datos en la lista
        console.log(this.reservationsList);
      }
    });
  }


  calculateTotalBalance(): number {
    return this.paymentsList.reduce((total, payment) => total + Number(payment.amount), 0);
  }

}
