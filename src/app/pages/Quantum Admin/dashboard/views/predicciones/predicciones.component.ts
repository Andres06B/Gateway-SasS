import { Component, Renderer2 } from "@angular/core"
import { WekaService } from "../../../../../service/weka.service"
import { ReservationsService } from "../../../../../service/reservations.service"

@Component({
  selector: "app-predicciones",
  standalone: false,
  templateUrl: "./predicciones.component.html",
  styleUrl: "./predicciones.component.css",
})
export class PrediccionesComponent {
  ListaPredicciones: any[] = [];
  originalPredictions: any[] = []; // Para guardar el orden original
  isSorted: boolean = false; // Bandera para alternar el orden
  selectedBooking: any = null
  modalState: "open" | "closing" | "closed" = "closed"
  currentClientId: number | null = null
  loading = false
  error: string | null = null
  hotelId: number = Number(localStorage.getItem("hotel"))
  currentBookingId: number | null = null

  months = [
    { name: "Enero", value: 1 },
    { name: "Febrero", value: 2 },
    { name: "Marzo", value: 3 },
    { name: "Abril", value: 4 },
    { name: "Mayo", value: 5 },
    { name: "Junio", value: 6 },
    { name: "Julio", value: 7 },
    { name: "Agosto", value: 8 },
    { name: "Septiembre", value: 9 },
    { name: "Octubre", value: 10 },
    { name: "Noviembre", value: 11 },
    { name: "Diciembre", value: 12 },
  ];

  selectedMonth: number = new Date().getMonth() + 1;




  constructor(
    private bookingService: ReservationsService,
    private renderer: Renderer2,
    private prediccionesService: WekaService
  ) {}

  ngOnInit() {
    this.FindPredict(this.selectedMonth)
  }

  onMonthChange(event: Event) {
    const select = (event.target as HTMLSelectElement).value
    this.selectedMonth = Number(select)
    console.log(this.selectedMonth)
    this.FindPredict(this.selectedMonth)

  }

  FindPredict(month: number) {
    this.prediccionesService.getPredictions(this.hotelId, month).subscribe({
      next: (predictions) => {
        console.log(predictions);
        this.ListaPredicciones = predictions;
        this.originalPredictions = [...predictions]; // Guarda el orden original
        console.log(this.ListaPredicciones);
      },
      error: (err) => {
        console.error("Error al obtener las predicciones:", err);
      },
    });
  }

  sortPredictions(): void {
    if (this.isSorted) {
      // Si ya está ordenado, vuelve al orden original
      this.ListaPredicciones = [...this.originalPredictions];
    } else {
      // Ordena por canceladas primero
      this.ListaPredicciones.sort((a, b) => {
        if (a.prediction === 'cancelada' && b.prediction !== 'cancelada') {
          return -1; // Las canceladas van primero
        }
        if (a.prediction !== 'cancelada' && b.prediction === 'cancelada') {
          return 1; // Las no canceladas van después
        }
        return 0; // Mantén el orden si son iguales
      });
    }
    this.isSorted = !this.isSorted; // Alterna el estado
  }

  openModal(clientId: number, id: number) {
    this.currentClientId = clientId
    this.currentBookingId = id
    this.modalState = "open"
    this.loading = true
    this.error = null

    this.renderer.addClass(document.body, "overflow-hidden")

    this.findDetails(id, clientId)
  }

  closeModal() {
    this.modalState = "closing"
    setTimeout(() => {
      this.modalState = "closed"
      this.currentClientId = null
      this.selectedBooking = null

      this.renderer.removeClass(document.body, "overflow-hidden")
    }, 300)
  }

  findDetails(id: number, client: number) {
    this.loading = true
    this.bookingService.findByClient(id, client).subscribe({
      next: (reserva) => {
        this.selectedBooking = reserva
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.error = "Error al obtener los detalles de la reserva. Intente nuevamente."
        console.error("Error al obtener los detalles de la reserva:", err)
      },
    })
  }

  formatDate(date: Date): string {
    if (!date) return "N/A"

    // Convertir string a objeto Date si es necesario
    const dateObj = typeof date === "string" ? new Date(date) : date

    return dateObj.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  getStatusText(status: string): string {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "canceled":
        return "Cancelada"
      case "refunded":
        return "Reembolsada"
      default:
        return status
    }
  }

  traducirEstado(status: string): string {
    return this.getStatusText(status)
  }
}
