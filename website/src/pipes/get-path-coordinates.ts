import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPathCoordinates'
})
export class GetPathCoordinatesPipe implements PipeTransform {
  public transform(path: HTMLElement, offset: number, isRelativeValue: boolean = false): { left: string, top: string } {
    const svgPath = path as Element as SVGPathElement;
    const totalLength = svgPath.getTotalLength();
    const length = isRelativeValue
      ? offset * totalLength
      : totalLength - offset;

    const matrix = svgPath.getCTM();
    const point = svgPath
      .getPointAtLength(length)
      .matrixTransform(matrix);

    const { x, y }: DOMPoint = point;

    return {
      left: `${x}px`,
      top: `${y}px`,
    };
  }
}