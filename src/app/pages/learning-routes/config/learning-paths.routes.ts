import { Routes } from '@angular/router';

export const learningPathsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../learning-paths.component').then(
        mod => mod.LearningPathsComponent
      ),
    children: [
      {
        path: 'juegos-visuales',
        loadComponent: () =>
          import('../pages').then(mod => mod.VisualGamesComponent),
      },
    ],
  },
];
