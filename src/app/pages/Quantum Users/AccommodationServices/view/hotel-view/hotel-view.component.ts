import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Clients } from '../../../../../interface/clients.interface';
import { hotels } from '../../../../../interface/hotels.interface';
import { rooms } from '../../../../../interface/rooms.interface';
import { HotelsService } from '../../../../../service/hotels.service';
import { RoomsService } from '../../../../../service/rooms.service';
import { ReservationsService } from '../../../../../service/reservations.service';
import { reservations } from '../../../../../pages/Quantum Admin/dashboard/views/interfaces/reservations.interface';

@Component({
  selector: 'app-hotel-view',
  standalone: false,
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css'],
})
export class HotelViewComponent {
  hotel: hotels | null = null;
  rooms: rooms[] = [];
  loading: boolean = true;
  error: string | null = null;
  selectedRoomId: number | null = null;
  showConfirmationModal: boolean = false;
  showPaymentModal: boolean = false;
  paymentMethod: string = 'credit';
  cardNumber: string = '';
  cardName: string = '';
  cardExpiry: string = '';
  cardCvv: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';

  userData: Clients = {
    name: '',
    last_name: '',
    email: '',
    phone: '',
    type_document: 'CC',
    number_document: '',
    birth_date: new Date()
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelsService,
    private roomsService: RoomsService,
    private reservationsService: ReservationsService
  ) { }

  ngOnInit(): void {
    const hotelId = localStorage.getItem('selectedHotelId');
    this.checkInDate = localStorage.getItem('checkInDate') || '';
    this.checkOutDate = localStorage.getItem('checkOutDate') || '';

    if (hotelId) {
      this.loadHotelDetails(parseInt(hotelId));
      this.loadRooms(parseInt(hotelId));
    } else {
      this.error = 'No se encontró el hotel seleccionado';
      this.loading = false;
    }
  }

  private loadHotelDetails(hotelId: number): void {
    this.hotelService.getHotelById(hotelId).subscribe({
      next: (data) => {
        this.hotel = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los detalles del hotel';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  private loadRooms(hotelId: number): void {
    this.roomsService.getRoomByHotel(hotelId).subscribe({
      next: (data) => {
        this.rooms = data;
      },
      error: (error) => {
        console.error('Error al cargar las habitaciones:', error);
      }
    });
  }

  private createReserve(): void {
    if (!this.selectedRoomId || !this.checkInDate || !this.checkOutDate) {
      console.error('Faltan datos necesarios para la reserva');
      return;
    }

    // Obtener el ID del usuario del localStorage
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('No se encontró el ID del usuario');
      return;
    }

    // Crear el objeto de reserva
    const reservationData: reservations = {
      id: 0, // El backend asignará el ID
      check_in: new Date(this.checkInDate),
      check_out: new Date(this.checkOutDate),
      status: 'confirmed',
      room: {
        id: this.selectedRoomId
      },
      client: {
        id: parseInt(userId)
      },
      created_at: new Date(),
      updated_at: new Date()
    };

    // Crear la reserva
    this.reservationsService.createReservation(reservationData).subscribe({
      next: (response) => {
        console.log('Reserva creada exitosamente:', response);
        this.showPaymentModal = false;
        // Redirigir a la página de confirmación o dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al crear la reserva:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }

  processPayment(): void {
    this.createReserve();
  }

  reserveRoom(roomId: number): void {
    this.selectedRoomId = roomId;
    this.showConfirmationModal = true;
  }

  confirmReservation(): void {
    this.showConfirmationModal = false;
    this.showPaymentModal = true;
  }

  cancelReservation(): void {
    this.showConfirmationModal = false;
    this.selectedRoomId = null;
  }

  cancelPayment(): void {
    this.showPaymentModal = false;
    this.selectedRoomId = null;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'free':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'booked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'free':
        return 'Disponible';
      case 'busy':
        return 'Ocupada';
      case 'booked':
        return 'Reservada';
      default:
        return status;
    }
  }

  validateUserData(): boolean {
    // Validación básica de campos requeridos
    const requiredFields = [
      this.userData.name,
      this.userData.last_name,
      this.userData.type_document,
      this.userData.number_document,
      this.userData.birth_date,
      this.userData.email,
      this.userData.phone
    ];
    
    if (requiredFields.some(field => !field)) {
      return false;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.userData.email)) {
      return false;
    }

    // Validación de teléfono (mínimo 7 dígitos)
    if (this.userData.phone.replace(/\D/g, '').length < 7) {
      return false;
    }

    return true;
  }

  formatPrice(price: number | undefined): string {
    if (!price) return '$0';
    
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }
}