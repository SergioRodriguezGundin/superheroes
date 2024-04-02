import { Routes } from '@angular/router';
import { MarvelService } from './marvel.service';

export default <Routes>[
  {
    path: '',
    providers: [MarvelService],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent,
          )
      },
      {
        path: '**',
        redirectTo: '',
      }
    ],
  },
]