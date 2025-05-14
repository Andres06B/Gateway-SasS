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
  currentPage = 1
  pageSize = 30 // Puedes ajustar esto según tus necesidades
  public Math = Math

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
 

  onFilteredByStatus(event: Event): void {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    if (!selectedStatus){
      this.filteredBooking = [...this.Booking];
      this.currentPage = 1 
      return;
    }

    this.bookingService.findByStatusByHotel(selectedStatus,this.HotelId).subscribe({
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

  onPageChange(page: number): void {
      console.log("Cambiando a página:", page)
      this.currentPage = page
    }
  
    // Este método es opcional, puedes usarlo en lugar del pipe slice
    get pagedClients(): any[] {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      const result = this.filteredBooking.slice(start, Math.min(end, this.filteredBooking.length))
      console.log(`Mostrando ${result.length} clientes de ${this.filteredBooking.length} (página ${this.currentPage})`)
      return result
    }
  
    get totalPages(): number {
      return Math.ceil(this.filteredBooking.length / this.pageSize)
    }


}
