import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-view',
  standalone: false,
  templateUrl: './hotel-view.component.html',
  styleUrl: './hotel-view.component.css'
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

  rooms = [    
      {
        id: 1,
        name: 'Suite Caribe',
        description: 'Inspirada en el Caribe colombiano, esta suite ofrece vistas al mar y una experiencia de lujo total.',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
        price: 1200000,
        size: 120,
        status: 'disponible',
        amenities: ['wifi', 'tv', 'ac', 'minibar', 'jacuzzi', ],
        services: ['Desayuno buffet', 'Atención personalizada', 'Acceso a piscina'],
      },
      {
        id: 2,
        name: 'Suite Colonial',
        description: 'Decoración colonial con detalles modernos y una atmósfera cálida perfecta para el descanso.',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
        price: 1150000,
        size: 110,
        status: 'ocupada',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'workspace'],
        services: ['Desayuno incluido', 'Room service', 'Acceso a spa']
      },
      {
        id: 3,
        name: 'Suite Tropical',
        description: 'Relájate con la frescura tropical, balcones privados y decoración con plantas naturales.',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
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
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
        price: 1250000,
        size: 130,
        status: 'ocupada',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'balcony', 'view'],
        services: ['Desayuno a la habitación', 'Mayordomo', 'Traslado en yate']
      },
      {
        id: 5,
        name: 'Suite Zen',
        description: 'Espacios minimalistas con iluminación suave y vista al jardín interno, ideal para relajarse.',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
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
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
        price: 950000,
        size: 95,
        status: 'disponible',
        amenities: ['wifi', 'tv', 'ac', 'balcony', 'workspace'],
        services: ['Desayuno continental', 'Asistencia personalizada', 'Acceso al lounge']
      }
        
  ];

  allAmenities = [
    { id: 'wifi', name: 'WiFi de alta velocidad' },
    { id: 'tv', name: 'TV pantalla plana' },
    { id: 'ac', name: 'Aire acondicionado' },
    { id: 'minibar', name: 'Minibar surtido' },
    { id: 'jacuzzi', name: 'Jacuzzi privado' },
    { id: 'safe', name: 'Caja fuerte digital' },
    { id: 'balcony', name: 'Balcón privado' },
    { id: 'view', name: 'Vista al mar' },
    { id: 'workspace', name: 'Área de trabajo' },
    { id: 'pool', name: 'Acceso a piscina infinity' },
    { id: 'spa', name: 'Acceso al spa' },
    { id: 'restaurant', name: 'Restaurante gourmet' },
    { id: 'gym', name: 'Gimnasio equipado' },
    { id: 'bar', name: 'Bar exclusivo' },
    { id: 'parking', name: 'Parqueadero privado' }
  ];

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

  reserveRoom(roomId: number): void {
    const room = this.rooms.find(r => r.id === roomId);
    if (room) {
      alert(`Reserva solicitada para: ${room.name}\nPrecio: ${this.formatPrice(room.price)}`);
      // Aquí podrías implementar la lógica de navegación a la página de reservas
    }
  }
}
