import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { HotelsService } from '../../service/hotels.service';

@Component({
  selector: 'app-pasarela',
  standalone: false,
  templateUrl: './pasarela.component.html',
  styleUrl: './pasarela.component.css',
})
export class PasarelaComponent {
  
  paso = 1;
  planSeleccionado = '';
  pagoExitoso = false;
  procesando = false;

  constructor(
    private user: UsersService,
    private hotel: HotelsService
  ){}

  createUser() {
    this.user.createUser(this.datosPropietario).subscribe({
      next: (user) => {
        console.log(user);
        this.avanzarPaso();
      },
    })
  }

  // Tipos de documento disponibles (según la entidad User)
  tiposDocumento = ['CC', 'TI', 'TE', 'PP', 'PPT', 'NIT'];

  // Datos del usuario/propietario (actualizados según entidad User)
  datosPropietario = {
    name: '',
    last_name: '', // Nuevo campo según entidad
    email: '',
    password: '', // Nuevo campo según entidad
    type_document: 'CC' as 'CC' | 'TI' | 'TE' | 'PP' | 'PPT' | 'NIT', // Actualizado según entidad
    number_document: '', // Cambiado de 'cedula' para coincidir con entidad
    phone: '',
    country: '', // Nuevo campo según entidad
    city: '', // Nuevo campo según entidad
    rol: 'admin' as 'admin' | 'user' // Valor por defecto según entidad
  };

  // Datos del hotel (mantenidos)
  datosHotel = {
    nombre: '',
    pais: 'CO', // Valor por defecto para Colombia
    ciudad: '',
    direccion: '',
    habitaciones: '1-10'
  };

  // Datos de pago (actualizados)
  datosPago = {
    cardholder_name: '',       // Nombre del titular
    card_number: '',           // Número de tarjeta
    expiration_date: '',       // Fecha vencimiento (MM/YY)
    cvv: '',                   // Código de seguridad
    phone: '',                 // Teléfono de contacto
    amount: 0,                 // Monto total
    email: '',                 // Email del comprador
    type_document: 'CC',       // Tipo documento
    number_document: '',       // Número documento
    has_premium_service: false, // Nuevo según entidad
    has_vip_service: false      // Nuevo según entidad
  };
confirmPassword: any;

  // Precios de los planes (actualizados)
  get precioPlan() {
    switch(this.planSeleccionado) {
      case 'basico': return 49;
      case 'premium': return 199;
      case 'vip': return 399;
      default: return 0;
    }
  }

  // Métodos existentes (actualizados)
  avanzarPaso() {
    // Actualizar datos relacionados antes de avanzar
    if (this.paso === 1) {
      // Preparar datos para el pago
      this.datosPago.email = this.datosPropietario.email;
      this.datosPago.number_document = this.datosPropietario.number_document;
      this.datosPago.phone = this.datosPropietario.phone;
      this.datosPago.type_document = this.datosPropietario.type_document;
    }
    
    if (this.paso === 2) {
      this.datosPago.amount = this.precioPlan;
    }
    
    this.paso++;
  }

  retrocederPaso() {
    this.paso--;
  }

  seleccionarPlan(plan: string) {
    this.planSeleccionado = plan;
    this.avanzarPaso();
  }

  // Método procesarPago actualizado
  procesarPago() {
    // Validar campos antes de procesar
    if (!this.validarDatosPago()) {
      console.error('Validación fallida');
      return;
    }

    this.procesando = true;
    
    // Simular procesamiento de pago
    setTimeout(() => {
      this.pagoExitoso = true;
      this.procesando = false;
      this.avanzarPaso();
    }, 2000);
  }

  // Método de validación actualizado
  private validarDatosPago(): boolean {
    // Validar campos requeridos
    const camposRequeridos = [
      this.datosPago.cardholder_name,
      this.datosPago.card_number,
      this.datosPago.expiration_date,
      this.datosPago.cvv,
      this.datosPago.phone,
      this.datosPago.amount > 0,
      this.datosPropietario.name,
      this.datosPropietario.last_name,
      this.datosPropietario.email,
      this.datosPropietario.number_document,
      this.datosPropietario.phone
    ];

    if (camposRequeridos.some(campo => !campo)) {
      console.error('Faltan campos requeridos');
      return false;
    }

    // Validar formato de tarjeta (13-16 dígitos)
    if (!/^[0-9]{13,16}$/.test(this.datosPago.card_number)) {
      console.error('Número de tarjeta inválido');
      return false;
    }

    // Validar formato de fecha (MM/YY)
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(this.datosPago.expiration_date)) {
      console.error('Fecha de vencimiento inválida');
      return false;
    }

    // Validar CVV (3-4 dígitos)
    if (!/^[0-9]{3,4}$/.test(this.datosPago.cvv)) {
      console.error('CVV inválido');
      return false;
    }

    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.datosPropietario.email)) {
      console.error('Email inválido');
      return false;
    }

    return true;
  }

  // Método para obtener todos los datos del usuario
  getDatosUsuario() {
    return {
      ...this.datosPropietario,
      // Añadir campos adicionales según la entidad User
      rol: 'user', // O 'admin' si es necesario
      payments: [], // Inicializar array de pagos
      admin_hotel: [] // Inicializar array de admin_hotels
    };
  }

  // Método para obtener todos los datos del pago
  getDatosPago() {
    return {
      ...this.datosPago,
      user: this.getDatosUsuario(), // Relación con el usuario
      hotel: {
        ...this.datosHotel
      }
    };
  }
}