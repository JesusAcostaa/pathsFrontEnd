import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth.service';

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
    path: 'inicio',
    canActivate: [authenticationGuard],
    loadChildren: () =>
      import('./pages/config/home.routes').then(mod => mod.routes),
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
