import { Component } from '@angular/core';
import { clients } from '../interfaces/clients.interface';
import { ClientsService } from '../../../../../service/clients.service';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  Clients: clients[] = [];
  currentPage: number = 1;
  pageSize: number = 30;
  public Math = Math;

  constructor(
    private clientServices: ClientsService
  ){}

  ngOnInit(){
    this.findAll();
  }

  findAll() {
    this.clientServices.getClients().subscribe(
      (data) => {
        this.Clients = data;
        console.log(this.Clients)
      },
      (error) => {
        console.log('Error al obtener los clientes', error);
      }
    );
  }

  

  get pagedClients(): clients[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.Clients.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.Clients.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
