import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations-applications',
  standalone: false,
  templateUrl: './reservations-applications.component.html',
  styleUrl: './reservations-applications.component.css'
})
export class ReservationsApplicationsComponent implements OnInit{
  activeTab: string = 'destinos';
  
  // Datos para las pestañas
  destinations = [
    {
      image: 'https://imgs.search.brave.com/CLwxCghoPjh1YUkPPs_QnWWZEp54RyYbPLEC4vVtaqk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk3LzkzLzEy/LzM2MF9GXzI5Nzkz/MTI2OV9vUG9rYzNt/UTJ0TUlmcnZDanIy/bmd3aUw1RURVN3pS/bC5qcGc',
      name: 'Cartagena',
      rating: 4.8,
      reviews: 1240,
      badge: 'Más reservado'
    },
    {
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      name: 'Medellín',
      rating: 4.7,
      reviews: 980
    },
    {
      image: 'https://imgs.search.brave.com/ceJhvsVuN3cUkHWwgi6VrpQAwQvme6nuftueffDnIjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zYW5k/YWx0YW5tYW4uY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI0/LzA5L2hvdGVsLmpw/Zw',
      name: 'Santa Marta',
      rating: 4.9,
      reviews: 1540,
      badge: 'Mejor valorado'
    },
    {
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      name: 'Bogotá',
      rating: 4.6,
      reviews: 890
    }
  ];

  experiences = [
    {
      image: 'https://images.unsplash.com/photo-1587974310734-8aac16601f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      location: 'Cartagena',
      title: 'Tour histórico por la ciudad amurallada',
      description: 'Descubre los secretos mejor guardados de la Cartagena colonial con guías expertos.',
      price: 120000
    },
    {
      image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      location: 'Eje Cafetero',
      title: 'Experiencia cafetera en finca tradicional',
      description: 'Vive el proceso completo del café, desde la recolección hasta la taza.',
      price: 85000
    },
    {
      image: 'https://images.unsplash.com/photo-1584291885855-f7387e6e54a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      location: 'Santa Marta',
      title: 'Excursión al Parque Tayrona',
      description: 'Disfruta de las playas más hermosas de Colombia en este tour guiado.',
      price: 150000
    },
    {
      image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      location: 'Medellín',
      title: 'Tour a Guatapé y Piedra del Peñol',
      description: 'Descubre el embalse más hermoso de Antioquia y sube los 740 escalones de la Piedra.',
      price: 95000
    }
  ];

  travelTips = [
    {
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'Preparación',
      title: 'Qué empacar para Colombia',
      description: 'La lista esencial para estar preparado según el clima de cada región.'
    },
    {
      image: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'Movilidad',
      title: 'Cómo moverte entre ciudades',
      description: 'Guía completa de transporte: avión, bus y opciones privadas.'
    },
    {
      image: 'https://imgs.search.brave.com/eyCqPY10g7HocyE_xqHp1zdPidel2xhQzYM3_8cuC6U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z291cm1ldC5jb20u/Y28vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMDUvZ2FzdHJv/bm9taWEtY29sb21i/aWFuYS5qcGc',
      category: 'Gastronomía',
      title: 'Platos que no puedes perderte',
      description: 'La guía gastronómica esencial para cada región de Colombia.'
    }
  ];

  stats = [
    { value: '+850', label: 'Alojamientos' },
    { value: '95%', label: 'Satisfacción' },
    { value: '24/7', label: 'Atención al cliente' },
    { value: '+50', label: 'Destinos' }
  ];

  testimonials = [
    {
      photo: 'https://randomuser.me/api/portraits/women/43.jpg',
      name: 'María González',
      rating: 5.0,
      comment: '"Encontré el apartamento perfecto en Cartagena gracias a esta plataforma. La atención fue excelente y el lugar superó todas mis expectativas."'
    },
    {
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Carlos Rodríguez',
      rating: 4.8,
      comment: '"La mejor relación calidad-precio en Medellín. El proceso de reserva fue súper fácil y el soporte respondió todas mis dudas rápidamente."'
    }
  ];

  benefits = [
    {
      icon: 'M5 13l4 4L19 7',
      title: 'Garantía de mejor precio',
      description: 'Si encuentras un precio más bajo, te igualamos y te damos un 10% adicional de descuento.'
    },
    {
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Cancelación flexible',
      description: 'Cancela sin costo hasta 24 horas antes de tu llegada en la mayoría de propiedades.'
    },
    {
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      title: 'Pago seguro',
      description: 'Tu información está protegida con encriptación de grado bancario.'
    },
    {
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Asistencia 24/7',
      description: 'Nuestro equipo está disponible en todo momento para ayudarte durante tu viaje.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
  }
}
