import { Component } from '@angular/core';

@Component({
  selector: 'app-company-registration',
  standalone: false,
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.css'
})
export class CompanyRegistrationComponent {
  steps = ['Empresa', 'Plan', 'Confirmación', 'Pago'];
  currentStep = 1;
  selectedPlan: string | null = null;
  registrationSuccess = false;

  companyData = {
    name: '',
    legalName: '',
    taxId: '',
    country: 'España',
    city: '',
    address: '',
    email: '',
    phone: ''
  };

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  selectPlan(plan: string) {
    this.selectedPlan = plan;
  }

  getPlanName() {
    switch(this.selectedPlan) {
      case 'boutique': return 'Plan Boutique';
      case 'enterprise': return 'Plan Enterprise';
      case 'custom': return 'Plan Personalizado';
      default: return 'No seleccionado';
    }
  }

  getPlanDescription() {
    switch(this.selectedPlan) {
      case 'boutique': return 'Para hoteles pequeños (hasta 50 habitaciones)';
      case 'enterprise': return 'Para cadenas hoteleras (habitaciones ilimitadas)';
      case 'custom': return 'Solución a medida para tu negocio';
      default: return '';
    }
  }

  getPlanPrice() {
    switch(this.selectedPlan) {
      case 'boutique': return '$299/mes';
      case 'enterprise': return '$899/mes';
      case 'custom': return 'Precio personalizado';
      default: return '-';
    }
  }

  submitPayment() {
    // Aquí iría la lógica real de pago
    // Simulamos el pago exitoso después de 1.5 segundos
    setTimeout(() => {
      this.registrationSuccess = true;
    }, 1500);
  }
}
