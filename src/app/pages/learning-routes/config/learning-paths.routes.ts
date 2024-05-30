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
        path: 'visual',
        loadComponent: () =>
          import('../pages').then(mod => mod.VisualGamesComponent),
      },
      {
        path: 'auditivo',
        loadComponent: () =>
          import('../pages').then(mod => mod.AuditoryGamesComponent),
      },
      {
        path: 'kinestesico',
        loadComponent: () =>
          import('../pages').then(mod => mod.KinestheticGamesComponent),
      },
      {
        path: 'mixto',
        loadComponent: () =>
          import('../pages').then(mod => mod.MixedGamesComponent),
      },
    ],
  },
];
