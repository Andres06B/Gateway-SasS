import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WekaResponseDTO } from '../interfaces_weka/wekaResponseDTO';
import { Observable } from 'rxjs';
import { WeekDay } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WekaService {
  private apiUrl = 'http://localhost:3000/booking'; 

  constructor(private http: HttpClient) {}

  getPredictions(hotelId: number, month: number): Observable<WekaResponseDTO[]>{
    const url = `${this.apiUrl}/insights/${hotelId}?Mes=${month}`; 
    return this.http.get<WekaResponseDTO[]>(url);
  }
}
