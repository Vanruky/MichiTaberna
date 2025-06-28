import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then(m => m.CatalogoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/reviews/reviews.module').then(m => m.ReviewsPageModule)
  },
  {
    path: 'michitaberna',
    loadChildren: () => import('./pages/michitaberna/michitaberna.module').then(m => m.MichitabernaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
