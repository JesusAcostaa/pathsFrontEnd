import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';

import { LoaderService } from '../services';

export const httpLoaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  console.log('Loader interceptor');
  const loaderService = inject(LoaderService);
  loaderService.show();

  return next(req).pipe(finalize(() => loaderService.hide()));
};
