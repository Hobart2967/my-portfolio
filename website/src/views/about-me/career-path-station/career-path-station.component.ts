import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CareerStation } from '../../../models/career-station.interface';
import { OverlayService } from '../../../services/overlay-service';

@Component({
  selector: 'career-path-station',
  templateUrl: './career-path-station.component.html',
  styleUrls: ['./career-path-station.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CareerPathStation {
  //#region Properties
  private _showImmediately: boolean;
  @Input()
  public get showImmediately(): boolean {
    return this._showImmediately;
  }
  public set showImmediately(v: boolean) {
    this._showImmediately = v;
  }


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

  //#region Ctor
  public constructor(private readonly _overlayService: OverlayService) { }
  //#endregion

  //#region Public Methods
  public openStationInfoModal() {
    this._overlayService.showOverlay();
  }
  //#endregion
}