import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clients } from '../pages/Quantum Admin/dashboard/views/interfaces/clients.interface';
import { Clients } from '../interface/clients.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiURL = 'http://localhost:3000/clients';

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<clients[]> {
    return this.http.get<clients[]>(this.apiURL + '/all');
  }

  findOne(id: number): Observable<clients> {
    return this.http.get<clients>(`${this.apiURL}/${id}`);
  }

  findClients(id: number): Observable<clients[]> {
    return this.http.get<clients[]>(`${this.apiURL}/by-admin/${id}`);
  }

  findOneByName(name: string): Observable<clients> {
    return this.http.get<clients>(`${this.apiURL}/by-name/${name}`);
  }

  findOneByEmail(email: string): Observable<clients> {
    return this.http.get<clients>(`${this.apiURL}/by-email/${email}`);
  }
  
  createClient(data: Clients): Observable<Clients> {
    return this.http.post<Clients>(`${this.apiURL}/create`, data);
  }

  updateClient(id: number, data: Partial<clients>): Observable<clients> {
    return this.http.patch<clients>(`${this.apiURL}/${id}`, data);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  findReservations(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/${id}/reservations`);
  }
}
