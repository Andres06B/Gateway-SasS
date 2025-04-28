import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoReservaService {

  private apiUrl = 'http://localhost:3000/payment-booking'

  constructor(
    private http: HttpClient
  ) { }

  findAllByHotel(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/hotel/' + id);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + '/' + id)
  }

  findByStatus(status: string, id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/status/' + status + '/hotel/' + id);
  }

  findByMethod(method: string, id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/method/' + method + '/hotel/' + id);
  }

  findByNameClient(name: string, id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/name/' + name + '/hotel/' + id)
  }




}
