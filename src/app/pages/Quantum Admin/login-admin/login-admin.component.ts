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
  email = '';
  password = '';
  showPassword = false;
  isClicked = false;
  showErrorModal = false;
  errorMessage = '';

  constructor(
    private loginService: LoginService,
    private route: Router
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLoginClick(): void {
    this.isClicked = true;
    setTimeout(() => this.isClicked = false, 150);
  }

  openErrorModal(message: string) {
    this.errorMessage = message;
    this.showErrorModal = true;
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  onSubmit(): void {
    // Validación de campos vacíos
    if (!this.email || !this.password) {
      this.openErrorModal('Por favor complete todos los campos');
      return;
    }

    // Validación de formato de email simple
    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.openErrorModal('Por favor ingrese un correo electrónico válido');
      return;
    }

    this.loginService.loginAdmin(this.email, this.password).subscribe({
      next: res => {
        console.log('Login exitoso', res);
        localStorage.setItem('token', res.id);
        localStorage.setItem('vip', res.has_vip_service);
        localStorage.setItem('premium', res.has_premium_service);
        this.route.navigate(['/inicio']);
      },
      error: err => {
        console.error('Error en login', err);
        if (err.status === 401) {
          this.openErrorModal('Credenciales incorrectas o usuario no registrado');
        } else {
          this.openErrorModal('Error al conectar con el servidor. Intente nuevamente.');
        }
      }
    });
  }

}
