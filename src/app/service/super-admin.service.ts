import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  apiUrl = 'https://quantumsaas-production.up.railway.app/super-admin';

  constructor(
    private http: HttpClient,
  ) { }

  findAllsuperAdminById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
