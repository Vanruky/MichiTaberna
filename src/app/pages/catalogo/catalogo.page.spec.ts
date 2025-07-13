import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoPage } from './catalogo.page';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

class StorageMock {
  create = () => Promise.resolve();
  get = jasmine.createSpy('get').and.returnValue(Promise.resolve(null));
  set = jasmine.createSpy('set').and.returnValue(Promise.resolve());
  remove = jasmine.createSpy('remove').and.returnValue(Promise.resolve());
  clear = jasmine.createSpy('clear').and.returnValue(Promise.resolve());
};

const authServiceMock = {
  login: jasmine.createSpy('login').and.returnValue(Promise.resolve(true)),
  logout: jasmine.createSpy('logout'),
};

describe('CatalogoPage', () => {
  let component: CatalogoPage;
  let fixture: ComponentFixture<CatalogoPage>;

  const geolocationMock = {
    getCurrentPosition: jasmine.createSpy('getCurrentPosition').and.returnValue(
      Promise.resolve({
        coords: {
          latitude: 12.34,
          longitude: 56.78
        }
      })
    )
  };

  let storage: Storage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoPage],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Storage, useClass: StorageMock },
        { provide: Geolocation, useValue: geolocationMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    storage = TestBed.inject(Storage);
    await storage.create();

    fixture = TestBed.createComponent(CatalogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe alternar el estado meGusta del producto', () => {
    const producto = { meGusta: false };
    component.toggleLike(producto);
    expect(producto.meGusta).toBe(true);
    component.toggleLike(producto);
    expect(producto.meGusta).toBe(false);
  });

  it('debe llamar console.log al comprar un producto', () => {
    const producto = { titulo: 'Producto de prueba' };
    spyOn(console, 'log');
    component.comprar(producto);
    expect(console.log).toHaveBeenCalledWith('Comprar:', producto);
  });

  it('debería obtener la ubicación y asignar latitud y longitud', async () => {
    await component.obtenerUbicacion();
    expect(component.latitude).toBe(12.34);
    expect(component.longitude).toBe(56.78);
    expect(component.error).toBe('');
    expect(geolocationMock.getCurrentPosition).toHaveBeenCalled();
  });
});
