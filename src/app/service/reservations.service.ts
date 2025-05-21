import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reservations } from '../pages/Quantum Admin/dashboard/views/interfaces/reservations.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private baseUrl: string = 'https://quantumsaas-production.up.railway.app/booking'

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<reservations[]> {
    return this.http.get<reservations[]>(this.baseUrl);
  }

  findById(id: number): Observable<reservations> {
    return this.http.get<reservations>(`${this.baseUrl}/${id}`);
  }

  findByBookingsByClient(id: number): Observable<reservations[]> {
    return this.http.get<reservations[]>(`${this.baseUrl}/client/${id}`)
  }

  findByHotel(id: number): Observable<reservations[]> {
    return this.http.get<reservations[]>(`${this.baseUrl}/hotel/reservation/${id}`);
  }

  findByStatus(status: string): Observable<reservations[]> {
    return this.http.get<reservations[]>(`${this.baseUrl}/status/${status}`);
  }

  findByStatusByHotel(status: string, hotelId: number): Observable<reservations[]> {
    return this.http.get<reservations[]>(`${this.baseUrl}/status/${status}/hotel/${hotelId}`);
  }

  findByClient(id: number, client: number): Observable<reservations> {
    return this.http.get<reservations>(`${this.baseUrl}/reservation/${id}/client/${client}`);
  }

  createReservation(data: reservations): Observable<reservations> {
    return this.http.post<reservations>(`${this.baseUrl}/`, data);
  }

}
