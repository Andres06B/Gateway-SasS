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

  getRoomsWithImages(): Observable<rooms[]>{
    return this.http.get<rooms[]>(this.apiURL + '/all/images')
  }

  getRoomById(id: number): Observable<rooms>{
    return this.http.get<rooms>(this.apiURL + '/' + id);
  }

  getRoomByName(name: string): Observable<rooms>{
    return this.http.get<rooms>(this.apiURL + '/name/' + name);
  }

  getRoomByAdmin(adminId: number): Observable<rooms[]>{
    return this.http.get<rooms[]>(this.apiURL + '/rooms-by-admin/' + adminId);
  }

  getRoomByStatus(status: string): Observable<rooms[]>{
    return this.http.get<rooms[]>(this.apiURL + '/status/' + status);
  }

  createRoom(data: FormData): Observable<rooms>{
    return this.http.post<rooms>(this.apiURL + '/create', data);
  }

  updateRoom(id: number, data: FormData): Observable<rooms>{
    return this.http.patch<rooms>(this.apiURL + '/' + id, data);
  }

  
}