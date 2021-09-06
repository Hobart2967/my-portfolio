import { Type } from '@angular/core';
import { BaseComponent } from '../../../core/base.component';

export interface ModalOptions<TComponent extends BaseComponent> {
  modalContent: Type<TComponent>;
  data?: any;
  title?: string;
}
