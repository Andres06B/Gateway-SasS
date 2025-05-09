import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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



}
