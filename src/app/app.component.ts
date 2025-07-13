import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false 
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.initializeApp();
  }

  public async initializeApp() {
    await this.platform.ready();
    const isLogged = await this.authService.isLoggedIn();
    console.log('[AppComponent] Plataforma lista, redirigiendo...');
    this.router.navigate([isLogged ? '/home' : '/login']);
  }
}
