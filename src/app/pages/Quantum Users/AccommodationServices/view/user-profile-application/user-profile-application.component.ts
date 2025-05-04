import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../../../service/clients.service';
import { Clients } from '../../../../../interface/clients.interface';

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

  idCliente: number = Number(localStorage.getItem('id'))
  cliente: Clients = {
    name: '',
    last_name: '',
    email: '',
    phone: '',
    type_document: 'CC' as 'CC' | 'TI' | 'TE' | 'PP' | 'PPT' | 'NIT', 
    number_document: '',
    birth_date: new Date(),
  }

  usuario = {
    nombre: '',
    apellido: '',
    telefono: '',
    tipoDocumento: '',
    dni: '',
    fechaNacimiento: new Date(),
    correo: ''
  };

  constructor(
    private fb: FormBuilder,
    private client: ClientsService
  
  ) {}

  findClient(): void {
    this.client.findOne(this.idCliente).subscribe({
      next: (response) => {
        console.log(response);
        this.cliente = response;

        // Actualiza los valores del formulario con los datos del cliente
        this.formularioPerfil.patchValue({
          nombre: this.cliente.name,
          apellido: this.cliente.last_name,
          telefono: this.cliente.phone,
          tipoDocumento: this.cliente.type_document,
          dni: this.cliente.number_document,
          fechaNacimiento: this.cliente.birth_date,
          correo: this.cliente.email
        });

        this.usuario = {
          nombre: this.cliente.name,
          apellido: this.cliente.last_name,
          telefono: this.cliente.phone,
          tipoDocumento: this.cliente.type_document,
          dni: this.cliente.number_document,
          fechaNacimiento: this.cliente.birth_date,
          correo: this.cliente.email
        };
      },
      error: (err) => {
        console.error('Error al obtener el cliente:', err);
      }
    });
  }

  ngOnInit(): void {
    this.findClient()
    this.inicializarFormulario();
    this.inicializarFormularioPassword();
    
  }

  inicializarFormulario(): void {
    this.formularioPerfil = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      telefono: [this.usuario.telefono, [Validators.required]],
      tipoDocumento: [this.usuario.tipoDocumento, Validators.required],
      dni: [this.usuario.dni, Validators.required],
      fechaNacimiento: [this.usuario.fechaNacimiento, Validators.required],
      correo: [this.usuario.correo, [Validators.required, Validators.email]]
    });
  }

  inicializarFormularioPassword(): void {
    this.formularioPassword = this.fb.group({
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
      const updatedClient: Clients = {
        name: this.formularioPerfil.value.nombre,
        last_name: this.formularioPerfil.value.apellido,
        email: this.formularioPerfil.value.correo,
        phone: this.formularioPerfil.value.telefono,
        type_document: this.formularioPerfil.value.tipoDocumento,
        number_document: this.formularioPerfil.value.dni,
        birth_date: this.formularioPerfil.value.fechaNacimiento
      };
  
      this.client.updateClient(this.idCliente, updatedClient).subscribe({
        next: (response) => {
          console.log('Perfil actualizado:', response);
          alert('Tu perfil ha sido actualizado correctamente');
          this.usuario = {
            nombre: updatedClient.name,
            apellido: updatedClient.last_name,
            telefono: updatedClient.phone,
            tipoDocumento: updatedClient.type_document,
            dni: updatedClient.number_document,
            fechaNacimiento: updatedClient.birth_date,
            correo: updatedClient.email
          };
        },
        error: (err) => {
          console.error('Error al actualizar el perfil:', err);
          alert('Hubo un error al actualizar tu perfil. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      alert('Por favor completa todos los campos correctamente antes de guardar los cambios.');
    }
  }

  cambiarPassword(): void {
    if (this.formularioPassword.valid) {
      const nuevaPassword = this.formularioPassword.value.nuevaPassword;

      // Update the client's password using the updateClient service
      this.client.updateClient(this.idCliente, { password: nuevaPassword }).subscribe({
        next: (response) => {
          console.log('Contraseña actualizada:', response);
          alert('Tu contraseña ha sido actualizada correctamente');
          this.formularioPassword.reset();
          this.fechaActualizacion = new Date();
        },
        error: (err) => {
          console.error('Error al actualizar la contraseña:', err);
          alert('Hubo un error al actualizar tu contraseña. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      alert('Por favor completa todos los campos correctamente y asegúrate que las contraseñas coincidan');
    }
  }

  cancelarEdicion(): void {
    this.formularioPerfil.reset(this.usuario);
  }
}