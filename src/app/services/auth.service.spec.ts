import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage-angular';

class StorageMock {
  create = () => Promise.resolve();
  get = jasmine.createSpy('get').and.returnValue(Promise.resolve(null));
  set = jasmine.createSpy('set').and.returnValue(Promise.resolve());
  remove = jasmine.createSpy('remove').and.returnValue(Promise.resolve());
  clear = jasmine.createSpy('clear').and.returnValue(Promise.resolve());
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Storage, useClass: StorageMock }
      ]
    }).compileComponents();

    service = TestBed.inject(AuthService);

    const storage = TestBed.inject(Storage);
    await storage.create();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
