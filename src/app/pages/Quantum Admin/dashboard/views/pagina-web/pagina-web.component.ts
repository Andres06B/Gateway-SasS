import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

interface ContactInfo {
  type: string;
  value: string;
}

interface SocialMedia {
  type: string;
  username: string;
}

interface Room {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Hotel {
  name: string;
  description: string;
  rating: number;
  coverImage: string;
  logo: string;
  contactInfo: ContactInfo[];
  socialMedia: SocialMedia[];
  rooms: Room[];
}

@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styleUrls: ['./pagina-web.component.scss'],
  standalone: false,
})
export class PaginaWebComponent {
  @Input() hotel: Hotel = {
    name: 'Nombre del Hotel',
    description: 'Descripción breve del hotel...',
    rating: 4,
    coverImage: 'assets/default-cover.jpg',
    logo: 'assets/default-logo.png',
    contactInfo: [
      { type: 'address', value: 'Dirección del hotel' },
      { type: 'phone', value: '+123 456 7890' },
      { type: 'email', value: 'contacto@hotel.com' },
      { type: 'website', value: 'www.hotel.com' }
    ],
    socialMedia: [
      { type: 'facebook', username: '@hotel' },
      { type: 'instagram', username: '@hotel' }
    ],
    rooms: [
      {
        name: 'Habitación Estándar',
        description: 'Cama doble, baño privado, TV',
        price: 120,
        image: 'assets/room1.jpg'
      }
    ]
  };

  @Output() profileUpdated = new EventEmitter<Hotel>();

  constructor(private sanitizer: DomSanitizer) {}

  getContactIcon(type: string): string {
    const iconMap: {[key: string]: string} = {
      'address': 'fa-map-marker-alt',
      'phone': 'fa-phone',
      'email': 'fa-envelope',
      'website': 'fa-globe'
    };
    return iconMap[type] || 'fa-info-circle';
  }

  getSocialPrefix(type: string): string {
    const prefixMap: {[key: string]: string} = {
      'facebook': 'fb.com/',
      'instagram': '@',
      'twitter': '@',
      'linkedin': 'linkedin.com/in/'
    };
    return prefixMap[type] || '';
  }

  updateField(field: keyof Hotel, event: Event): void {
    const target = event.target as HTMLElement;
    if (target?.textContent) {
      (this.hotel[field] as any) = target.textContent;
      this.profileUpdated.emit(this.hotel);
    }
  }

  updateRating(rating: number): void {
    this.hotel.rating = rating;
    this.profileUpdated.emit(this.hotel);
  }

  updateContact(index: number, event: Event): void {
    const target = event.target as HTMLElement;
    if (target?.textContent && this.hotel.contactInfo[index]) {
      this.hotel.contactInfo[index].value = target.textContent;
      this.profileUpdated.emit(this.hotel);
    }
  }

  updateSocial(index: number, field: keyof SocialMedia, event: Event): void {
    const target = event.target as HTMLElement;
    if (target?.textContent && this.hotel.socialMedia[index]) {
      (this.hotel.socialMedia[index][field] as any) = target.textContent;
      this.profileUpdated.emit(this.hotel);
    }
  }

  updateRoom(index: number, field: keyof Room, event: Event): void {
    const target = event.target as HTMLElement;
    if (target?.textContent && this.hotel.rooms[index]) {
      if (field === 'price') {
        const value = parseFloat(target.textContent) || 0;
        this.hotel.rooms[index][field] = value;
      } else {
        (this.hotel.rooms[index][field] as any) = target.textContent;
      }
      this.profileUpdated.emit(this.hotel);
    }
  }

  addSocial(): void {
    this.hotel.socialMedia.push({ type: 'facebook', username: '' });
    this.profileUpdated.emit(this.hotel);
  }

  removeSocial(index: number): void {
    this.hotel.socialMedia.splice(index, 1);
    this.profileUpdated.emit(this.hotel);
  }

  addRoom(): void {
    this.hotel.rooms.push({
      name: 'Nueva Habitación',
      description: 'Descripción de la habitación',
      price: 0,
      image: 'assets/default-room.jpg'
    });
    this.profileUpdated.emit(this.hotel);
  }

  removeRoom(index: number): void {
    this.hotel.rooms.splice(index, 1);
    this.profileUpdated.emit(this.hotel);
  }

  onImageUpload(type: 'cover' | 'logo', event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (type === 'cover') {
          this.hotel.coverImage = e.target?.result as string;
        } else {
          this.hotel.logo = e.target?.result as string;
        }
        this.profileUpdated.emit(this.hotel);
      };
      reader.readAsDataURL(file);
    }
  }

  onRoomImageUpload(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length && this.hotel.rooms[index]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.hotel.rooms[index].image = e.target?.result as string;
        this.profileUpdated.emit(this.hotel);
      };
      reader.readAsDataURL(file);
    }
  }
}