import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage {
  usuario = '';
  contrasena = '';
  confirmarContrasena = '';
  correo = '';
  nombre = '';
  apellido = '';
  telefono = '';
  direccion = '';

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (!usuarios.find((u: any) => u.usuario === 'Momoky')) {
      usuarios.push({
        usuario: 'Momoky',
        contrasena: '2716',
        correo: 'test@gmail.com',
        nombre: 'Momoky',
        apellido: 'Gato',
        direccion: 'Calle 123 depto 456, Santiago, Santiago',
        telefono: '+56978699983'
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

formatearTelefono(event: any) {
  let valor = event.detail.value.replace(/\D/g, '');

  if (valor.startsWith('569')) {
    valor = '+56 9' + valor.slice(3);
  } else if (valor.startsWith('56')) {
    valor = '+56 9' + valor.slice(2);
  } else if (!valor.startsWith('9')) {
    valor = '+56 9' + valor;
  } else {
    valor = '+56 9' + valor.slice(1);
  }


  let numero = valor.replace(/\D/g, '').slice(4); 

  if (numero.length > 4) {
    numero = numero.slice(0, 4) + ' ' + numero.slice(4, 8);
  }

  this.telefono = `+56 9 ${numero}`.trim();
}


  registrar() {
    if (
      !this.usuario || !this.contrasena || !this.confirmarContrasena ||
      !this.correo || !this.nombre || !this.apellido || !this.telefono || !this.direccion
    ) {
      this.mostrarAlerta('Campos requeridos', 'Todos los campos son obligatorios.');
      return;
    }

    if (!/^[a-zA-Z0-9]{3,8}$/.test(this.usuario)) {
      this.mostrarAlerta('Usuario inválido', 'Debe tener entre 3 y 8 caracteres alfanuméricos.');
      return;
    }

    if (!/^\d{4}$/.test(this.contrasena)) {
      this.mostrarAlerta('Contraseña inválida', 'Debe ser numérica de 4 dígitos.');
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.mostrarAlerta('Error', 'Las contraseñas no coinciden.');
      return;
    }

    const telefonoSinEspacios = this.telefono.replace(/\s+/g, '');
    const telefonoValido = /^\+569\d{8}$/.test(telefonoSinEspacios);

    if (!telefonoValido) {
      this.mostrarAlerta('Teléfono inválido', 'Debe comenzar con +56 9 y tener 8 dígitos después.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const existeUsuario = usuarios.find((u: any) => u.usuario === this.usuario);
    const existeCorreo = usuarios.find((u: any) => u.correo === this.correo);

    if (existeUsuario) {
      this.mostrarAlerta('Error', 'Este nombre de usuario ya está registrado.');
      return;
    }

    if (existeCorreo) {
      this.mostrarAlerta('Error', 'Este correo ya está registrado.');
      return;
    }

    usuarios.push({
      usuario: this.usuario,
      contrasena: this.contrasena,
      correo: this.correo,
      nombre: this.nombre,
      apellido: this.apellido,
      direccion: this.direccion,
      telefono: telefonoSinEspacios
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    this.mostrarAlerta('Registro exitoso', '¡Cuenta creada con éxito!');
    this.router.navigate(['/login']);
  }

  volverLogin() {
    this.router.navigate(['/login']);
  }
}