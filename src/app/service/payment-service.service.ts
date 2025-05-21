import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { paymentService } from '../interface/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  private baseUrl = 'https://quantumsaas-production.up.railway.app/payment'

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/all');
  }

  findPremiumUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/users/premium');
  }

  findVipUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/users/vip');
  }

  createPayment(data: paymentService): Observable<paymentService> {
    return this.http.post<paymentService>(this.baseUrl + '/create', data)
  }

  






}
