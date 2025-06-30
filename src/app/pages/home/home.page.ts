import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
  const navState = this.router.getCurrentNavigation()?.extras.state;
  if (navState) {
    const state = navState as any;
    this.usuario.usuario = state.usuario || '';
    this.usuario.contrasena = state.contrasena || '';
    this.usuario.correo = state.correo || '';
    this.usuario.nombreCompleto = `${state.nombre || ''} ${state.apellido || ''}`.trim();
    this.usuario.telefono = state.telefono || '';
    this.usuario.direccion = state.direccion || '';
  }
}

  abrirMisDatos() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  irCatalogo() {
    console.log('[HomePage] irCatalogo clicked');
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
          console.log('[HomePage] Usuario cerró sesión.');
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        }
      }]
    });
    await alert.present();
  }
}