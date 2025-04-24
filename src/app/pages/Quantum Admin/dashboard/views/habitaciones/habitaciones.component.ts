import { Component } from '@angular/core';
import { rooms } from '../interfaces/rooms.interface';
import { RoomsService } from '../../../../../service/rooms.service';
@Component({
  selector: 'app-habitaciones',
  standalone: false,
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent {
  Rooms: rooms[] = []
  filteredRooms: rooms[] = []
  totalRooms: number = 0
  freeRooms: number = 0
  busyRooms: number = 0
  bookedRooms: number = 0
  isModalOpen: boolean = false
  newRoom: Partial<rooms> = {}
  selectedFile: File | null = null;
  AdminId = Number(localStorage.getItem('token'));

  constructor(
    private roomServices: RoomsService
  ){}
  
  ngOnInit(){
      this.findAll();
  }

  /*
  findAllRooms(){
    this.roomServices.getRoomByAdmin(this.AdminId).subscribe({
      next: (rooms) => {
        this.Rooms = rooms
        this.filteredRooms = [...this.Rooms]
        this.calculateRoomStats()
      },
      error: err => {
        console.error('Error al obtener las habitaciones:', err);
        this.Rooms = []
        this.filteredRooms = []
        this.resetRoomStats()
        alert('Error al obtener las habitaciones')
      }
    })
  }
  */
  
  findAll(){
    this.roomServices.getRooms().subscribe({
      next: (rooms) => {
        this.Rooms = rooms
        this.filteredRooms = [...this.Rooms]
        this.calculateRoomStats()
      },
      error: err => {
        console.error('Error al obtener las habitaciones:', err);
        this.Rooms = []
        this.filteredRooms = []
        this.resetRoomStats()
        alert('Error al obtener las habitaciones')
      }
    })
  }
  
  findByName(name: string): void {
    this.roomServices.getRoomByName(name).subscribe({
      next: (room) => {
        this.filteredRooms = [room];
        console.log(this.filteredRooms)
      },
      error: (err) => {
        console.error('Error al obtener la habitación:', err);
        this.filteredRooms = [];
      }
    });
  }

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value.trim();

    if (!input) {
      this.filteredRooms = [...this.Rooms];
      return;
    }

    this.filteredRooms = [];

    const isName = /^[a-zA-Z0-9\s]+$/.test(input);

    if (isName) {
      this.findByName(input);
    }
  }

  onFilterByStatus(event: Event): void {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    if (!selectedStatus) {
      this.filteredRooms = [...this.Rooms];
      return;
    }
    this.roomServices.getRoomByStatus(selectedStatus).subscribe({
      next: (rooms) => {
        this.filteredRooms = rooms;
        console.log(this.filteredRooms);
      },
      error: (err) => {
        console.error('Error al filtrar habitaciones por estado:', err);
        this.filteredRooms = [];
      }
    });
  }

  calculateRoomStats(): void {
    this.totalRooms = this.Rooms.length;
    this.freeRooms = this.Rooms.filter(room => room.status === 'free').length;
    this.busyRooms = this.Rooms.filter(room => room.status === 'busy').length;
    this.bookedRooms = this.Rooms.filter(room => room.status === 'booked').length;
  }

  resetRoomStats(): void {
    this.totalRooms = 0;
    this.freeRooms = 0;
    this.busyRooms = 0;
    this.bookedRooms = 0;
  }

  openModal(): void {
    this.isModalOpen = true;
    console.log('Abriendo modal de creación de habitación')
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.newRoom = {}
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  createRoom(): void {
    const formData = new FormData();
  
    formData.append('name', this.newRoom.name || '');
    formData.append('description', this.newRoom.description || '');
    formData.append('price', this.newRoom.price?.toString() || '');
    formData.append('ability', this.newRoom.ability?.toString() || '');
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    this.roomServices.createRoom(formData).subscribe({
      next: (room) => {
        console.log('Habitación creada:', room);
        this.closeModal();
        this.findAll(); 
      },
      error: (err) => {
        console.error('Error al crear la habitación:', err);
      }
    });
  }
    
}
