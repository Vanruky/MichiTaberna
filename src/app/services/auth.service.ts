import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
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
    const token = username === this.adminUser && password === this.adminPass ? 'admin_token' : null;
    if (token) {
      const storage = await this.getStorage();
      await storage.set('token', token);
      return true;
    }
    return false;
  }

  async logout(): Promise<void> {
    const storage = await this.getStorage();
    await storage.remove('token');
  }

  async isLoggedIn(): Promise<boolean> {
    const storage = await this.getStorage();
    const token = await storage.get('token');
    console.log('[AuthService] Token recuperado:', token);
    return !!token;
  }

  async getToken(): Promise<string | null> {
    const storage = await this.getStorage();
    return await storage.get('token');
  }
}
