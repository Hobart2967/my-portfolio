import { Injectable, Type } from '@angular/core';
import { ModalComponent } from '../controls/modal/modal.component';
import { ModalOptions } from '../controls/modal/models/modal-options.interface';
import { BaseComponent } from '../core/base.component';
import { OverlayService } from './overlay.service';

@Injectable()
export class ModalService {
  //#region Ctor
  public constructor(private readonly _overlayService: OverlayService) { }
  //#endregion

  //#region Public Methods
  public openModal<TComponent extends BaseComponent>(modalOptions: ModalOptions<TComponent>) {
    this._overlayService.showOverlay({
      content: ModalComponent,
      data: modalOptions
    })
  }

  public closeModal(modal: ModalComponent) {
    this._overlayService.hideOverlay(modal);
  }
  //#endregion
}