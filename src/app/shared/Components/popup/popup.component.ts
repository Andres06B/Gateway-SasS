import { Component ,Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Output() close = new EventEmitter<void>();

  selectProfile(profileType: string) {
    console.log(`Perfil seleccionado: ${profileType}`);
    this.closePopup();
  }

  closePopup() {
    this.close.emit();
  }

  // Opcional: Cerrar al presionar ESC
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closePopup();
  }
}
