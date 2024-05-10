import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    path: '',
    loadComponent: () =>
      import('./pages/layout/layout.component').then(
        mod => mod.LayoutComponent
      ),
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./pages/home/home.component').then(mod => mod.HomeComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        mod => mod.NotFoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
