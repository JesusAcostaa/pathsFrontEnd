import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName',
  standalone: true,
})
export class FormatNamePipe implements PipeTransform {
  transform(value: string): string {
    const [firstName, secondName, firstLastName] = value.split(' ');

    if (secondName && firstLastName) {
      return `${firstName} ${firstLastName}`;
    }

    return firstName || '';
  }
}
