import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styleUrls: ['./pagina-web.component.css'],
  standalone: false,
})
export class PaginaWebComponent implements OnInit {

  showRoomModal: boolean = false;
  showHotelEditModal: boolean = false;
  showImageModal: { type: 'cover' | 'profile', show: boolean } = { type: 'cover', show: false };
  
  hotelForm!: FormGroup;
  roomForm!: FormGroup;

  hotelData = {
    name: 'CT Prime Suites',
    description: 'Hospitalidad de alto nivel en el corazón de Cartagena. Diseñado para viajeros exigentes, combinamos tecnología, confort y un estilo contemporáneo en cada suite. Vive una experiencia premium, ya sea por negocios o placer.',
    coverImage: 'https://media.istockphoto.com/id/1217644893/es/foto/hermosa-vista-panor%C3%A1mica-a%C3%A9rea-de-la-isla-del-distrito-de-bocagrande-cartagena-colombia.jpg?s=612x612&w=0&k=20&c=tBmaV-XafKtdVmXC_tv60FxIkPprdhVM4Bf3VRQ3GJM=',
    profileImage: 'https://sdmntprwestus2.oaiusercontent.com/files/00000000-89f4-61f8-b7c0-e9a23732ff40/raw?se=2025-05-06T06%3A15%3A32Z&sp=r&sv=2024-08-04&sr=b&scid=fde1ce44-d6ba-578e-a9f0-dd7f72c4dffa&skoid=b53ae837-f585-4db7-b46f-2d0322fce5a9&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-06T03%3A24%3A37Z&ske=2025-05-07T03%3A24%3A37Z&sks=b&skv=2024-08-04&sig=SLdfj/zpA0qQOcg6NR2VPee8221itqiw24xazr9ZBCo%3D',
    contact: {
      address: 'Calle 35 #3-47, Centro Histórico, Cartagena, Colombia',
      phone: '+57 305 142485712',
      email: 'reservas@ctprimesuites.com'
    },
    services: ['Piscina', 'Spa', 'Restaurante', 'Gimnasio', 'Bar', 'Transporte aeropuerto'],
    socialMedia: {
      facebook: 'https://facebook.com/hotelparadisecolombia',
      instagram: 'https://instagram.com/hotelparadisecolombia',
      twitter: 'https://twitter.com/hotelparadiseco'
    },
    amenities: ['wifi', 'pool', 'spa', 'restaurant', 'gym', 'bar', 'parking']
  };

