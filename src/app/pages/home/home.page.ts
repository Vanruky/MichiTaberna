import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  usuario: any = {
    usuario: '',
    contrasena: '',
    correo: '',
    nombreCompleto: '',
    telefono: '',
    direccion: ''
  };

  mostrarModal = false;
  presentingElement: HTMLElement | undefined;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.presentingElement = document.querySelector('ion-content') as HTMLElement;
  }

  async abrirMisDatos() {
    const datos = await this.authService.getUsuarioData();
    if (datos) {
      this.usuario = datos;
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  irCatalogo() {
    this.router.navigate(['/catalogo']);
  }

  irNosotros() {
    this.router.navigate(['/michitaberna']);
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: '¡Nos vemos pronto!',
      buttons: [{
        text: 'OK',
        handler: async () => {
          await this.authService.logout();
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        }
      }]
    });
    await alert.present();
  }
}
