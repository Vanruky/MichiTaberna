import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _storage: Storage | null = null;

  private readonly adminUser = 'MichiTabernaADM';
  private readonly adminPass = '8989';

  constructor(private storage: Storage) {}

  private async getStorage(): Promise<Storage> {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
    return this._storage;
  }

  async login(username: string, password: string): Promise<boolean> {
    const isAdmin = username === this.adminUser && password === this.adminPass;
    if (isAdmin) {
      const storage = await this.getStorage();
      await storage.set('token', 'admin_token');

      const usuarioData = {
        usuario: username,
        contrasena: password,
        correo: 'admin@michitaberna.com',
        nombreCompleto: 'Administrador Michi',
        telefono: '123456789',
        direccion: 'Calle MichiTaberna 123'
      };

      await storage.set('usuarioData', usuarioData);
      return true;
    }

    return false;
  }

  async logout(): Promise<void> {
    const storage = await this.getStorage();
    await storage.remove('token');
    await storage.remove('usuarioData');
  }

  async isLoggedIn(): Promise<boolean> {
    const storage = await this.getStorage();
    const token = await storage.get('token');
    return !!token;
  }

  async getUsuarioData(): Promise<any> {
  const storage = await this.getStorage();
  return await storage.get('usuarioData');
}
}
