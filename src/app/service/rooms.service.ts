import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rooms } from '../pages/Quantum Admin/dashboard/views/interfaces/rooms.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiURL = 'http://localhost:3000/rooms';
  
  constructor(
    private http: HttpClient
  ) { }
  
  getRooms(): Observable<rooms[]>{
    return this.http.get<rooms[]>(this.apiURL + '/all');
  }
}