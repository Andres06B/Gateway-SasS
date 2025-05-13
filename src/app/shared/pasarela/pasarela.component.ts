import { Component } from '@angular/core';

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

  // Datos del propietario (mantenidos)
  datosPropietario = {
    nombre: '',
    cedula: '',
    email: '',
    telefono: ''
  };

  // Datos del hotel (mantenidos)
  datosHotel = {
    nombre: '',
    pais: 'CO', // Valor por defecto para Colombia
    ciudad: '',
    direccion: '',
    habitaciones: '1-10'
  };

  // Datos de pago (actualizados con las nuevas propiedades + las originales)
  datosPago = {
    // Originales
    nombreTarjeta: '',         // Mantenido por compatibilidad
    numeroTarjeta: '',         // Mantenido por compatibilidad
    vencimiento: '',           // Mantenido por compatibilidad
    cvv: '',                   // Mantenido por compatibilidad
    
    // Nuevos campos
    cardholder_name: '',       // Nombre del titular (nuevo)
    card_number: '',           // Número de tarjeta (nuevo)
    expiration_date: '',       // Fecha vencimiento (nuevo formato MM/YY)
    phone: '',                 // Teléfono de contacto (nuevo)
    amount: 0,                 // Monto total (nuevo)
    email: '',                 // Email del comprador (se tomará de datosPropietario)
    type_document: 'CC',       // Tipo documento (por defecto cédula)
    number_document: ''        // Número documento (se tomará de datosPropietario.cedula)
  };

  // Precios de los planes (mantenido)
  get precioPlan() {
    switch(this.planSeleccionado) {
      case 'basico': return 49;
      case 'estandar': return 99;
      case 'premium': return 199;
      default: return 0;
    }
  }

  // Métodos existentes (mantenidos)
  avanzarPaso() {
    // Actualizar datos relacionados antes de avanzar
    if (this.paso === 1) {
      // Preparar datos para el pago
      this.datosPago.email = this.datosPropietario.email;
      this.datosPago.number_document = this.datosPropietario.cedula;
      this.datosPago.phone = this.datosPropietario.telefono;
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
    // Sincronizar datos antiguos con nuevos (para compatibilidad)
    this.datosPago.nombreTarjeta = this.datosPago.cardholder_name;
    this.datosPago.numeroTarjeta = this.datosPago.card_number;
    this.datosPago.vencimiento = this.datosPago.expiration_date;
    
    // Validar campos antes de procesar
    if (!this.validarDatosPago()) {
      console.error('Validación fallida');
      return;
    }

    this.procesando = true;
    
    // Simular procesamiento de pago (mantenido)
    setTimeout(() => {
      this.pagoExitoso = true;
      this.procesando = false;
      this.avanzarPaso();
    }, 2000);
  }

  // Nuevo método de validación
  private validarDatosPago(): boolean {
    // Validar campos requeridos
    const camposRequeridos = [
      this.datosPago.cardholder_name,
      this.datosPago.card_number,
      this.datosPago.expiration_date,
      this.datosPago.cvv,
      this.datosPago.phone,
      this.datosPago.amount > 0
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

    return true;
  }

  // Método adicional para compatibilidad
  getDatosCompletosPago() {
    return {
      ...this.datosPago,
      // Mantener compatibilidad con nombres antiguos
      nombreTarjeta: this.datosPago.cardholder_name,
      numeroTarjeta: this.datosPago.card_number,
      vencimiento: this.datosPago.expiration_date,
      // Datos del usuario
      usuario: {
        nombre: this.datosPropietario.nombre,
        email: this.datosPropietario.email,
        telefono: this.datosPropietario.telefono
      },
      // Datos del hotel
      hotel: {
        ...this.datosHotel
      }
    };
  }
}