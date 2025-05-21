import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pago_reserva } from '../interface/pago_reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class PagoReservaService {

  private apiUrl = 'https://quantumsaas-production.up.railway.app/payment-booking'

  constructor(
    private http: HttpClient
  ) { }

  findAllByHotel(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/hotel/' + id);
  }

  findByIdClient(id: number): Observable<pago_reserva[]>{
    return this.http.get<pago_reserva[]>(this.apiUrl + '/client/'+ id)
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

  create(data: pago_reserva ): Observable<pago_reserva>{
    return this.http.post<pago_reserva>(this.apiUrl + '/',data)
  }



}
