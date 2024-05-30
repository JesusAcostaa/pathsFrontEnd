import { TeachersService } from '../../../core/services';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, Observable, switchMap, tap, timer } from 'rxjs';

export function userEmailValidator(
  originalEmail: string,
  service: TeachersService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return timer(500).pipe(
      switchMap(() => service.isEmailAvailable(control.value)),
      map(user => {
        if (control.value === originalEmail) {
          return null;
        }

        return !user ? null : { emailTaken: true };
      })
    );
  };
}
