import { Component, Renderer2, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as XLSX from 'xlsx';
import { WekaService } from '../../../../../service/weka.service';
import { ClientsService } from '../../../../../service/clients.service';
import { reservations } from '../interfaces/reservations.interface';
import { WekaResponseDTO } from '../../../../../interfaces_weka/wekaResponseDTO';

@Component({
  selector: 'app-predicciones',
  standalone: false,
  templateUrl: './predicciones.component.html',
  styleUrls: ['./predicciones.component.css']
})
export class PrediccionesComponent implements OnInit {
  ListaPredicciones: WekaResponseDTO[] = [];
  detallesReservas: reservations[] = [];
  modalState: 'open' | 'closing' | 'closed' = 'closed';
  currentClientId: number | null = null;
  loading: boolean = false;
  error: string | null = null;
  hotelId: number = 0;
  fileName = 'Predicciones.xlsx';

  constructor(
    private prediccionesService: WekaService,
    private clientService: ClientsService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.hotelId = Number(localStorage.getItem('hotel'));
    }
    this.prediccionesService.getPredictions(this.hotelId).subscribe({
      next: (predictions: WekaResponseDTO[]) => {
        console.log(predictions);
        this.ListaPredicciones = predictions;
        console.log(this.ListaPredicciones);
      },
      error: (err: any) => {
        console.error('Error al obtener las predicciones:', err);
      }
    });
  }

  openModal(clientId: number): void {
    this.currentClientId = clientId;
    this.modalState = 'open';
    this.loading = true;
    this.error = null;
    this.detallesReservas = [];
    
    this.renderer.addClass(document.body, 'overflow-hidden');
    this.findDetails(clientId);
  }

  exportToExcel(): void {
    // Preparar los datos para Excel
    const data = this.ListaPredicciones.map(prediccion => {
      return {
        'ID Cliente': prediccion.client_id,
        'Predicción': prediccion.prediction,
        'Probabilidad (Cancelada)': prediccion.probabilities['cancelada'],
        'Probabilidad (No Cancelada)': prediccion.probabilities['no cancelada'],
        'Fecha de Predicción': new Date().toLocaleDateString(),
        'Hotel ID': this.hotelId
      };
    });

    // Crear el libro de trabajo y la hoja
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Predicciones');

    // Guardar el archivo
    XLSX.writeFile(wb, this.fileName);
  }

  closeModal(): void {
    this.modalState = 'closing';
    setTimeout(() => {
      this.modalState = 'closed';
      this.currentClientId = null;
      this.detallesReservas = [];
      
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }, 300);
  }

  findDetails(id: number): void {
    this.loading = true;
    this.clientService.findReservations(id).subscribe({
      next: (reserva: reservations[]) => {
        this.detallesReservas = reserva;
        this.loading = false;
        console.log(this.detallesReservas);
      },
      error: (err: any) => {
        this.loading = false;
        this.error = 'Error al obtener los detalles de la reserva. Intente nuevamente.';
        console.error('Error al obtener los detalles de la reserva:', err);
      }
    });
  }

  formatDate(date: Date | string): string {
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
