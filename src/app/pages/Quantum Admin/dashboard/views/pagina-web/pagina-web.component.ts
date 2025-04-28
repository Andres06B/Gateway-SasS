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
    name: 'Hotel Paradise',
    description: 'Un oasis de lujo y confort en el corazón de la ciudad. Disfrute de una experiencia única con nuestras instalaciones de primera clase.',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    profileImage: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
    contact: {
      address: 'Av. Principal 123, Ciudad',
      phone: '+1 234 567 890',
      email: 'contacto@hotelparadise.com'
    },
    services: ['Piscina', 'Spa', 'Restaurante', 'Gimnasio', 'Bar'],
    socialMedia: {
      facebook: 'https://facebook.com/hotelparadise',
      instagram: 'https://instagram.com/hotelparadise',
      twitter: 'https://twitter.com/hotelparadise'
    },
    amenities: ['wifi', 'pool', 'spa', 'restaurant', 'gym', 'bar']
  };


  rooms = [
    {
      id: 1,
      name: 'Habitación Deluxe',
      description: 'Espaciosa habitación con vista al mar y balcón privado.',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
      price: 150,
      amenities: ['wifi', 'tv', 'ac', 'minibar'],
      services: ['Desayuno incluido', 'Limpieza diaria', 'Servicio a la habitación']
    },
    {
      id: 2,
      name: 'Suite Ejecutiva',
      description: 'Lujosa suite con sala de estar y jacuzzi privado.',
      image: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658',
      price: 250,
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'jacuzzi'],
      services: ['Desayuno buffet', 'Limpieza diaria', 'Servicio a la habitación', 'Acceso a lounge']
    }
  ];

  allAmenities = [
    { id: 'wifi', name: 'WiFi' },
    { id: 'tv', name: 'TV' },
    { id: 'ac', name: 'Aire Acondicionado' },
    { id: 'minibar', name: 'Minibar' },
    { id: 'jacuzzi', name: 'Jacuzzi' },
    { id: 'safe', name: 'Caja Fuerte' },
    { id: 'balcony', name: 'Balcón' },
    { id: 'view', name: 'Vista al mar' }
  ];

  allServices = [
    'Desayuno incluido',
    'Desayuno buffet',
    'Limpieza diaria',
    'Servicio a la habitación',
    'Acceso a lounge',
    'Traslado al aeropuerto',
    'Spa gratis',
    'Late checkout'
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
    return url; // Fallback si no es Cloudinary
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
}