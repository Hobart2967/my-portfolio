import { Type } from '@angular/core';
import { BaseComponent } from '../../../core/base.component';

export interface OverlayOptions<TContent extends BaseComponent> {
  content: Type<TContent>;
  data?: any;
}