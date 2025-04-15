import { Component } from '@angular/core';

// Interfaces para tipado fuerte
interface Hotel {
  name: string;
  description: string;
  coverImage: string;
  logo: string;
  rating: number;
  socialMedia: SocialMedia[];
  rooms: Room[];
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

interface ContactInfo {
  icon: string;
  value: string;
}

@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styleUrls: ['./pagina-web.component.css'],
  standalone: false,
})
export class PaginaWebComponent {
  hotel: Hotel = {
    name: "Hotel Luxury Paradise",
    description: "Experiencia de lujo en el corazón de la ciudad",
    coverImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    logo: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    rating: 5,
    socialMedia: [
      { type: "facebook", username: "luxuryparadise" },
      { type: "instagram", username: "luxury_paradise" }
    ],
    rooms: [
      {
        name: "Suite Presidencial",
        description: "Amplia suite con vistas panorámicas",
        price: 450,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304"
      }
    ]
  };

  contactInfo: ContactInfo[] = [
    { icon: "📍", value: "Av. Principal 123, Ciudad" },
    { icon: "📞", value: "+1 234 567 890" },
    { icon: "✉️", value: "info@luxuryparadise.com" },
    { icon: "🌐", value: "www.luxuryparadise.com" }
  ];

  // Métodos corregidos con tipado adecuado
  updateHotel(field: keyof Hotel, event: Event): void {
    const target = event.target as HTMLElement;
    if (field in this.hotel) {
      (this.hotel[field] as string) = target.textContent || '';
    }
  }

  updateContact(contact: ContactInfo, event: Event): void {
    contact.value = (event.target as HTMLElement).textContent || '';
  }

  updateSocial(index: number, field: keyof SocialMedia, event: Event): void {
    const target = event.target as HTMLElement;
    if (index >= 0 && index < this.hotel.socialMedia.length) {
      this.hotel.socialMedia[index][field] = target.textContent || '';
    }
  }

  updateRoom(index: number, field: keyof Room, event: Event): void {
    const target = event.target as HTMLElement;
    const value = target.textContent || '';
    
    if (index >= 0 && index < this.hotel.rooms.length) {
      if (field === 'price') {
        const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
        this.hotel.rooms[index][field] = numericValue;
      } else {
        (this.hotel.rooms[index][field] as string) = value;
      }
    }
  }

  addSocial(): void {
    this.hotel.socialMedia.push({ 
      type: "website", 
      username: "nuevousuario" 
    });
  }

  removeSocial(index: number): void {
    if (index >= 0 && index < this.hotel.socialMedia.length) {
      this.hotel.socialMedia.splice(index, 1);
    }
  }

  addRoom(): void {
    this.hotel.rooms.push({
      name: "Nueva Habitación",
      description: "Descripción aquí",
      price: 0,
      image: "https://via.placeholder.com/400x300"
    });
  }

  removeRoom(index: number): void {
    if (index >= 0 && index < this.hotel.rooms.length) {
      this.hotel.rooms.splice(index, 1);
    }
  }

  // Métodos para imágenes
  editImage(type: 'cover' | 'logo'): void {
    const newImage = prompt("Introduce la URL de la nueva imagen");
    if (newImage) {
      if (type === 'cover') {
        this.hotel.coverImage = newImage;
      } else {
        this.hotel.logo = newImage;
      }
    }
  }

  editRoomImage(index: number): void {
    const newImage = prompt("Introduce la URL de la nueva imagen");
    if (newImage && index >= 0 && index < this.hotel.rooms.length) {
      this.hotel.rooms[index].image = newImage;
    }
  }

  getSocialIcon(type: string): string {
    const icons: Record<string, string> = {
      facebook: "👍",
      instagram: "📸",
      twitter: "🐦",
      website: "🌐"
    };
    return icons[type] || "🔗";
  }
}