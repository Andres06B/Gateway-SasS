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


buttonActive($event: MouseEvent) {
throw new Error('Method not implemented.');
}
  showPassword = false;
  showRipple = false;
  rippleX = '0px';
  rippleY = '0px';
  
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

  LoginUser( ): void {
    const { email, password } = this.loginData;
    this.login.loginClient(email, password).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('id', res.id);
        setTimeout(() => {
          this.router.navigate(['/apphome']);
        }, 1000);
      }
    })
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

  createRipple(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    
    this.rippleX = `${event.clientX - rect.left}px`;
    this.rippleY = `${event.clientY - rect.top}px`;
    this.showRipple = true;
    
    setTimeout(() => {
      this.showRipple = false;
    }, 600);
  }

  







}
