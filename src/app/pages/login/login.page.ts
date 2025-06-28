import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async ionViewWillEnter() {
    const logged = await this.authService.isLoggedIn();
    if (logged) {
      this.router.navigate(['/home']);
    }
  }

  async ingresar() {
    const validUser = /^[a-zA-Z0-9]{3,8}$/.test(this.usuario);
    const validPass = /^\d{4}$/.test(this.contrasena);

    if (validUser && validPass) {
      // Simular token de sesión
      await this.authService.login('fake-token-123');

      const extras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      this.router.navigate(['/home'], extras);
    } else {
      alert('Usuario o contraseña inválidos. Usuario: 3-8 letras/números. Contraseña: 4 dígitos.');
    }
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }
}
