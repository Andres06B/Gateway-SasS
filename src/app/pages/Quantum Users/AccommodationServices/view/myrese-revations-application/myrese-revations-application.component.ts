import { Component } from '@angular/core';

@Component({
  selector: 'app-myrese-revations-application',
  standalone: false,
  templateUrl: './myrese-revations-application.component.html',
  styleUrl: './myrese-revations-application.component.css'
})
export class MyreseRevationsApplicationComponent {
  // Estado de los filtros
  filters = {
    status: 'all', // 'all', 'upcoming', 'past', 'cancelled'
    type: 'all'    // 'all', 'hotel', 'cabin', 'hostel'
  };

  // Página actual
  currentPage = 1;
  totalPages = 8;

  // Datos de ejemplo de reservas
  bookings = [
    {
      id: 'CTG-2024-5872',
      propertyName: 'Hotel Boutique Cartagena',
      roomType: 'Suite Premium Vista al Mar',
      type: 'hotel',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      dates: '15 Nov - 20 Nov 2024 (5 noches)',
      guests: '2 adultos, 1 niño',
      status: 'confirmed',
      price: '$1,850,000 COP'
    },
    {
      id: 'BOG-2024-9821',
      propertyName: 'Grand Hotel Bogotá',
      roomType: 'Habitación Ejecutiva',
      type: 'hotel',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      dates: '5 Dic - 10 Dic 2024 (5 noches)',
      guests: '1 adulto',
      status: 'in_process',
      price: '$1,250,000 COP'
    },
    {
      id: 'SAN-2024-3467',
      propertyName: 'Hostal Caribe Azul',
      roomType: 'Dormitorio Privado',
      type: 'hostel',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      dates: '10 Ene - 15 Ene 2024 (5 noches)',
      guests: '2 adultos',
      status: 'completed',
      price: '$850,000 COP'
    },
    {
      id: 'SAL-2024-1256',
      propertyName: 'Cabañas Valle de Cocora',
      roomType: 'Cabaña Familiar',
      type: 'cabin',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      dates: '22 Mar - 25 Mar 2024 (3 noches)',
      guests: '2 adultos, 2 niños',
      status: 'cancelled',
      price: '$1,200,000 COP'
    },
    {
      id: 'MED-2024-7890',
      propertyName: 'Hotel Medellín Plaza',
      roomType: 'Habitación Doble',
      type: 'hotel',
      image: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      dates: '1 Feb - 5 Feb 2024 (4 noches)',
      guests: '2 adultos',
      status: 'completed',
      price: '$1,000,000 COP'
    },
    {
      id: 'CLO-2024-4563',
      propertyName: 'Hostal Cali Dreams',
      roomType: 'Dormitorio Compartido',
      type: 'hostel',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      dates: '10 Mar - 15 Mar 2024 (5 noches)',
      guests: '1 adulto',
      status: 'cancelled',
      price: '$450,000 COP'
    },
    {
      id: 'SMR-2024-1122',
      propertyName: 'Hotel Santa Marta Beach',
      roomType: 'Suite Familiar',
      type: 'hotel',
      image: 'https://images.unsplash.com/photo-1576675784015-1d5eebd1c1c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      dates: '20 Abr - 25 Abr 2024 (5 noches)',
      guests: '2 adultos, 2 niños',
      status: 'confirmed',
      price: '$2,000,000 COP'
    },
    {
      id: 'BOG-2024-3345',
      propertyName: 'Hostal Bogotá Central',
      roomType: 'Habitación Privada',
      type: 'hostel',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      dates: '5 May - 10 May 2024 (5 noches)',
      guests: '1 adulto',
      status: 'in_process',
      price: '$600,000 COP'
    }
  ];

  // Filtrar reservas según los filtros activos
  get filteredBookings() {
    return this.bookings.filter(booking => {
      // Filtrar por estado
      const statusMatch = 
        this.filters.status === 'all' || 
        (this.filters.status === 'upcoming' && booking.status === 'confirmed') ||
        (this.filters.status === 'past' && booking.status === 'completed') ||
        (this.filters.status === 'cancelled' && booking.status === 'cancelled');
      
      // Filtrar por tipo
      const typeMatch = 
        this.filters.type === 'all' || 
        booking.type === this.filters.type;
      
      return statusMatch && typeMatch;
    });
  }

  // Cambiar filtro de estado
  setStatusFilter(status: string) {
    this.filters.status = status;
    this.currentPage = 1; // Resetear a la primera página al cambiar filtros
  }

  // Cambiar filtro de tipo
  setTypeFilter(type: string) {
    this.filters.type = type;
    this.currentPage = 1; // Resetear a la primera página al cambiar filtros
  }

  // Cambiar página
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Aquí podrías cargar los datos de la nueva página si estuvieras haciendo paginación del lado del servidor
    }
  }

  // Obtener clase de estado para el badge
  getStatusClass(status: string) {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'in_process':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Obtener texto de estado
  getStatusText(status: string) {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'in_process':
        return 'En proceso';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return '';
    }
  }

  // Obtener clase y texto para el tipo de propiedad
  getPropertyType(type: string) {
    switch (type) {
      case 'hotel':
        return { class: 'bg-blue-100 text-blue-800', text: 'Hotel' };
      case 'cabin':
        return { class: 'bg-orange-100 text-orange-800', text: 'Cabaña' };
      case 'hostel':
        return { class: 'bg-purple-100 text-purple-800', text: 'Hostal' };
      default:
        return { class: 'bg-gray-100 text-gray-800', text: '' };
    }
  }
}
