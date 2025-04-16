import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';



interface MenuItem {
  label: string;
  route: string;
  iconPath: string;
  iconColor: string;
}
@Component({
  selector: 'app-web-hotel',
  standalone: false,
  templateUrl: './web-hotel.component.html',
  styleUrl: './web-hotel.component.css'
})
export class WebHotelComponent {
  isMenuOpen = false;
  
  menuItems: MenuItem[] = [
    {
      label: 'Hostal',
      route: '/hostal',
      iconPath: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2',
      iconColor: 'text-[#63A481]'
    },
    {
      label: 'Hotel',
      route: '/hotel',
      iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      iconColor: 'text-[#428764]'
    },
    {
      label: 'Cabaña',
      route: '/cabana',
      iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      iconColor: 'text-[#306B4F]'
    }
  ];

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onLogin(): void {
    // Lógica de login o redirección
    console.log('Login clicked');
    // this.router.navigate(['/login']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  heroData = {
    subtitle: 'Encuentra el alojamiento perfecto para tu próximo viaje',
    features: [
      { icon: '🏨', text: 'Hoteles premium' },
      { icon: '🛖', text: 'Cabañas acogedoras' },
      { icon: '🛏️', text: 'Hostales vibrantes' }
    ]
  };

  // Para el efecto de brillo que sigue al mouse
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const hero = document.querySelector('.hero-premium') as HTMLElement;
    if (hero) {
      hero.style.setProperty('--x', `${event.clientX}px`);
      hero.style.setProperty('--y', `${event.clientY}px`);
    }
  }
}
