import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface UserInfo {
  email: string;
  photoUrl: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo = new BehaviorSubject<UserInfo | null>(null);
  userInfo$ = this.userInfo.asObservable();

  constructor() {
    // Intentar recuperar la información del usuario del localStorage al iniciar
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      this.userInfo.next(JSON.parse(savedUser));
    }
  }

  setUserInfo(user: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.userInfo.next(user);
  }

  getUserInfo() {
    return this.userInfo.value;
  }

  clearUserInfo() {
    localStorage.removeItem('userInfo');
    this.userInfo.next(null);
  }
}
