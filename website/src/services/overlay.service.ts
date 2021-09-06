import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayOptions } from '../controls/overlay-container/models/overlay-options.model';
import { BaseComponent } from '../core/base.component';

@Injectable()
export class OverlayService {
  //#region Properties
  private _overlayActive : BehaviorSubject<OverlayOptions<BaseComponent>> = new BehaviorSubject(null);
  public get overlayActive() : Observable<OverlayOptions<BaseComponent>> {
    return this._overlayActive.asObservable();
  }
  //#endregion

  //#region Public Methods
  public showOverlay<TComponent extends BaseComponent>(options: OverlayOptions<TComponent>) {
    this._overlayActive.next(options);
  }

  public hideOverlay(): void {
    this._overlayActive.next(null);
  }
  //#endregion
}