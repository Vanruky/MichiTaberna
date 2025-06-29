import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLogged = await this.authService.isLoggedIn();
    console.log('[AuthGuard] canActivate? isLogged:', isLogged);
    if (!isLogged) {
      this.router.navigateByUrl('/catalogo');

      return false;
    }
    return true;
  }
}
