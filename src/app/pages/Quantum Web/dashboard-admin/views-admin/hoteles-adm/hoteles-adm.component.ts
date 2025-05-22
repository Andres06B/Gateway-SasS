import { Component } from '@angular/core';
import { hotels } from '../../../../../interface/hotels.interface';
import { HotelsService } from '../../../../../service/hotels.service';

@Component({
  selector: 'app-hoteles-adm',
  standalone: false,
  templateUrl: './hoteles-adm.component.html',
  styleUrl: './hoteles-adm.component.css'
})
export class HotelesAdmComponent {
  Hotels: hotels[] = []
  searchTerm: string = ''
  itemsPerPage: number = 10
  currentPage: number = 1

  constructor(
    private hotelService: HotelsService
  ) {}

  ngOnInit(){
    this.findAll()
  }

  findAll(){
    this.hotelService.getHotels().subscribe({
      next: (response) => {
        this.Hotels = response
        console.log(this.Hotels)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  get filteredHotels(): hotels[] {
    if (!this.searchTerm) {
      return this.Hotels;
    }
    
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.Hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(searchTermLower) ||
      hotel.description?.toLowerCase().includes(searchTermLower) ||
      hotel.city?.toLowerCase().includes(searchTermLower) ||
      hotel.country?.toLowerCase().includes(searchTermLower) ||
      hotel.address?.toLowerCase().includes(searchTermLower) ||
      hotel.email?.toLowerCase().includes(searchTermLower) ||
      hotel.phone?.toLowerCase().includes(searchTermLower)
    );
  }

  get paginatedHotels(): hotels[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredHotels.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredHotels.length / this.itemsPerPage);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredHotels.length);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  changeItemsPerPage(items: number): void {
    this.itemsPerPage = items;
    this.currentPage = 1;
  }
}
