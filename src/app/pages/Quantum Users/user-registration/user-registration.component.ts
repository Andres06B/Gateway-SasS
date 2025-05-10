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
  showSuccessModal = false;
  showErrorModal = false;
  errorMessage = '';
  termsAccepted = false;

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

  constructor(
    private client: ClientsService,
    private router: Router
  ) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
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

  openSuccessModal(): void {
    this.showSuccessModal = true;
    setTimeout(() => {
      this.closeSuccessModal();
      this.router.navigate(['/loginUser']);
    }, 3000);
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  openErrorModal(message: string): void {
    this.errorMessage = message;
    this.showErrorModal = true;
  }

  closeErrorModal(): void {
    this.showErrorModal = false;
  }

  createClient() {
    // Validación de campos vacíos
    if (!this.formData.name || !this.formData.last_name || !this.formData.email || 
        !this.formData.phone || !this.formData.password || !this.formData.country || 
        !this.formData.number_document || !this.formData.birth_date) {
      this.openErrorModal('Por favor complete todos los campos requeridos');
      return;
    }

    // Validación de email
    if (!this.validateEmail(this.formData.email)) {
      this.openErrorModal('Por favor ingrese un correo electrónico válido');
      return;
    }

    // Validación de términos
    if (!this.termsAccepted) {
      this.openErrorModal('Debe aceptar los términos y condiciones');
      return;
    }

    this.client.createClient(this.formData).subscribe({
      next: (res) => {
        console.log(res);
        this.openSuccessModal();
      },
      error: (err) => {
        console.error(err);
        this.openErrorModal(err.error?.message || 'Error al crear el usuario. Por favor intente nuevamente.');
      }
    });
  }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
