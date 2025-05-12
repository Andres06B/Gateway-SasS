import { Component } from '@angular/core';

@Component({
  selector: 'app-pasarela',
  standalone: false,
  templateUrl: './pasarela.component.html',
  styleUrl: './pasarela.component.css'
})
export class PasarelaComponent {
  
  paso = 1;
  planSeleccionado = '';
  pagoExitoso = false;
  procesando = false;

  // Datos del propietario
  datosPropietario = {
    nombre: '',
    cedula: '',
    email: '',
    telefono: ''
  };

  // Datos del hotel
  datosHotel = {
    nombre: '',
    pais: '',
    ciudad: '',
    direccion: '',
    habitaciones: '1-10'
  };

  // Datos de pago
  datosPago = {
    nombreTarjeta: '',
    numeroTarjeta: '',
    vencimiento: '',
    cvv: ''
  };

  // Precios de los planes
  get precioPlan() {
    switch(this.planSeleccionado) {
      case 'basico': return 0;
      case 'estandar': return 99;
      case 'premium': return 199;
      default: return 0;
    }
  }

  avanzarPaso() {
    this.paso++;
  }

  retrocederPaso() {
    this.paso--;
  }

  seleccionarPlan(plan: string) {
    this.planSeleccionado = plan;
    this.avanzarPaso();
  }

  procesarPago() {
    this.procesando = true;
    
    // Simular procesamiento de pago
    setTimeout(() => {
      this.pagoExitoso = true;
      this.procesando = false;
      this.avanzarPaso();
    }, 2000);
  }


}
