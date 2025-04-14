import { Component } from '@angular/core';

@Component({
  selector: 'app-login-web',
  standalone: false,
  templateUrl: './login-web.component.html',
  styleUrl: './login-web.component.css'
})
export class LoginWebComponent {
  showPassword = false;
 
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    // Lógica de envío del formulario
    console.log('Formulario enviado');
  }
}
