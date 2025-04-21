import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styleUrls: ['./pagina-web.component.css'],
  standalone: false,
})
export class PaginaWebComponent implements OnInit {
  hotelForm: FormGroup;
  isEditing = false;
  profileImage: string | null = './assets/default-hotel.png';
  backgroundImage: string | null = './assets/default-bg.jpg';
  parallaxOffset = 0;
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder) {
    this.hotelForm = this.fb.group({
      name: ['Hotel Ejemplo', Validators.required],
      description: [
        'Un hotel acogedor en el corazón de la ciudad que combina elegancia y comodidad. ' +
        'Nuestro establecimiento ofrece servicios de primera clase, habitaciones espaciosas ' +
        'y una gastronomía excepcional para hacer de su estadía una experiencia inolvidable.', 
        Validators.required
      ],
      location: ['Ciudad, País', Validators.required],
      instagram: ['hotel_ejemplo'],
      facebook: ['hotel.ejemplo'],
      rooms: this.fb.array([
        this.createRoom(
          'Habitación Standard', 
          'Amplia habitación con cama doble, baño privado, TV pantalla plana, WiFi gratuito y escritorio de trabajo. Ideal para viajeros de negocios y parejas.', 
          'Standard', 
          100
        ),
        this.createRoom(
          'Suite Premium', 
          'Exclusiva suite con vista al mar, sala de estar independiente, baño de lujo con jacuzzi y amenities premium. Disfrute de nuestro servicio de habitaciones las 24 horas.', 
          'Suite', 
          250
        )
      ])
    });
  }

  ngOnInit() {
    this.updateParallax();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.updateParallax();
  }

  updateParallax() {
    this.parallaxOffset = window.pageYOffset;
  }

  createRoom(name: string, description: string, type: string, price: number): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      description: [description, Validators.required],
      type: [type, Validators.required],
      price: [price, [Validators.required, Validators.min(0)]],
      image: ['./assets/default-room.jpg']
    });
  }

  get rooms() {
    return this.hotelForm.get('rooms') as FormArray;
  }

  addRoom() {
    this.rooms.push(this.createRoom('Nueva Habitación', 'Descripción de la habitación', 'Tipo', 0));
  }

  removeRoom(index: number) {
    if (this.rooms.length > 1) {
      this.rooms.removeAt(index);
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      window.scrollTo(0, 0);
    }
  }

  onImageChange(event: any, type: 'profile' | 'background') {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'profile') {
          this.profileImage = reader.result as string;
        } else {
          this.backgroundImage = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onRoomImageChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.rooms.at(index).get('image')?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    if (this.hotelForm.valid) {
      this.isEditing = false;
      console.log('Datos actualizados:', this.hotelForm.value);
      // Here you would typically send the data to your backend
    } else {
      this.markFormGroupTouched(this.hotelForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }}