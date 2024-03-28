import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'marvel'
  },
  {
    path: 'marvel',
    loadChildren: () => import('./feature/marvel/marvel.routes')
  }
];
