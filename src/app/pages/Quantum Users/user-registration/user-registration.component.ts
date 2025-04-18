import { Component } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  standalone: false,
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  showPassword = false;
  showConfirmPassword = false;
  showRipple = false;
  rippleX = '0px';
  rippleY = '0px';
  
  particles = Array.from({ length: 15 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 10 + 5}px`,
    duration: `${Math.random() * 20 + 10}s`,
    delay: `${Math.random() * 5}s`
  }));

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  animateButton(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    button.classList.add('shadow-lg');
  }

  resetButton(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    button.classList.remove('shadow-lg');
  }

  animateInput(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    const parent = input.parentElement;
    parent?.classList.add('ring-2', 'ring-[#63A481]/30');
  }

  resetInput(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    const parent = input.parentElement;
    parent?.classList.remove('ring-2', 'ring-[#63A481]/30');
  }
}
