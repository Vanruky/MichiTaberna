import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
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
  const isAdmin = await this.authService.login(this.usuario, this.contrasena);
  console.log('[LoginPage] login success:', isAdmin);
  console.log('[LoginPage] stored token:', await this.authService.getToken());
  if (isAdmin) {
    this.router.navigate(['/home'], { state: { usuario: this.usuario } });
  } else {
    alert('Credenciales inválidas...');
  }
}


  irRegistro() {
    this.router.navigate(['/registro']);
  }
}

