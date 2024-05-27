import { AuthService } from '../services';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

export const authenticationGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return true;

};
