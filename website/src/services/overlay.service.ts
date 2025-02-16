import { ComponentRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayOptions } from '../controls/overlay-container/models/overlay-options.model';
import { BaseComponent } from '../core/base.component';

@Injectable()
export class OverlayService {
  //#region Private Fields
  private readonly _registeredOverlayItems: ComponentRef<BaseComponent>[] = [];
  //#endregion
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

  public hideOverlay(component: BaseComponent, destructionOperation?: Promise<void>): void {
    const index = this._registeredOverlayItems.findIndex(ref => ref.instance === component);
    if (index < 0) {
      return;
    }

    const componentRef = this._registeredOverlayItems[index];
    if(destructionOperation) {
      destructionOperation.then(() => componentRef.destroy());
    } else {
      componentRef.destroy();
    }

    this._registeredOverlayItems.splice(index, 1);
    if (this._registeredOverlayItems.length === 0) {
      this._overlayActive.next(null);
    }
  }

  public registerOverlayItem(componentRef: ComponentRef<BaseComponent>) {
    this._registeredOverlayItems.push(componentRef);
  }
  //#endregion
}