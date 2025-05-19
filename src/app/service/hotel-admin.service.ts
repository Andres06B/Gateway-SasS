import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { admin_hotels } from '../interface/admin-hotels.interface';

@Injectable({
  providedIn: 'root'
})


export class HotelAdminService {
  
  private baseUrl: string = 'http://localhost:3000/admin-hotels';

  

  constructor(
    private http: HttpClient,
  ) { }


  findHotelByAdmin(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}/hotel`);

  }

  
  createAdmin(data: admin_hotels): Observable<admin_hotels>{
    return this.http.post<admin_hotels>(`${this.baseUrl}/create`,data)
  }


}
