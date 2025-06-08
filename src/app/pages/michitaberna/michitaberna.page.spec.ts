import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MichitabernaPage } from './michitaberna.page';

describe('MichitabernaPage', () => {
  let component: MichitabernaPage;
  let fixture: ComponentFixture<MichitabernaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MichitabernaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
