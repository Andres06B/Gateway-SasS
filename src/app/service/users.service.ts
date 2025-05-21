import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interface/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'https://quantumsaas-production.up.railway.app/users'

  constructor(
    private http: HttpClient
  ) { }

  getUser(id: number): Observable<IUser>{
    return this.http.get<IUser>(`${this.baseUrl}/${id}`);
  }

  createUser(user: IUser): Observable<IUser>{
    return this.http.post<IUser>(`${this.baseUrl}/create`, user);
  }
}
