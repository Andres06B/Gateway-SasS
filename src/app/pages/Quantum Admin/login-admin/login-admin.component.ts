import { Component } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-admin',
  standalone: false,
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {

  constructor(
    private loginService:LoginService,
    private route: Router
  ){}

  email = '';
  password = '';

  showPassword = false;
  isClicked = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLoginClick(): void {
    this.isClicked = true;
    setTimeout(() => this.isClicked = false, 150);
  }

  onSubmit(): void {
    this.loginService.loginAdmin(this.email, this.password).subscribe({
      next: res => {
        console.log('Login exitoso', res);
        localStorage.setItem('token', res.id);
        this.route.navigate(['/inicio']);
      },
      error: err => console.error('Error en login', err)
    })
    
  }

}
