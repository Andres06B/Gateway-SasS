// storage.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Obtener un item del localStorage
  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  // Guardar un item en el localStorage
  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  // Eliminar un item del localStorage
  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  // Limpiar todo el localStorage
  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }

  // Propiedad computada para verificar si está en el navegador
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}