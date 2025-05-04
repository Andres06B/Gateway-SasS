import { Component } from '@angular/core';
import { ClientsService } from '../../../service/clients.service';
import { Router } from '@angular/router';

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

  formData = {
    name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    country: '',
    type_document: 'CC' as 'CC' | 'TI' | 'TE' | 'PP' | 'PPT' | 'NIT',
    number_document: '',
    birth_date: new Date()
  }

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


  constructor(
    private client: ClientsService,
    private router: Router
  ) { }


  createClient() {
    this.client.createClient(this.formData).subscribe({
      next: (res) => {
        console.log(res);
        setTimeout(() => {
          this.router.navigate(['/loginUser'])
        }, 2000)
        
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear el cliente');
      }
    })
  }
}
