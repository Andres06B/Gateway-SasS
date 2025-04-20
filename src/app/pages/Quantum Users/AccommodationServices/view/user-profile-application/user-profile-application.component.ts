import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile-application',
  standalone: false,
  templateUrl: './user-profile-application.component.html',
  styleUrl: './user-profile-application.component.css'
})
export class UserProfileApplicationComponent {
  imagenPerfil: string | ArrayBuffer | null = null;
  formularioPerfil!: FormGroup;
  formularioPassword!: FormGroup;
  mostrarPassword = {
    actual: false,
    nueva: false,
    confirmar: false
  };
  fechaRegistro = new Date('2023-01-15');
  fechaActualizacion = new Date();

  // Datos de ejemplo del usuario (deberías obtenerlos de tu servicio de autenticación)
  usuario = {
    nombre: 'Juan Camilo',
    apellido: 'perez',
    telefono: '3101234567',
    tipoDocumento: 'CC',
    dni: '1234567890',
    fechaNacimiento: '1990-05-15',
    correo: 'maria.gonzalez@example.com'
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.inicializarFormularioPassword();
  }

  inicializarFormulario(): void {
    this.formularioPerfil = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      telefono: [this.usuario.telefono, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      tipoDocumento: [this.usuario.tipoDocumento, Validators.required],
      dni: [this.usuario.dni, Validators.required],
      fechaNacimiento: [this.usuario.fechaNacimiento, Validators.required],
      correo: [this.usuario.correo, [Validators.required, Validators.email]]
    });
  }

  inicializarFormularioPassword(): void {
    this.formularioPassword = this.fb.group({
      passwordActual: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmarPassword: ['', Validators.required]
    }, { validator: this.coincidenContrasenas('nuevaPassword', 'confirmarPassword') });
  }

  coincidenContrasenas(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  cambiarImagen(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPerfil = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  togglePasswordVisibility(field: keyof typeof this.mostrarPassword): void {
    this.mostrarPassword[field] = !this.mostrarPassword[field];
  }

  guardarCambios(): void {
    if (this.formularioPerfil.valid) {
      // Aquí iría la lógica para guardar los cambios en el backend
      console.log('Datos guardados:', this.formularioPerfil.value);
      alert('Tus cambios se han guardado correctamente');
      
      // Actualizar los datos del usuario localmente
      this.usuario = {
        ...this.usuario,
        ...this.formularioPerfil.value
      };
      this.fechaActualizacion = new Date();
    } else {
      alert('Por favor completa todos los campos correctamente');
    }
  }

  cambiarPassword(): void {
    if (this.formularioPassword.valid) {
      // Aquí iría la lógica para cambiar la contraseña en el backend
      console.log('Cambio de contraseña:', this.formularioPassword.value);
      alert('Tu contraseña ha sido actualizada correctamente');
      this.formularioPassword.reset();
      this.fechaActualizacion = new Date();
    } else {
      alert('Por favor completa todos los campos correctamente y asegúrate que las contraseñas coincidan');
    }
  }

  cancelarEdicion(): void {
    this.formularioPerfil.reset(this.usuario);
  }
}