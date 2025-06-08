import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MichitabernaPageRoutingModule } from './michitaberna-routing.module';

import { MichitabernaPage } from './michitaberna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MichitabernaPageRoutingModule
  ],
  declarations: [MichitabernaPage]
})
export class MichitabernaPageModule {}
