import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HotelsService } from '../../../../../service/hotels.service';
import { RoomsService } from '../../../../../service/rooms.service';
import { hotels } from '../../../../../interface/hotels.interface';
import { rooms } from '../../../../../interface/rooms.interface';

@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styleUrls: ['./pagina-web.component.css'],
  standalone: false,
})
export class PaginaWebComponent implements OnInit {

  showRoomModal: boolean = false;
  showHotelEditModal: boolean = false;
  
  hotelForm!: FormGroup;
  roomForm!: FormGroup;

  hotelData: hotels = {
    name: '',
    description: '',
    type_accomodation: 'hotel',
    country: '',
    city: '',
    address: '',
    phone: '',
    email: ''
  };

  rooms: rooms[] = [];

  allServices = [
    'Desayuno incluido',
    'Desayuno buffet',
    'Limpieza diaria',
    'Servicio a la habitación',
    'Acceso a lounge',
    'Traslado al aeropuerto',
    'Spa gratis',
    'Late checkout',
    'Toallas y amenities',
    'Cunas disponibles'
  ];

  currentRoomIndex: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private hotelsService: HotelsService,
    private roomsService: RoomsService
  ) {
    this.initForms();
  }

  hotelId = Number(localStorage.getItem('hotel'));
  AdminId = Number(localStorage.getItem('token'));

  ngOnInit(): void {
    this.loadHotelData();
    this.loadRooms();
  }

  loadHotelData(): void {
    this.hotelsService.getHotelById(this.hotelId).subscribe({
      next: (hotels) => {
        this.hotelData = hotels;
        this.hotelForm.patchValue(this.hotelData);
      },
      error: (error) => {
        console.error('Error loading hotel data:', error);
      }
    });
  }

  loadRooms(): void {
    this.roomsService.getRoomByAdmin(this.AdminId).subscribe({
      next: (rooms) => {
        this.rooms = rooms.map(room => {
          if (room.image && !room.image.startsWith('http')) {
            // Si la imagen es una ruta relativa, construir la URL completa
            if (room.image.startsWith('./uploads')) {
              room.image = `http://localhost:3000/${room.image.substring(2)}`;
            } else if (room.image.startsWith('uploads')) {
              room.image = `http://localhost:3000/${room.image}`;
            } else {
              room.image = `http://localhost:3000/uploads/rooms/${room.image}`;
            }
          } else if (!room.image || room.image === 'No tiene imagen') {
            // Si no hay imagen o es el mensaje por defecto, usar una imagen por defecto
            room.image = 'assets/images/no-image.jpg';
          }
          return room;
        });
        console.log('Habitaciones cargadas:', this.rooms);
      },
      error: (error) => {
        console.error('Error loading rooms:', error);
      }
    });
  }

  initForms(): void {
    this.hotelForm = this.fb.group({
      name: [this.hotelData.name],
      description: [this.hotelData.description],
      type_accomodation: [this.hotelData.type_accomodation],
      country: [this.hotelData.country],
      city: [this.hotelData.city],
      address: [this.hotelData.address],
      phone: [this.hotelData.phone],
      email: [this.hotelData.email]
    });

    this.roomForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      status: [''],
      ability: [''],
      image: ['']
    });
  }

  openRoomModal(index: number | 'new'): void {
    if (index === 'new') {
      this.roomForm.reset({
        name: '',
        description: '',
        price: 0,
        status: 'free',
        ability: '',
        image: ''
      });
      this.currentRoomIndex = null;
    } else {
      const room = this.rooms[index];
      this.roomForm.patchValue({
        name: room.name,
        description: room.description,
        price: room.price,
        status: room.status,
        ability: room.ability,
        image: room.image
      });
      this.currentRoomIndex = index;
    }
    
    this.showRoomModal = true;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  saveRoom(): void {
    if (this.roomForm.invalid) return;
    
    const formData = new FormData();
    const formValue = this.roomForm.value;
    const hotelId = Number(localStorage.getItem('hotel'));

    // Agregar los datos del formulario
    formData.append('name', formValue.name || '');
    formData.append('description', formValue.description || '');
    formData.append('price', formValue.price?.toString() || '');
    formData.append('ability', formValue.ability?.toString() || '');
    formData.append('status', formValue.status || 'free');
    formData.append('hotelId', hotelId.toString());

    // Agregar el archivo seleccionado si existe
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.currentRoomIndex === null) {
      // Crear nueva habitación
      this.roomsService.createRoom(formData).subscribe({
        next: (newRoom) => {
          if (newRoom.image && !newRoom.image.startsWith('http')) {
            const baseUrl = 'http://localhost:3000';
            newRoom.image = `${baseUrl}/${newRoom.image}`;
          }
          this.rooms.push(newRoom);
          this.closeRoomModal();
          this.loadRooms(); // Recargar todas las habitaciones
        },
        error: (error) => {
          console.error('Error creating room:', error);
        }
      });
    } else {
      // Actualizar habitación existente
      const roomId = this.rooms[this.currentRoomIndex].id;
      
      // Si no hay nueva imagen seleccionada y hay una imagen existente, mantener la imagen actual
      if (!this.selectedFile && this.rooms[this.currentRoomIndex].image) {
        formData.append('currentImage', this.rooms[this.currentRoomIndex].image);
      }

      this.roomsService.updateRoom(roomId, formData).subscribe({
        next: (updatedRoom) => {
          if (updatedRoom.image && !updatedRoom.image.startsWith('http')) {
            const baseUrl = 'http://localhost:3000';
            updatedRoom.image = `${baseUrl}/${updatedRoom.image}`;
          }
          this.rooms[this.currentRoomIndex as number] = updatedRoom;
          this.closeRoomModal();
          this.loadRooms(); // Recargar todas las habitaciones
          this.selectedFile = null; // Limpiar el archivo seleccionado
        },
        error: (error) => {
          console.error('Error updating room:', error);
        }
      });
    }
  }

  saveHotel(): void {
    if (this.hotelForm.invalid) return;
    
    const hotelData = this.hotelForm.value;
    this.hotelsService.createHotel(hotelData).subscribe({
      next: (updatedHotel) => {
        this.hotelData = updatedHotel;
        console.log(updatedHotel)
        this.showHotelEditModal = false;
      },
      error: (error) => {
        console.error('Error saving hotel:', error);
      }
    });
  }

  closeRoomModal(): void {
    this.showRoomModal = false;
    this.currentRoomIndex = null;
    this.selectedFile = null; // Limpiar el archivo seleccionado al cerrar el modal
    this.roomForm.reset();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }
}