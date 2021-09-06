import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class OverlayService {
  //#region Properties
  private _overlayActive : BehaviorSubject<any> = new BehaviorSubject(null);
  public get overlayActive() : Observable<any> {
    return this._overlayActive.asObservable();
  }
  //#endregion

  //#region Public Methods
  public showOverlay() {
    this._overlayActive.next(!this._overlayActive.value);
  }

  public hideOverlay(): void {
    this._overlayActive.next(null);
  }
  //#endregion
}