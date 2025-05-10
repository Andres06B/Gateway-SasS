import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-web',
  standalone: false,
  templateUrl: './login-web.component.html',
  styleUrl: './login-web.component.css'
})
export class LoginWebComponent {
  showRegistrationModal = false;
  showErrorModal = false;
  errorMessage = '';
  showPassword = false;
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private rt: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Modal de registro
  openRegistrationModal() {
    this.showRegistrationModal = true;
  }

  closeRegistrationModal() {
    this.showRegistrationModal = false;
  }

  // Modal de error
  openErrorModal(message: string) {
    this.errorMessage = message;
    this.showErrorModal = true;
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.loginSuperAdmin(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          setTimeout(() => {
            this.rt.navigate(['/inicio-adm']);
          }, 2000);
        },
        error: (err) => {
          console.error('Login error', err);
          this.openErrorModal(err.error?.message || 'Credenciales incorrectas o usuario no registrado');
        }
      });
    } else {
      if (this.loginForm.get('email')?.errors?.['required'] || 
          this.loginForm.get('password')?.errors?.['required']) {
        this.openErrorModal('Por favor complete todos los campos');
      } else if (this.loginForm.get('email')?.errors?.['email']) {
        this.openErrorModal('Por favor ingrese un correo electrónico válido');
      }
    }
  }
}
