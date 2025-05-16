import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { hotels } from '../interface/hotels.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private apiUrl = 'http://localhost:3000/hotels'

  constructor(
    private http: HttpClient
  ) { }

  getHotels():Observable<hotels[]>{
    return this.http.get<hotels[]>(this.apiUrl + '/all') 
  }

  getHotelById(id: number): Observable<hotels> {
    return this.http.get<hotels>(this.apiUrl + '/' + id)
  }

  updateHotel(hotel: hotels, id: number): Observable<hotels>{
    return this.http.patch<hotels>(this.apiUrl + '/' + id, hotel)
  }

  createHotel(hotel: hotels): Observable<hotels>{
    return this.http.post<hotels>(this.apiUrl + '/create', hotel);
  }

}
