import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MichitabernaPage } from './michitaberna.page';

const routes: Routes = [
  {
    path: '',
    component: MichitabernaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MichitabernaPageRoutingModule {}
