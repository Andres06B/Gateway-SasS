import { Component } from '@angular/core';

type RoomStatus = 'disponible' | 'ocupado';

interface Room {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  size: number;
  status: RoomStatus;
  amenities: string[];
  services: string[];
}

interface Amenity {
  id: string;
  name: string;
  icon?: string;
}

interface UserData {
  nombre: string;
  apellido: string;
  tipoDocumento: 'CC' | 'CE' | 'PA' | 'TI' | '';
  numeroDocumento: string;
  fechaNacimiento: string;
  email: string;
  telefono: string;
}

type ModalType = 'confirmation' | 'payment' | 'success';

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  standalone: false,
  styleUrls: ['./hotel-view.component.css']
})
export class HotelViewComponent {
  hotelData = {
    name: 'CT Prime Suites',
    category: 'Hotel Boutique Premium',
    description: 'Hospitalidad de alto nivel en el corazón de Cartagena. Diseñado para viajeros exigentes, combinamos tecnología, confort y un estilo contemporáneo en cada suite. Vive una experiencia premium, ya sea por negocios o placer.',
    coverImage: 'https://media.istockphoto.com/id/1217644893/es/foto/hermosa-vista-panor%C3%A1mica-a%C3%A9rea-de-la-isla-del-distrito-de-bocagrande-cartagena-colombia.jpg?s=612x612&w=0&k=20&c=tBmaV-XafKtdVmXC_tv60FxIkPprdhVM4Bf3VRQ3GJM=',
    profileImage: 'https://images.adsttc.com/media/images/6324/bca9/f48d/350c/1130/1365/medium_jpg/hotel-landmark-plan-b-arquitectos_5.jpg?1663352044',
    rating: 4.8,
    reviews: 124,
    contact: {
      address: 'Calle 35 #3-47, Centro Histórico, Cartagena, Colombia',
      phone: '+57 305 142485712',
      email: 'reservas@ctprimesuites.com'
    },
    services: ['Piscina', 'Spa', 'Restaurante', 'Gimnasio', 'Bar', 'Transporte aeropuerto'],
    socialMedia: {
      facebook: 'https://facebook.com/ctprimesuites',
      instagram: 'https://instagram.com/ctprimesuites',
      twitter: 'https://twitter.com/ctprimesuites'
    },
    amenities: ['wifi', 'pool', 'spa', 'restaurant', 'gym', 'bar', 'parking']
  };