  rooms = [
    // Habitaciones Normales (3)
    {
      id: 1,
      name: 'Habitación Sencilla',
      type: 'normal',
      description: 'Cómoda habitación individual con todas las comodidades básicas para una estancia agradable.',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
      price: 120000,
      amenities: ['wifi', 'tv', 'ac', 'safe'],
      services: ['Limpieza diaria', 'Toallas y amenities']
    },
    {
      id: 2,
      name: 'Habitación Doble',
      type: 'normal',
      description: 'Amplia habitación con dos camas individuales, ideal para amigos o compañeros de viaje.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      price: 180000,
      amenities: ['wifi', 'tv', 'ac', 'safe'],
      services: ['Limpieza diaria', 'Servicio a la habitación']
    },
    {
      id: 3,
      name: 'Habitación Familiar',
      type: 'normal',
      description: 'Espacio familiar con capacidad para 4 personas, perfecta para vacaciones con niños.',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
      price: 250000,
      amenities: ['wifi', 'tv', 'ac', 'safe', 'balcony'],
      services: ['Limpieza diaria', 'Servicio a la habitación', 'Cunas disponibles']
    },

    // Habitaciones Matrimoniales (3)
    {
      id: 4,
      name: 'Habitación Matrimonial Standard',
      type: 'matrimonial',
      description: 'Acogedora habitación con cama king size y decoración moderna para una estancia romántica.',
      image: 'https://images.homify.com/v1507846368/p/photo/image/2270334/0036-DSC04098.jpg',
      price: 200000,
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe'],
      services: ['Limpieza diaria', 'Desayuno incluido']
    },
    {
      id: 5,
      name: 'Habitación Matrimonial Deluxe',
      type: 'matrimonial',
      description: 'Amplia habitación matrimonial con zona de estar y vista privilegiada a la ciudad.',
      image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b',
      price: 280000,
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'balcony', 'view'],
      services: ['Limpieza diaria', 'Desayuno buffet', 'Late checkout']
    },
    {
      id: 6,
      name: 'Suite Matrimonial con Jacuzzi',
      type: 'matrimonial',
      description: 'Exclusiva suite con jacuzzi privado para una experiencia romántica inolvidable.',
      image: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658',
      price: 350000,
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'jacuzzi', 'safe', 'balcony', 'view'],
      services: ['Limpieza diaria', 'Desayuno buffet', 'Spa gratis', 'Late checkout']
    },
  ];

  allAmenities = [
    { id: 'wifi', name: 'WiFi' },
    { id: 'tv', name: 'TV' },
    { id: 'ac', name: 'Aire Acondicionado' },
    { id: 'minibar', name: 'Minibar' },
    { id: 'jacuzzi', name: 'Jacuzzi' },
    { id: 'safe', name: 'Caja Fuerte' },
    { id: 'balcony', name: 'Balcón' },
    { id: 'view', name: 'Vista panorámica' },
    { id: 'workspace', name: 'Área de trabajo' },
    { id: 'pool', name: 'Acceso a piscina' }
  ];

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

  currentRoomIndex: number | 'new' | null = null;

  constructor(private fb: FormBuilder) {
    this.initForms();
  }

  ngOnInit(): void {}

  initForms(): void {
    this.hotelForm = this.fb.group({
      name: [this.hotelData.name],
      description: [this.hotelData.description],
      contact: this.fb.group({
        address: [this.hotelData.contact.address],
        phone: [this.hotelData.contact.phone],
        email: [this.hotelData.contact.email]
      }),
      services: this.fb.array(this.hotelData.services),
      socialMedia: this.fb.group({
        facebook: [this.hotelData.socialMedia.facebook],
        instagram: [this.hotelData.socialMedia.instagram],
        twitter: [this.hotelData.socialMedia.twitter]
      }),
      amenities: this.fb.array(this.hotelData.amenities.map(a => this.fb.control(a)))
    });

    this.roomForm = this.fb.group({
      name: [''],
      type: ['normal'],
      description: [''],
      image: [''],
      price: [0],
      amenities: this.fb.array([]),
      services: this.fb.array([])
    });
  }

  getOptimizedImage(url: string, width: number, quality = 80): string {
    if(url.includes('cloudinary.com')) {
      return url.replace('/upload/', `/upload/w_${width},q_${quality}/`);
    }
    return url;
  }

  get hotelServices(): FormArray {
    return this.hotelForm.get('services') as FormArray;
  }

  get hotelAmenities(): FormArray {
    return this.hotelForm.get('amenities') as FormArray;
  }

  get roomAmenities(): FormArray {
    return this.roomForm.get('amenities') as FormArray;
  }

  get roomServices(): FormArray {
    return this.roomForm.get('services') as FormArray;
  }

  addHotelService(): void {
    this.hotelServices.push(this.fb.control(''));
  }

  removeHotelService(index: number): void {
    this.hotelServices.removeAt(index);
  }

  toggleHotelAmenity(amenity: string): void {
    const amenities = this.hotelAmenities;
    const index = amenities.controls.findIndex(c => c.value === amenity);
    
    if (index >= 0) {
      amenities.removeAt(index);
    } else {
      amenities.push(this.fb.control(amenity));
    }
  }

  hotelHasAmenity(amenity: string): boolean {
    return this.hotelData.amenities.includes(amenity);
  }

  toggleRoomAmenity(amenity: string): void {
    const amenities = this.roomAmenities;
    const index = amenities.controls.findIndex(c => c.value === amenity);
    
    if (index >= 0) {
      amenities.removeAt(index);
    } else {
      amenities.push(this.fb.control(amenity));
    }
  }

  roomHasAmenity(amenity: string): boolean {
    if (this.currentRoomIndex === 'new') {
      return this.roomAmenities.value.includes(amenity);
    } else if (this.currentRoomIndex !== null) {
      return this.rooms[this.currentRoomIndex].amenities.includes(amenity);
    }
    return false;
  }

  addRoomService(): void {
    this.roomServices.push(this.fb.control(''));
  }

  removeRoomService(index: number): void {
    this.roomServices.removeAt(index);
  }

  openRoomModal(index: number | 'new'): void {
    this.currentRoomIndex = index;
    
    if (index === 'new') {
      this.roomForm.reset({
        name: '',
        type: 'normal',
        description: '',
        image: '',
        price: 0,
        amenities: [],
        services: []
      });
    } else {
      const room = this.rooms[index];
      this.roomForm.patchValue({
        name: room.name,
        type: room.type,
        description: room.description,
        image: room.image,
        price: room.price
      });
      
      this.roomAmenities.clear();
      room.amenities.forEach(a => this.roomAmenities.push(this.fb.control(a)));
      
      this.roomServices.clear();
      room.services.forEach(s => this.roomServices.push(this.fb.control(s)));
    }
    
    this.showRoomModal = true;
  }

  saveRoom(): void {
    if (this.roomForm.invalid) return;
    
    const roomData = this.roomForm.value;
    
    if (this.currentRoomIndex === 'new') {
      this.rooms.push({
        id: this.rooms.length + 1,
        name: roomData.name,
        type: roomData.type,
        description: roomData.description,
        image: roomData.image,
        price: roomData.price,
        amenities: roomData.amenities,
        services: roomData.services
      });
    } else {
      if (this.currentRoomIndex !== null && typeof this.currentRoomIndex === 'number') {
        this.rooms[this.currentRoomIndex] = {
          ...this.rooms[this.currentRoomIndex],
          name: roomData.name,
          type: roomData.type,
          description: roomData.description,
          image: roomData.image,
          price: roomData.price,
          amenities: roomData.amenities,
          services: roomData.services
        };
      }
    }
    
    this.closeRoomModal();
  }

  deleteRoom(index: number): void {
    this.rooms.splice(index, 1);
  }

  closeRoomModal(): void {
    this.showRoomModal = false;
    this.currentRoomIndex = null;
  }

  saveHotel(): void {
    if (this.hotelForm.invalid) return;
    
    this.hotelData = {
      ...this.hotelData,
      name: this.hotelForm.value.name,
      description: this.hotelForm.value.description,
      contact: {
        address: this.hotelForm.value.contact.address,
        phone: this.hotelForm.value.contact.phone,
        email: this.hotelForm.value.contact.email
      },
      services: this.hotelForm.value.services,
      socialMedia: {
        facebook: this.hotelForm.value.socialMedia.facebook,
        instagram: this.hotelForm.value.socialMedia.instagram,
        twitter: this.hotelForm.value.socialMedia.twitter
      },
      amenities: this.hotelForm.value.amenities
    };
    
    this.showHotelEditModal = false;
  }

  openImageModal(type: 'cover' | 'profile'): void {
    this.showImageModal = { type, show: true };
  }

  closeImageModal(): void {
    this.showImageModal = { type: 'cover', show: false };
  }

  onImageUpload(event: Event, type: 'cover' | 'profile'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'cover') {
          this.hotelData.coverImage = e.target.result;
        } else {
          this.hotelData.profileImage = e.target.result;
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  getAmenityName(id: string): string {
    const amenity = this.allAmenities.find(a => a.id === id);
    return amenity ? amenity.name : id;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }
}