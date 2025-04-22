import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clients } from '../pages/Quantum Admin/dashboard/views/interfaces/clients.interface';

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
}
