import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText',
  standalone: true
})
export class SliceTextPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const maxLength = 35;

    return value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
  }

}
