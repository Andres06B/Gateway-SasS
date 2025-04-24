import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrlAdmin = 'http://localhost:3000/auth/login/user'
  apiUrlClient = 'http://localhost:3000/auth/login/client'

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Login para administradores
   */
  loginAdmin(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrlAdmin, { email, password });
  }

  /**
   * Login para clientes
   */
  loginClient(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrlClient, { email, password });
  }
}
