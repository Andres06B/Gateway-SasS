import { Component } from '@angular/core';
import { ReservationsService } from '../../../../../service/reservations.service';

@Component({
  selector: 'app-reservas',
  standalone: false,
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  Booking: any[] = [];
  prueba: any[] = [];
  filteredBooking: any[] = [];
  totalBookings: number = 0;
  confirmedBookings: number = 0;
  refundedBookings: number = 0;
  canceledBookings: number = 0;
  selectedBooking: any = null;
  openDetailsModal: boolean = false;
  openEditModal: boolean = false;
  HotelId: number = Number(localStorage.getItem('hotel'));

  constructor(
    private bookingService: ReservationsService
  ){}

  ngOnInit(){
    this.findByHotel();
    
  }

 // FUNCION PARA FILTRAR POR HOTEL, SE DEBE DESCOMENTAR CUANDO SE TENGA EL ID DEL HOTEL
  findByHotel(): void {
    this.bookingService.findByHotel(this.HotelId).subscribe({
      next: (data) => {
        this.Booking = data;
        console.log(this.Booking.length)
        this.filteredBooking = [...this.Booking];
        console.log(this.filteredBooking);
        this.calcularEstadisticas();
      },
      error: (err) => {
        console.error('Error al obtener los reservas:', err);
        this.Booking = [];
        this.filteredBooking = [];
        this.resetEstadisticas();
      }
    })
  }
 

  // FUNCION PARA FILTRAR POR HOTEL, SE DEBE DESCOMENTAR CUANDO SE TENGA EL ID DEL HOTEL
  /*
  findAll(): void {
    this.bookingService.findAll().subscribe({
      next: (data) => {
        this.Booking = data;
        this.filteredBooking = [...this.Booking];
        this.calcularEstadisticas();
        
      },
      error: (err) => {
        console.error('Error al obtener los reservas:', err);
        this.Booking = [];
        this.filteredBooking = [];
        
      }
    })
  }
  */

  onFilteredByStatus(event: Event): void {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    if (!selectedStatus){
      this.filteredBooking = [...this.Booking];
      return;
    }

    this.bookingService.findByStatus(selectedStatus).subscribe({
      next: (reservas) => {
        this.filteredBooking = reservas;
      },
      error: (err) => {
        console.error('Error al filtrar reservas por estado:', err);
        this.filteredBooking = []
      }
    })

  }

  calcularEstadisticas(): void {
    this.totalBookings = this.Booking.length;
    this.confirmedBookings = this.Booking.filter(booking => booking.status === 'confirmed').length;
    this.refundedBookings = this.Booking.filter(booking => booking.status === 'refunded').length;
    this.canceledBookings = this.Booking.filter(booking => booking.status === 'canceled').length;
  }

  resetEstadisticas(): void {
    this.totalBookings = 0;
    this.confirmedBookings = 0;
    this.refundedBookings = 0;
    this.canceledBookings = 0;
  }

  calcularNoches(checkIn: string, checkOut: string): number {
    const fechaInicio = new Date(checkIn);
    const fechaFin = new Date(checkOut);
    const diferenciaTiempo = fechaFin.getTime() - fechaInicio.getTime();
    const noches = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
    return noches;
  }

  traducirEstado(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'refunded':
        return 'Reembolsada';
      case 'canceled':
        return 'Cancelada';
      default:
        return status;
    }
  }

  openDetails(): void{
    this.openDetailsModal = true;
    console.log('Abriendo modal de detalles de reserva');
  }

  closeDetails(): void{
    this.openDetailsModal = false;
    console.log('Cerrando modal de detalles de reserva');
  }

  showDetails(id: number): void{
    this.bookingService.findById(id).subscribe({
      next: (reserva) => {
        this.selectedBooking = reserva;
        console.log('Reserva seleccionada:', this.selectedBooking);
        this.openDetails();
      },
      error: (err) => {
        console.error('Error al obtener la reserva:', err);
        this.selectedBooking = null;
      }
    })
  }


}
