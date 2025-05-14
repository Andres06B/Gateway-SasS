import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage = 1
  @Input() totalPages = 1
  @Input() pageSize = 10
  @Input() totalItems = 0
  @Output() pageChange = new EventEmitter<number>()

  pages: number[] = []
  public Math = Math

  // Número de páginas a mostrar antes y después de la página actual
  private pagesVisible = 2

  ngOnChanges(changes: SimpleChanges): void {
    this.generatePageNumbers()
  }

  generatePageNumbers(): void {
    this.pages = []

    if (this.totalPages <= 5) {
      // Si hay 5 o menos páginas, mostrar todas
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i)
      }
    } else {
      // Siempre mostrar la primera página
      this.pages.push(1)

      // Calcular el rango de páginas alrededor de la página actual
      const startPage = Math.max(2, this.currentPage - this.pagesVisible)
      const endPage = Math.min(this.totalPages - 1, this.currentPage + this.pagesVisible)

      // Agregar elipsis después de la primera página si es necesario
      if (startPage > 2) {
        this.pages.push(-1) // -1 representa elipsis
      }

      // Agregar páginas del rango calculado
      for (let i = startPage; i <= endPage; i++) {
        this.pages.push(i)
      }

      // Agregar elipsis antes de la última página si es necesario
      if (endPage < this.totalPages - 1) {
        this.pages.push(-2) // -2 representa elipsis (diferente valor para identificación)
      }

      // Siempre mostrar la última página
      this.pages.push(this.totalPages)
    }
  }

  changePage(page: number): void {
    if (page !== this.currentPage && page > 0 && page <= this.totalPages) {
      this.pageChange.emit(page)
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1)
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1)
    }
  }

  // Navegar a la primera página
  firstPage(): void {
    if (this.currentPage !== 1) {
      this.pageChange.emit(1)
    }
  }

  // Navegar a la última página
  lastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.pageChange.emit(this.totalPages)
    }
  }
}
