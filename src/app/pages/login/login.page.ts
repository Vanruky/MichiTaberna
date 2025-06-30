import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  usuario = '';
  contrasena = '';

  constructor(private router: Router, private authService: AuthService) {}

  async ionViewWillEnter() {
    const logged = await this.authService.isLoggedIn();
    if (logged) {
      this.router.navigate(['/home']);
    }
  }

  async ingresar() {
    const isAdmin = await this.authService.login(this.usuario, this.contrasena);
    if (isAdmin) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales inválidas...');
    }
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }
}
