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
  ListaPredicciones: any[] = []
  selectedBooking: any = null
  modalState: "open" | "closing" | "closed" = "closed"
  currentClientId: number | null = null
  loading = false
  error: string | null = null
  hotelId: number = Number(localStorage.getItem("hotel"))
  currentBookingId: number | null = null

  constructor(
    private bookingService: ReservationsService,
    private renderer: Renderer2,
    private prediccionesService: WekaService
  ) {}

  ngOnInit() {
    this.prediccionesService.getPredictions(this.hotelId).subscribe({
      next: (predictions) => {
        console.log(predictions)
        this.ListaPredicciones = predictions
        console.log(this.ListaPredicciones)
      },
      error: (err) => {
        console.error("Error al obtener las predicciones:", err)
      },
    })
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
