import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../core/base.component';
import { CareerStation } from '../../../models/career-station.interface';

@Component({
  selector: 'career-station-info',
  templateUrl: './career-station-info.component.html',
  styleUrls: ['./career-station-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CareerStationInfoComponent extends BaseComponent {
  //#region Properties
  private _station: CareerStation;
  @Input()
  public get station(): CareerStation {
    return this._station;
  }
  public set station(v: CareerStation) {
    this._station = v;
  }
  //#endregion
}