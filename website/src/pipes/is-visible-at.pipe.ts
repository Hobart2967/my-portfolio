import { Pipe, PipeTransform } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'isVisibleAt'
})
export class IsVisibleAtPipe implements PipeTransform {
  public transform(path: HTMLElement, offset: number, isRelativeValue: boolean = false): Observable<boolean> {
    return interval(10)
      .pipe(map(() => {
        const svgPath = path as Element as SVGPathElement;
        const totalLength = svgPath.getTotalLength();
        const currentPathLength = totalLength - parseInt(/^([\d.]*)/g.exec(window.getComputedStyle(svgPath).strokeDashoffset)[1], 10);

        const length = isRelativeValue
          ? offset * totalLength
          : totalLength - offset;

        return currentPathLength >= length;
      }));
  }
}