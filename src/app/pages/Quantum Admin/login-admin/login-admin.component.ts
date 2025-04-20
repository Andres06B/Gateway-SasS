import { Component } from '@angular/core';


@Component({
  selector: 'app-login-admin',
  standalone: false,
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {

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
    // Lógica de envío del formulario
    console.log('Formulario enviado');
  }

}
