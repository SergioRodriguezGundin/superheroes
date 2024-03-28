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
          import('./dashboard/dashboard.component').then(
            (c) => c.DashboardComponent,
          )
      },
    ],
  },
]