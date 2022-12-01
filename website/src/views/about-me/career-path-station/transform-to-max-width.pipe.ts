import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformToMaxWidth'
})
export class TransformToMaxWidthPipe implements PipeTransform {
  public transform(value: any, suffix?: string, ...args: any[]): any {
    const { left, top } = value;

    return {
      // screenWidth - left - margin - padding-left - padding-right - border
      'max-width': `calc(100vw - ${left} - 30px - 8px - 8px - 4px - 16px ${suffix || ''})`
    }
  }
}