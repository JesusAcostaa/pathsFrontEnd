import { LoaderService } from '../services';

export interface HasLoaderService {
  loaderService: LoaderService;
}

export function withLoader() {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const loader = (this as HasLoaderService).loaderService;
      loader.show();
      await originalMethod
        .apply(this, args)
        .then(() => loader.hide())
        .catch((error: unknown) => {
          loader.hide();
          throw error;
        });
    };
  };
}
