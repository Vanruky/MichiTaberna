import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storageMock } from './testing/test-utils';

const platformMock = { ready: () => Promise.resolve() };
const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: Platform, useValue: platformMock },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Storage, useValue: storageMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    routerSpy.navigate.calls.reset();
    authServiceSpy.isLoggedIn.calls.reset();
  });

  it('should create the app', () => {
    authServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(true));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to /home if logged in', waitForAsync(async () => {
    authServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(true));
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.initializeApp();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should navigate to /login if not logged in', waitForAsync(async () => {
    authServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(false));
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.initializeApp();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));
});
