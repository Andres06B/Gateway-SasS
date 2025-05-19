import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { HotelsService } from '../../service/hotels.service';
import { PaymentServiceService } from '../../service/payment-service.service';
import { HotelAdminService } from '../../service/hotel-admin.service';
import { admin_hotels } from '../../interface/admin-hotels.interface';

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
  idUser: number = 0;
  idHotel: number = 0;
  admin: admin_hotels = {
    user: {
      id: 0
    },
    hotel: {
      id: 0
    }
  };
  

  constructor(
    private user: UsersService,
    private hotel: HotelsService,
    private payment: PaymentServiceService,
    private adminHotel: HotelAdminService
  ) { }


  async avanzar(){
    try{
      await this.createUser()
      await this.createHotel()
      await this.createAdmin()
      this.avanzarPaso()
    } catch (err ){
      console.error(err)
    }
  }

  createAdmin() {
    console.log('Creating admin with IDs:', { userId: this.idUser, hotelId: this.idHotel });
    if (this.idUser && this.idHotel) {
      this.admin = {
        user: {
          id: this.idUser
        },
        hotel: {
          id: this.idHotel
        }
      };
      console.log('Admin object:', this.admin);
      
      return new Promise((resolve, reject) => {
        this.adminHotel.createAdmin(this.admin).subscribe({
          next: rsp => {
            console.log('Admin created successfully:', rsp);
            resolve(rsp);
          },
          error: err => {
            console.error('Error creating admin:', err);
            reject(err);
          }
        });
      });
    } else {
      console.error('Missing IDs:', { userId: this.idUser, hotelId: this.idHotel });
      throw new Error('User ID or Hotel ID is missing');
    }
  }

  createPayment(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(!this.validarDatosPago()){
        console.error('Faltan datos de pago')
        reject('Faltan datos de pago')
        return
      }
      this.payment.createPayment(this.datosPago).subscribe({
        next: (payment) => {
          console.log(payment)
          resolve(payment)
        },
        error: (err) => {
          console.error('Error al crear el pago:', err)
          reject(err)
        }
      })
    })
  }

  createUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.validarDatosPropietario()) {
        console.error('Faltan datos del propietario');
        reject('Faltan datos del propietario');
        return;
      }
      this.user.createUser(this.datosPropietario).subscribe({
        next: (user) => {
          console.log('User created:', user);
          if (user.id) {
            this.user.getUser(user.id).subscribe({
              next: (rsp) => {
                this.idUser = rsp.id || 0;
                console.log('User ID set to:', this.idUser);
                resolve(user);
              },
              error: (err) => {
                console.error('Error getting user:', err);
                reject(err);
              }
            });
          } else {
            reject('User created but no ID returned');
          }
        },
        error: (err) => {
          console.error('Error al crear usuario:', err);
          reject(err);
        }
      });
    });
  }

  createHotel(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.validarDatosHotel()) {
        console.error('Faltan datos del hotel');
        reject('Faltan datos del hotel');
        return;
      }
      this.hotel.createHotel(this.datosHotel).subscribe({
        next: (rsp) => {
          console.log('Hotel created:', rsp);
          if (rsp.id) {
            this.hotel.getHotelById(rsp.id).subscribe({
              next: (hotel) => {
                this.idHotel = hotel.id || 0;
                console.log('Hotel ID set to:', this.idHotel);
                resolve(rsp);
              },
              error: (err) => {
                console.error('Error getting hotel:', err);
                reject(err);
              }
            });
          } else {
            reject('Hotel created but no ID returned');
          }
        },
        error: (err) => {
          console.error('Error al crear hotel:', err);
          reject(err);
        }
      });
    });
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
    name: '',
    description: '', // changed from 'descripcion'
    type_accomodation: 'hotel' as 'hotel' | 'hostel' | 'motel' | 'airbnb' | 'other',
    country: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    image: '', // added this property
  };

  // Datos de pago (actualizados según Payment entity)
  datosPago = {
    id: 0,
    name: 'BASIC' as 'PREMIUN' | 'VIP' | 'BASIC',
    description: '',
    price: 0,
    active: true,
    created_at: new Date(),
    updated_at: new Date(),
    user: {
      id: 0
    }
  };

  // Datos de tarjeta (simulación)
  datosTarjeta = {
    cardholder_name: '',
    card_number: '',
    expiration_date: '',
    cvv: '',
    phone: ''
  };

  confirmPassword: any;

  // Precios de los planes (actualizados)
  get precioPlan() {
    switch (this.planSeleccionado.toLowerCase()) {
      case 'basic': return 0.0;
      case 'premiun': return 199.990;
      default: return 0.0;
    }
  }

  // Métodos existentes (actualizados)
  avanzarPaso() {
    // Actualizar datos relacionados antes de avanzar
    if (this.paso === 1) {
      // No es necesario actualizar datosPago en este paso
      // ya que solo necesitamos los datos del propietario
    }

    if (this.paso === 2) {
      // Actualizar el precio del plan
      this.datosPago.price = this.precioPlan;
      console.log('Precio del plan:', this.precioPlan); // Para debugging
    }

    this.paso++;
  }

  retrocederPaso() {
    this.paso--;
  }

  seleccionarPlan(plan: string) {
    this.planSeleccionado = plan;
    console.log('Plan seleccionado:', plan); // Para debugging
    console.log('Precio calculado:', this.precioPlan); // Para debugging
    this.avanzarPaso();
  }

  // Método procesarPago actualizado
  procesarPago() {
    // Actualizar datos de pago con la información necesaria
    this.datosPago.name = this.planSeleccionado.toUpperCase() as 'PREMIUN' | 'VIP' | 'BASIC';
    this.datosPago.description = `Pago de suscripción ${this.planSeleccionado}`;
    this.datosPago.price = this.precioPlan;
    this.datosPago.user.id = this.idUser;
    this.datosPago.active = true;
    this.datosPago.created_at = new Date();
    this.datosPago.updated_at = new Date();

    // Validar campos antes de procesar
    if (!this.validarDatosPago()) {
      console.error('Validación fallida');
      return;
    }

    this.procesando = true;

    // Simular procesamiento de pago
    setTimeout(() => {
      this.createPayment().then(() => {
        this.pagoExitoso = true;
        this.procesando = false;
        this.createAdmin()
      }).catch(error => {
        console.error('Error al procesar el pago:', error);
        this.procesando = false;
      });
    }, 2000);
  }

  // Método de validación actualizado
  private validarDatosPago(): boolean {
    // Validar campos requeridos del pago
    if (!this.datosPago.name || !this.datosPago.price || !this.idUser) {
      console.error('Faltan datos del pago:', {
        name: this.datosPago.name,
        price: this.datosPago.price,
        userId: this.idUser
      });
      return false;
    }

    // Validar campos de la tarjeta (simulación)
    const camposTarjeta = [
      this.datosTarjeta.cardholder_name,
      this.datosTarjeta.card_number,
      this.datosTarjeta.expiration_date,
      this.datosTarjeta.cvv,
      this.datosTarjeta.phone
    ];

    if (camposTarjeta.some(campo => !campo)) {
      console.error('Faltan datos de la tarjeta:', this.datosTarjeta);
      return false;
    }

    // Validar formato de tarjeta (simulación)
    if (!/^[0-9]{13,16}$/.test(this.datosTarjeta.card_number.replace(/\s/g, ''))) {
      console.error('Número de tarjeta inválido');
      return false;
    }

    /*
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(this.datosTarjeta.expiration_date)) {
      console.error('Fecha de vencimiento inválida');
      return false;
    }
    */

    if (!/^[0-9]{3,4}$/.test(this.datosTarjeta.cvv)) {
      console.error('CVV inválido');
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
      name: this.planSeleccionado.toUpperCase() as 'PREMIUN' | 'VIP' | 'BASIC',
      description: `Pago de suscripción ${this.planSeleccionado}`,
      price: this.precioPlan,
      user: {
        id: this.idUser
      }
    };
  }

  private validarDatosPropietario(): boolean {
    const campos = [
      this.datosPropietario.name,
      this.datosPropietario.last_name,
      this.datosPropietario.email,
      this.datosPropietario.password,
      this.datosPropietario.type_document,
      this.datosPropietario.number_document,
      this.datosPropietario.phone,
      this.datosPropietario.country,
      this.datosPropietario.city,
      this.datosPropietario.rol
    ];
    return campos.every(campo => campo && campo.toString().trim() !== '');
  }

  private validarDatosHotel(): boolean {
    const campos = [
      this.datosHotel.name,
      this.datosHotel.description,
      this.datosHotel.type_accomodation,
      this.datosHotel.country,
      this.datosHotel.phone,
      this.datosHotel.email,
      this.datosHotel.city,
      this.datosHotel.address,
    ];
    return campos.every(campo => campo && campo.toString().trim() !== '');
  }
}