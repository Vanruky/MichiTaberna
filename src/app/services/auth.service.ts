import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async login(token: string) {
    await this._storage?.set('token', token);
  }

  async logout() {
    await this._storage?.remove('token');
  }

  async isLoggedIn(): Promise<boolean> {
    const token = await this._storage?.get('token');
    return !!token;
  }

  async getToken() {
    return await this._storage?.get('token');
  }
}
