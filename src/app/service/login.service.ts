import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrlAdmin = 'https://quantumsaas-production.up.railway.app/auth/login/user'
  apiUrlClient = 'https://quantumsaas-production.up.railway.app/auth/login/client'
  apiUrlSuperAdmin = 'https://quantumsaas-production.up.railway.app/auth/login-super-admin'

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
  /**
   * Login para super administradores
   */
  loginSuperAdmin(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrlSuperAdmin, { email, password });
  }
}
