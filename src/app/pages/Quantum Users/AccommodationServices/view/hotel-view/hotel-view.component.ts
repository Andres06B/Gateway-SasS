import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Clients } from '../../../../../interface/clients.interface';
import { hotels } from '../../../../../interface/hotels.interface';
import { rooms } from '../../../../../interface/rooms.interface';
import { HotelsService } from '../../../../../service/hotels.service';
import { RoomsService } from '../../../../../service/rooms.service';
import { ReservationsService } from '../../../../../service/reservations.service';
import { reservations } from '../../../../../pages/Quantum Admin/dashboard/views/interfaces/reservations.interface';
import { PagoReservaService } from '../../../../../service/pago-reserva.service';
import { pago_reserva } from '../../../../../interface/pago_reserva.interface';

@Component({
  selector: 'app-hotel-view',
  standalone: false,
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css'],
})
export class HotelViewComponent implements OnInit, OnDestroy {
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
  showPaymentSuccessModal: boolean = false;
  reservationNumber: number | null = null;
  totalAmount: number = 0;
  confirmationModalState: 'closed' | 'opening' | 'open' | 'closing' = 'closed';
  paymentModalState: 'closed' | 'opening' | 'open' | 'closing' = 'closed';
  successModalState: 'closed' | 'opening' | 'open' | 'closing' = 'closed';
  isProcessingPayment: boolean = false;
  private roomsInterval: any;

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
    private hotelService: HotelsService,
    private roomsService: RoomsService,
    private reservationsService: ReservationsService,
    private paymentBooking: PagoReservaService,
  ) { }

  ngOnInit(): void {
    const hotelId = localStorage.getItem('selectedHotelId');
    this.checkInDate = localStorage.getItem('checkInDate') || '';
    this.checkOutDate = localStorage.getItem('checkOutDate') || '';

    if (hotelId) {
      this.loadHotelDetails(parseInt(hotelId));
      this.loadRooms(parseInt(hotelId));
      this.startRoomsInterval(parseInt(hotelId));
    } else {
      this.error = 'No se encontró el hotel seleccionado';
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    if (this.roomsInterval) {
      clearInterval(this.roomsInterval);
    }
  }

  private startRoomsInterval(hotelId: number): void {
    if (this.roomsInterval) {
      clearInterval(this.roomsInterval);
    }
    
    this.roomsInterval = setInterval(() => {
      this.loadRooms(hotelId);
    }, 20000);
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
        if (JSON.stringify(this.rooms) !== JSON.stringify(data)) {
          this.rooms = data;
        }
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
        if (response.id) {
          this.createPayment(response.id);
        } else {
          console.error('No se recibió ID de la reserva');
        }
      },
      error: (error) => {
        console.error('Error al crear la reserva:', error);
      }
    });
  }

  private createPayment(reservationId: number): void {
    const userId = localStorage.getItem('id');
    if (!userId || !this.selectedRoomId) {
      console.error('Faltan datos necesarios para el pago');
      this.isProcessingPayment = false;
      return;
    }

    // Obtener el precio de la habitación seleccionada
    const selectedRoom = this.rooms.find(room => room.id === this.selectedRoomId);
    if (!selectedRoom) {
      console.error('No se encontró la habitación seleccionada');
      this.isProcessingPayment = false;
      return;
    }

    // Crear el objeto de pago
    const paymentData: pago_reserva = {
      id: 0,
      payment_date: new Date(),
      status: 'confirmed',
      amount: selectedRoom.price ?? 0,
      payment_method: this.paymentMethod === 'credit' ? 'visa' : 'mastercard',
      created_at: new Date(),
      updated_at: new Date(),
      reservation: {
        id: reservationId,
      },
      client: {
        id: parseInt(userId),
      },
      room: {
        id: this.selectedRoomId,
      }
    };

    // Crear el pago
    this.paymentBooking.create(paymentData).subscribe({
      next: (response) => {
        console.log('Pago procesado exitosamente:', response);
        this.isProcessingPayment = false;
        this.paymentModalState = 'closing';
        setTimeout(() => {
          this.paymentModalState = 'closed';
          this.reservationNumber = response.id;
          this.totalAmount = response.amount;
          this.successModalState = 'opening';
          setTimeout(() => {
            this.successModalState = 'open';
          }, 50);
        }, 300);
      },
      error: (error) => {
        console.error('Error al procesar el pago:', error);
        this.isProcessingPayment = false;
      }
    });
  }

  processPayment(): void {
    if (!this.validatePaymentData()) {
      console.error('Por favor complete todos los campos del pago');
      return;
    }
    this.isProcessingPayment = true;
    this.createReserve();
  }

  private validatePaymentData(): boolean {
    return !!(
      this.cardNumber &&
      this.cardName &&
      this.cardExpiry &&
      this.cardCvv &&
      this.paymentMethod
    );
  }

  reserveRoom(roomId: number): void {
    this.selectedRoomId = roomId;
    this.confirmationModalState = 'opening';
    setTimeout(() => {
      this.confirmationModalState = 'open';
    }, 50);
  }

  confirmReservation(): void {
    this.confirmationModalState = 'closing';
    setTimeout(() => {
      this.confirmationModalState = 'closed';
      this.paymentModalState = 'opening';
      setTimeout(() => {
        this.paymentModalState = 'open';
      }, 50);
    }, 300);
  }

  cancelReservation(): void {
    this.confirmationModalState = 'closing';
    setTimeout(() => {
      this.confirmationModalState = 'closed';
      this.selectedRoomId = null;
    }, 300);
  }

  cancelPayment(): void {
    this.paymentModalState = 'closing';
    setTimeout(() => {
      this.paymentModalState = 'closed';
      this.selectedRoomId = null;
    }, 300);
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

  closePaymentSuccess(): void {
    this.successModalState = 'closing';
    setTimeout(() => {
      this.successModalState = 'closed';
    }, 300);
  }
}