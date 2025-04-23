import { Component } from '@angular/core';
import { ReservationPredictionDTO } from '../../../../../interfaces_weka/wekaResponseDTO';
import { WekaService } from '../../../../../service/weka.service';
@Component({
  selector: 'app-predicciones',
  standalone: false,
  templateUrl: './predicciones.component.html',
  styleUrl: './predicciones.component.css'
})
export class PrediccionesComponent {

  mostrarFormulario = false;

  // Inicializa formData basado en la interfaz ReservationPredictionDTO
  formData: ReservationPredictionDTO = {
    client_age: 30,
    past_cancellations: 0,
    client_cancellation_rate: 0.0,
    client_avg_stay_length: 3,
    hotel_type: 'hotel',
    hotel_country_region: 'Colombia',
    hotel_cancellation_rate: 0.1,
    room_price: 100,
    room_capacity: 2,
    price_ratio_to_avg: 1.0,
    stay_duration: 3,
    booking_lead_time_category: 'advanced',
    checkin_day_of_week: 1,
    is_weekend_checkin: 0,
    is_high_season: 1,
    concurrent_confirmed_reservations: 0,
    concurrent_confirmation_rate: 0.0,
    payment_status_category: 'no_payment',
    payment_method: 'credit_card'
  };

  prediccion: string | null = null;
  probabilidades: { [key: string]: number } | null = null;

  constructor(private prediccionesService: WekaService) {}

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Datos enviados:', this.formData);

    this.prediccionesService.predict(this.formData).subscribe({
      next: (response: { prediction: string | null; probabilities: { [key: string]: number; } | null; }) => {
        this.prediccion = response.prediction;
        this.probabilidades = response.probabilities;
        console.log('Respuesta del servicio:', response);
      },
      error: (error: any) => {
        console.error('Error al obtener la predicción:', error);
      }
    });
  }
}