  rooms: Room[] = [
    {
      id: 1,
      name: 'Suite Caribe',
      description: 'Inspirada en el Caribe colombiano, esta suite ofrece vistas al mar y una experiencia de lujo total.',
      image: '',
      price: 1200000,
      size: 120,
      status: 'disponible',
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'jacuzzi'],
      services: ['Desayuno buffet', 'Atención personalizada', 'Acceso a piscina'],
    },
    {
      id: 2,
      name: 'Suite Colonial',
      description: 'Decoración colonial con detalles modernos y una atmósfera cálida perfecta para el descanso.',
         image: '',
      price: 1150000,
      size: 110,
      status: 'ocupado',
      amenities: ['wifi', 'tv', 'ac', 'safe', 'workspace'],
      services: ['Desayuno incluido', 'Room service', 'Acceso a spa']
    },
    {
      id: 3,
      name: 'Suite Tropical',
      description: 'Relájate con la frescura tropical, balcones privados y decoración con plantas naturales.',
         image: '',
      price: 1100000,
      size: 105,
      status: 'disponible',
      amenities: ['wifi', 'ac', 'minibar', 'balcony', 'view'],
      services: ['Desayuno tropical', 'Limpieza diaria', 'Wi-Fi rápido']
    },
    {
      id: 4,
      name: 'Suite Marina',
      description: 'Vistas panorámicas a la bahía, decoración náutica y espacio amplio para familias.',
   image: '',
      price: 1250000,
      size: 130,
      status: 'ocupado',
      amenities: ['wifi', 'tv', 'ac', 'safe', 'balcony', 'view'],
      services: ['Desayuno a la habitación', 'Mayordomo', 'Traslado en yate']
    },
    {
      id: 5,
      name: 'Suite Zen',
      description: 'Espacios minimalistas con iluminación suave y vista al jardín interno, ideal para relajarse.',
   image: '',
      price: 1000000,
      size: 100,
      status: 'disponible',
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'workspace'],
      services: ['Desayuno saludable', 'Clases de yoga', 'Spa incluido']
    },
    {
      id: 6,
      name: 'Suite Bohemia',
      description: 'Decoración artística, colores vivos y una terraza privada con hamacas.',
   image: '',
      price: 950000,
      size: 95,
      status: 'disponible',
      amenities: ['wifi', 'tv', 'ac', 'balcony', 'workspace'],
      services: ['Desayuno continental', 'Asistencia personalizada', 'Acceso al lounge']
    }
  ];

  allAmenities: Amenity[] = [
    { id: 'wifi', name: 'WiFi de alta velocidad', icon: 'wifi' },
    { id: 'tv', name: 'TV pantalla plana', icon: 'tv' },
    { id: 'ac', name: 'Aire acondicionado', icon: 'snowflake' },
    { id: 'minibar', name: 'Minibar surtido', icon: 'glass-martini-alt' },
    { id: 'jacuzzi', name: 'Jacuzzi privado', icon: 'hot-tub' },
    { id: 'safe', name: 'Caja fuerte digital', icon: 'lock' },
    { id: 'balcony', name: 'Balcón privado', icon: 'door-open' },
    { id: 'view', name: 'Vista al mar', icon: 'mountain' },
    { id: 'workspace', name: 'Área de trabajo', icon: 'laptop' },
    { id: 'pool', name: 'Acceso a piscina infinity', icon: 'swimming-pool' },
    { id: 'spa', name: 'Acceso al spa', icon: 'spa' },
    { id: 'restaurant', name: 'Restaurante gourmet', icon: 'utensils' },
    { id: 'gym', name: 'Gimnasio equipado', icon: 'dumbbell' },
    { id: 'bar', name: 'Bar exclusivo', icon: 'cocktail' },
    { id: 'parking', name: 'Parqueadero privado', icon: 'parking' }
  ];

  showModal = false;
  currentModal: ModalType | null = null;
  selectedRoom: Room | null = null;
  
  userData: UserData = {
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    fechaNacimiento: '',
    email: '',
    telefono: ''
  };

  getAmenityName(id: string): string {
    const amenity = this.allAmenities.find(a => a.id === id);
    return amenity ? amenity.name : id;
  }

  reserveRoom(roomId: number): void {
    const room = this.rooms.find(r => r.id === roomId);
    if (!room) return;
    
    this.selectedRoom = room;
    if (this.selectedRoom.status === 'disponible') {
      this.showModal = true;
      this.currentModal = 'confirmation';
    }
  }

  confirmData(): void {
    if (this.validateUserData()) {
      this.currentModal = 'payment';
    } else {
      alert('Por favor complete todos los campos requeridos correctamente');
    }
  }

  validateUserData(): boolean {
    // Validación básica de campos requeridos
    const requiredFields = [
      this.userData.nombre,
      this.userData.apellido,
      this.userData.tipoDocumento,
      this.userData.numeroDocumento,
      this.userData.fechaNacimiento,
      this.userData.email,
      this.userData.telefono
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
    if (this.userData.telefono.replace(/\D/g, '').length < 7) {
      return false;
    }

    return true;
  }

  processPayment(): void {
    // Simulación de pago exitoso
    setTimeout(() => {
      this.currentModal = 'success';
      
      // Enviar datos al backend (simulado)
      const reservationData = {
        room: this.selectedRoom,
        user: this.userData,
        paymentDate: new Date(),
        reservationId: Math.random().toString(36).substring(2, 15)
      };
      
      console.log('Reserva creada:', reservationData);
      
      // Actualizar estado de la habitación
      if (this.selectedRoom) {
        this.selectedRoom.status = 'ocupado';
      }
    }, 1500);
  }

  closeModals(): void {
    this.showModal = false;
    setTimeout(() => {
      this.currentModal = null;
      this.resetUserData();
    }, 300);
  }

  private resetUserData(): void {
    this.userData = {
      nombre: '',
      apellido: '',
      tipoDocumento: '',
      numeroDocumento: '',
      fechaNacimiento: '',
      email: '',
      telefono: ''
    };
  }

  formatPrice(price: number | undefined): string {
    if (!price) return '$0';
    
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }

  getRoomStatusClass(status: RoomStatus): string {
    return status === 'disponible' 
      ? 'bg-green-500 text-white' 
      : 'bg-red-500 text-white';
  }

  getRoomStatusText(status: RoomStatus): string {
    return status === 'disponible' ? 'Disponible' : 'Ocupada';
  }
}