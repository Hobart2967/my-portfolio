import { AfterViewInit, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { DynamicContentDirective } from '../../directives/dynamic-content.directive';
import { OverlayHostedControl } from '../overlay-container/models/overlay-hosted-control.model';
import { ModalOptions } from './models/modal-options.interface';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent extends BaseComponent implements OverlayHostedControl, AfterViewInit {
  //#region Properties
  @ViewChild('dynamicContent', { read: DynamicContentDirective })
  public dynamicContent: DynamicContentDirective

  private _options: ModalOptions<BaseComponent>;
  @Input()
  public get options(): ModalOptions<BaseComponent> {
    return this._options;
  }
  public set options(v: ModalOptions<BaseComponent>) {
    this._options = v;
  }
  //#endregion

  //#region Public Methods
  public ngAfterViewInit(): void {
    if (!this._options) {
      return;
    }

    this.dynamicContent.add(this._options.modalContent);
  }
  //#endregion

}