import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CareerStation } from '../../../models/career-station.interface';

@Component({
  selector: 'career-path-station',
  templateUrl: './career-path-station.component.html',
  styleUrls: ['./career-path-station.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CareerPathStation {
  //#region Properties
  private _station: CareerStation;
  @Input()
  public get station(): CareerStation {
    return this._station;
  }
  public set station(v: CareerStation) {
    this._station = v;
  }

  private _path: HTMLElement;
  @Input()
  public get path(): HTMLElement {
    return this._path;
  }
  public set path(v: HTMLElement) {
    this._path = v;
  }
  //#endregion
}