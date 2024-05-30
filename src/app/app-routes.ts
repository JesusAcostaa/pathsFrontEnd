import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(mod => mod.LoginComponent),
  },
  {
    path: 'inicio',
    canActivate: [authenticationGuard],
    loadChildren: () =>
      import('./pages/config/layout.routes').then(mod => mod.layoutRoutes),
  },
  {
    path: 'encuesta-estilo-aprendizaje',
    loadComponent: () =>
      import(
        './pages/learning-style-survey/learning-style-survey.component'
      ).then(mod => mod.LearningStyleSurveyComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        mod => mod.NotFoundComponent
      ),
  },
];
