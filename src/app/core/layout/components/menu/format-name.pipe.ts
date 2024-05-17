import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName',
  standalone: true,
})
export class FormatNamePipe implements PipeTransform {
  transform(value: string): string {
    const [firstName, secondName, firstLastName, secondLastName] =
      value.split(' ');

    if (secondName && secondLastName) {
      return `${firstName} ${firstLastName}`;
    }

    if (secondName) {
      return `${firstName} ${secondName}`;
    }

    return '';
  }
}
