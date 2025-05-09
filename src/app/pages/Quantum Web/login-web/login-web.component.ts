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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.loginSuperAdmin(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          setTimeout( () => {
            this.rt.navigate(['/inicio-adm'])
          }, 2000)
        }

       
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
