import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText',
  standalone: true
})
export class FormatTextPipe implements PipeTransform {

  transform(value: unknown): string {
    if (typeof value !== 'string') return '';

    // Remove underscores and capitalize each word
    return value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

}
