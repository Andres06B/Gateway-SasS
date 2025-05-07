import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservations-applications',
  standalone: false,
  templateUrl: './reservations-applications.component.html',
  styleUrl: './reservations-applications.component.css'
})
export class ReservationsApplicationsComponent implements OnInit {

  hovering = false;

  activeTab: string = 'destinos';
  searchPerformed = false;
  selectedDestination = '';
  selectedCheckIn = '';
  selectedCheckOut = '';
  searchForm: FormGroup;
  
  // Hoteles de ejemplo (solo 1 disponible en Cartagena, otros próximos)
  hotels = [
    {
      id: 1,
      name: 'CT Prime Suites',
      city: 'cartagena',
      image: 'https://images.adsttc.com/media/images/6324/bca9/f48d/350c/1130/1365/medium_jpg/hotel-landmark-plan-b-arquitectos_5.jpg?1663352044',
      rating: 4.8,
      available: true,
    },
    {
      id: 2,
      name: 'Hotel Dann Carlton Medellín',
      city: 'medellin',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      available: false,
    },
    {
      id: 3,
      name: 'Hotel Tequendama Bogotá',
      city: 'bogota',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      rating: 4.5,
      available: false,
    }
  ];

  // Datos para las pestañas
  destinations = [
    {
      image: 'https://mlqfmr3rpryd.i.optimole.com/cb:JBSP.a525/w:auto/h:auto/q:100/ig:avif/https://cartagena-tours.co/wp-content/uploads/2023/12/Torre-del-Reloj-en-Cartagena-de-Indias-Colombia.jpg',
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
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      name: 'Bogotá',
      rating: 4.6,
      reviews: 890
    },
    {
      image: 'https://denomades-blog.imgix.net/blog/wp-content/uploads/2024/07/31024711/5.jpg?auto=compress%2Cformat&ixlib=php-3.3.1',
      name: 'Santa Marta',
      rating: 4.6,
      reviews: 890
    }
  ];

  experiences = [
    {
      image: 'https://www.worldmoments.org/wp-content/uploads/2018/02/cartagena_playa_blanca1-e1523469922549.jpg',
      location: 'Cartagena',
      title: 'Tour histórico por la ciudad amurallada',
      description: 'Descubre los secretos mejor guardados de la Cartagena colonial con guías expertos.',
      price: 120000
    },
    {
      image: 'https://colombianadventure.co/wp-content/uploads/2019/01/Salento-1080x675.jpg',
      location: 'Eje Cafetero',
      title: 'Experiencia cafetera en finca tradicional',
      description: 'Vive el proceso completo del café, desde la recolección hasta la taza.',
      price: 85000
    },
    {
      image: 'https://poporotours.com/wp-content/uploads/2022/04/parque-tayrona.webp',
      location: 'Santa Marta',
      title: 'Excursión al Parque Tayrona',
      description: 'Disfruta de las playas más hermosas de Colombia en este tour guiado.',
      price: 150000
    },
    {
      image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/37/cf/18.jpg',
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
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq4z-esEG-iewR_JSiupg8oR3wHfrjSshxGw&s',
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

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      destination: ['', Validators.required],
      checkIn: ['', [Validators.required, this.futureDateValidator()]],
      checkOut: ['', [Validators.required, this.futureDateValidator()]]
    }, { validator: this.dateComparisonValidator });
  }

  ngOnInit(): void {
    this.setMinDateForInputs();
  }

  private setMinDateForInputs(): void {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach((input: any) => {
      input.min = today;
    });
  }

  futureDateValidator() {
    return (control: { value: string }) => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return selectedDate >= today ? null : { pastDate: true };
    };
  }

  dateComparisonValidator(group: FormGroup) {
    const checkIn = group.get('checkIn')?.value;
    const checkOut = group.get('checkOut')?.value;

    if (!checkIn || !checkOut) return null;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    return checkOutDate > checkInDate ? null : { dateOrder: true };
  }

  searchHotels(): void {
    if (this.searchForm.invalid) {
      this.markFormGroupTouched(this.searchForm);
      return;
    }

    const formValues = this.searchForm.value;
    this.selectedDestination = formValues.destination;
    this.selectedCheckIn = formValues.checkIn;
    this.selectedCheckOut = formValues.checkOut;
    this.searchPerformed = true;

    setTimeout(() => {
      const resultsSection = document.getElementById('search-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
  }

  getFilteredHotels(): any[] {
    if (!this.selectedDestination) return [];
    return this.hotels.filter(hotel => hotel.city === this.selectedDestination);
  }
}