import { Component } from '@angular/core';

@Component({
  selector: 'app-preferred-stays-application',
  standalone: false,
  templateUrl: './preferred-stays-application.component.html',
  styleUrl: './preferred-stays-application.component.css'
})
export class PreferredStaysApplicationComponent {
  categories = ['Hoteles', 'Hostales', 'Cabañas'];
  activeCategory = 'Hoteles';

  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }
}
