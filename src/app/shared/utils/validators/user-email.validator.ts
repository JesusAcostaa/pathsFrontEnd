import { TeachersService } from '../../../core/services';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, Observable, switchMap, timer } from 'rxjs';

export function userEmailValidator(service: TeachersService): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{ [key: string]: any } | null> => {
    return timer(500).pipe(
      switchMap(() => service.isEmailAvailable(control.value)),
      map(isAvailable => {
        return isAvailable ? null : { emailTaken: true };
      })
    );
  };
}
