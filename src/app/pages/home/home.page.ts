import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Capturamos datos que vienen del login con NavigationExtras.state
    if (this.router.getCurrentNavigation()?.extras.state) {
      const state = this.router.getCurrentNavigation()?.extras.state as any;
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
    this.router.navigate(['/catalogo']);
  }

  irResenas() {
    this.router.navigate(['/reviews']);
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: '¡Nos vemos pronto!',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/login']);
        }
      }]
    });
    await alert.present();
  }
}
