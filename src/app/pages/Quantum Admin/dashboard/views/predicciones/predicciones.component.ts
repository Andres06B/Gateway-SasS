import { Component, Renderer2 } from '@angular/core';
import { WekaService } from '../../../../../service/weka.service';
import { ClientsService } from '../../../../../service/clients.service';
import { reservations } from '../interfaces/reservations.interface';
@Component({
  selector: 'app-predicciones',
  standalone: false,
  templateUrl: './predicciones.component.html',
  styleUrl: './predicciones.component.css'
})
export class PrediccionesComponent {
  ListaPredicciones: any[] = [];
  detallesReservas: reservations[] = [];
  modalState: 'open' | 'closing' | 'closed' = 'closed';
  currentClientId: number | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private prediccionesService: WekaService,
    private clientService: ClientsService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.prediccionesService.getPredictions(3).subscribe({
      next: (predictions) => {
        console.log(predictions);
        this.ListaPredicciones = predictions;
        console.log(this.ListaPredicciones);
      },
      error: err => {
        console.error('Error al obtener las predicciones:', err);
      }
    });
  }

  openModal(clientId: number) {
    this.currentClientId = clientId;
    this.modalState = 'open';
    this.loading = true;
    this.error = null;
    this.detallesReservas = [];
    
    this.renderer.addClass(document.body, 'overflow-hidden');
    
    this.findDetails(clientId);
  }

  closeModal() {
    this.modalState = 'closing';
    setTimeout(() => {
      this.modalState = 'closed';
      this.currentClientId = null;
      this.detallesReservas = [];
      
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }, 300);
  }

  findDetails(id: number) {
    this.loading = true;
    this.clientService.findReservations(id).subscribe({
      next: (reserva) => {
        this.detallesReservas = reserva;
        this.loading = false;
        console.log(this.detallesReservas);
      },
      error: err => {
        this.loading = false;
        this.error = 'Error al obtener los detalles de la reserva. Intente nuevamente.';
        console.error('Error al obtener los detalles de la reserva:', err);
      }
    });
  }

  formatDate(date: Date): string {
    if (!date) return 'N/A';
    
    // Convertir string a objeto Date si es necesario
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return dateObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'canceled':
        return 'Cancelada';
      case 'refunded':
        return 'Reembolsada';
      default:
        return status;
    }
  }




  
}
