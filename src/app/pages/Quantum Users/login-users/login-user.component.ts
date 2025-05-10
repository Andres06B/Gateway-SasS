import { Component } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-user',
  standalone: false,
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {

 showPassword = false;
  showErrorModal = false;
  errorMessage = '';
  
  // Partículas decorativas
  particles = Array(10).fill(0).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 10 + 5}px`,
    duration: `${Math.random() * 10 + 10}s`,
    delay: `${Math.random() * 5}s`
  }));

  constructor(
    private login: LoginService,
    private router: Router
  ) { }

  loginData = {
    email: '',
    password: ''
  }

  LoginUser(): void {
    // Validación de campos vacíos
    if (!this.loginData.email || !this.loginData.password) {
      this.openErrorModal('Por favor complete todos los campos');
      return;
    }

    // Validación de formato de email simple
    if (!this.loginData.email.includes('@') || !this.loginData.email.includes('.')) {
      this.openErrorModal('Por favor ingrese un correo electrónico válido');
      return;
    }

    this.login.loginClient(this.loginData.email, this.loginData.password).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('id', res.id);
        setTimeout(() => {
          this.router.navigate(['/apphome']);
        }, 1000);
      },
      error: (err) => {
        console.error('Error en login', err);
        if (err.status === 401) {
          this.openErrorModal('Credenciales incorrectas o usuario no registrado');
        } else {
          this.openErrorModal('Error al conectar con el servidor. Intente nuevamente.');
        }
      }
    });
  }
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  animateInput(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    input.parentElement?.classList.add('ring-2', 'ring-[#63A481]/20');
  }

  resetInput(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    input.parentElement?.classList.remove('ring-2', 'ring-[#63A481]/20');
  }

  animateButton(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    button.classList.add('shadow-xl');
  }

  resetButton(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    button.classList.remove('shadow-xl');
  }

  openErrorModal(message: string) {
    this.errorMessage = message;
    this.showErrorModal = true;
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  







}
