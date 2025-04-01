import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
menuOpen: boolean = false;

toggleMenu(): void {
  this.menuOpen = !this.menuOpen;
  console.log("Estado del menú:", this.menuOpen); // Para depurar si el menú se abre
}


}
