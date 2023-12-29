import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
  standalone: true,
})
export class CapitalizeFirstPipe {
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
