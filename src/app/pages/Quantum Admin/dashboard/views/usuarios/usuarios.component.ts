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
  tokenId = Number(localStorage.getItem('token'));
  Clients: clients[] = [];
  FilteredClient: clients[] = [];
  currentPage: number = 1;
  pageSize: number = 30;
  public Math = Math;

  selectedUser: clients | null = null;

  // Estados separados para los modales
  editModalState: 'closed' | 'opening' | 'open' | 'closing' = 'closed';
  detailsModalState: 'closed' | 'opening' | 'open' | 'closing' = 'closed';

  constructor(private clientServices: ClientsService) {}

  ngOnInit() {
    this.findAll();
  }

  findAll(): void {
    this.clientServices.findClients(this.tokenId).subscribe({
      next: (res) => {
        this.Clients = res;
        this.FilteredClient = [...this.Clients];
      },
      error: (err) => {
        console.error('Error al obtener los clientes:', err);
        this.Clients = [];
        this.FilteredClient = [];
        alert('Ocurrió un error al cargar los clientes. Por favor, inténtalo de nuevo más tarde.');
      },
    });
  }

  findByName(name: string){
    this.clientServices.findOneByName(name).subscribe({
      next: Client => {
        this.FilteredClient = [Client];
        console.log(this.FilteredClient)
      }, 
      error: err => {
        console.error('Error al obtener el cliente', err)
        this.FilteredClient = []
      }
    })
  }

  findByEmail(email:string){
    this.clientServices.findOneByEmail(email).subscribe({
      next: Client => {
        this.FilteredClient = [Client]
      }, 
      error: err => {
        console.error('Error al obtener el cliente', err)
        this.FilteredClient = []
      }
    })
  }

  // Abrir modal de edición
  openEditModal(user: clients): void {
    this.selectedUser = user;
    this.editModalState = 'opening';

    setTimeout(() => {
      this.editModalState = 'open';
    }, 50);
  }

  // Cerrar modal de edición
  startCloseEditModal(): void {
    this.editModalState = 'closing';

    setTimeout(() => {
      this.editModalState = 'closed';
      this.selectedUser = null;
    }, 300);
  }

  // Abrir modal de detalles
  openDetailsModal(user: clients): void {
    this.selectedUser = user;
    this.detailsModalState = 'opening';

    setTimeout(() => {
      this.detailsModalState = 'open';
    }, 50);
  }

  // Cerrar modal de detalles
  startCloseDetailsModal(): void {
    this.detailsModalState = 'closing';

    setTimeout(() => {
      this.detailsModalState = 'closed';
      this.selectedUser = null;
    }, 300);
  }

  saveChanges() {
    if (this.selectedUser) {
      this.clientServices.updateClient(this.selectedUser.id, this.selectedUser).subscribe({
        next: (updatedUser) => {
          this.Clients = this.Clients.map((client) =>
            client.id === updatedUser.id ? updatedUser : client
          );
          this.FilteredClient = this.Clients;
          console.log('Cliente actualizado:', updatedUser);
          this.startCloseEditModal(); // Cierra el modal de edición
        },
        error: (err) => {
          console.error('Error al actualizar el cliente', err);
          this.FilteredClient = this.Clients;
        },
      });
    }
  }

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value.trim();
  
    if (!input) {
      this.FilteredClient = [...this.Clients];
      return;
    }
  
    this.FilteredClient = [];
  
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  
    if (isEmail) {
      this.findByEmail(input);
    } else {
      this.findByName(input);
    }
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
