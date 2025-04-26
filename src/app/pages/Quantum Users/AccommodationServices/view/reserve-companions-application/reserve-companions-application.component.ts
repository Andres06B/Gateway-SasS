import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserve-companions-application',
  standalone: false,
  templateUrl: './reserve-companions-application.component.html',
  styleUrl: './reserve-companions-application.component.css'
})
export class ReserveCompanionsApplicationComponent implements OnInit {
  // Estado del componente
  showForm = false;
  companionType: 'adult' | 'child' | null = null;
  reservations: any[] = [];
  selectedReservation: any;
  companions: any[] = [];
  newCompanion: any = {};

  // Datos de ejemplo
  ngOnInit(): void {
    this.loadReservations();
    this.loadCompanions();
  }

  // Cargar reservas de ejemplo
  loadReservations(): void {
    this.reservations = [
      {
        id: 'CTG-2024-5872',
        propertyName: 'Hotel Boutique Cartagena',
        roomType: 'Suite Premium',
        dates: '15-20 Nov 2024',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      },
      {
        id: 'BOG-2024-9821',
        propertyName: 'Grand Hotel Bogotá',
        roomType: 'Habitación Ejecutiva',
        dates: '5-10 Dic 2024',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      },
      {
        id: 'SAN-2024-3467',
        propertyName: 'Hostal Caribe Azul',
        roomType: 'Dormitorio Privado',
        dates: '10-15 Ene 2025',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      }
    ];
    this.selectedReservation = this.reservations[0];
  }

  // Cargar acompañantes de ejemplo
  loadCompanions(): void {
    this.companions = [
      {
        id: 1,
        name: 'Juan Pérez',
        type: 'adult',
        isPrimary: true,
        email: 'juan.perez@email.com',
        phone: '+57 310 123 4567',
        documentType: 'Cédula de ciudadanía',
        documentNumber: '123456789',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        id: 2,
        name: 'María González',
        type: 'adult',
        isPrimary: false,
        email: 'maria.gonzalez@email.com',
        documentType: 'Cédula de ciudadanía',
        documentNumber: '987654321',
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        id: 3,
        name: 'Carlos Pérez',
        type: 'child',
        age: 8,
        isPrimary: false,
        documentType: 'Tarjeta de identidad',
        documentNumber: 'TI987654321',
        image: 'https://randomuser.me/api/portraits/lego/5.jpg'
      }
    ];
  }

  // Mostrar formulario para nuevo acompañante
  showAddCompanionForm(): void {
    this.showForm = true;
    this.newCompanion = {};
    this.companionType = null;
  }

  // Cancelar la adición de nuevo acompañante
  cancelAddCompanion(): void {
    this.showForm = false;
    this.newCompanion = {};
    this.companionType = null;
  }

  // Seleccionar tipo de acompañante
  selectCompanionType(type: 'adult' | 'child'): void {
    this.companionType = type;
    this.newCompanion.type = type;
    
    if (type === 'child') {
      this.newCompanion.age = '';
    } else {
      delete this.newCompanion.age;
    }
  }

  // Guardar nuevo acompañante
  saveCompanion(): void {
    if (!this.validateCompanion()) {
      return;
    }

    const newId = Math.max(...this.companions.map(c => c.id)) + 1;
    const companionToAdd = {
      id: newId,
      ...this.newCompanion,
      isPrimary: false
    };

    this.companions.push(companionToAdd);
    this.cancelAddCompanion();
  }

  // Validar datos del acompañante
  validateCompanion(): boolean {
    if (!this.companionType) {
      alert('Por favor selecciona el tipo de acompañante');
      return false;
    }

    if (!this.newCompanion.name) {
      alert('Por favor ingresa el nombre completo');
      return false;
    }

    if (this.companionType === 'child' && !this.newCompanion.age) {
      alert('Por favor ingresa la edad del niño');
      return false;
    }

    if (!this.newCompanion.documentType || !this.newCompanion.documentNumber) {
      alert('Por favor completa los datos del documento');
      return false;
    }

    return true;
  }

  // Eliminar acompañante
  removeCompanion(id: number): void {
    if (confirm('¿Estás seguro de eliminar este acompañante?')) {
      this.companions = this.companions.filter(c => c.id !== id);
    }
  }

  // Obtener estadísticas de acompañantes
  get companionStats(): any {
    const adults = this.companions.filter(c => c.type === 'adult').length;
    const children = this.companions.filter(c => c.type === 'child').length;
    
    return {
      total: this.companions.length,
      adults: adults,
      children: children
    };
  }

  // Obtener acompañantes filtrados (excluyendo al principal)
  get filteredCompanions(): any[] {
    return this.companions.filter(c => !c.isPrimary);
  }

  // Obtener el acompañante principal
  get primaryCompanion(): any {
    return this.companions.find(c => c.isPrimary);
  }
}
