import { Component } from '@angular/core';

@Component({
  selector: 'app-predicciones',
  standalone: false,
  templateUrl: './predicciones.component.html',
  styleUrl: './predicciones.component.css'
})
export class PrediccionesComponent {
  mostrarFormulario = false;
  formData = {
    edad_cliente: 28,
    pais_cliente: 'Mexico',
    dias_anticipacion: 0,
    duracion_estadia: 1,
    habitacion_tipo: 'Single',
    habitacion_capacidad: 1,
    precio_total_estadia: 950.0,
    metodo_pago: 'Transferencia',
    estado_pago: 'Pendiente',
    hotel_tiene_landing_page: false,
    hotel_tiene_bot_whatsapp: false,
    cantidad_servicios_ofrecidos: 1
  };

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Datos enviados:', this.formData);
    // Aquí puedes enviar los datos a tu API o servicio
  }

}
