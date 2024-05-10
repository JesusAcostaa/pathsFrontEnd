import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../core/layout/layout.component').then(
        mod => mod.LayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../teachers/teachers.component').then(
            mod => mod.TeachersComponent
          ),
      },
      {
        path: 'gestion-estudiantes',
        loadComponent: () =>
          import('../students/students.component').then(
            mod => mod.StudentsComponent
          ),
      },
      {
        path: 'gestion-recursos',
        loadComponent: () =>
          import('../resources/resources.component').then(
            mod => mod.ResourcesComponent
          ),
      },
      {
        path: 'rutas-aprendizaje',
        loadComponent: () =>
          import('../learning-routes/learning-routes.component').then(
            mod => mod.LearningRoutesComponent
          ),
      },
    ],
  },
];
