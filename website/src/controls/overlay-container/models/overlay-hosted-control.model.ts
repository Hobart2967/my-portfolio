import { Observable } from 'rxjs';

export interface OverlayHostedControl<T> {
  registerOptions(options: T): void;
}
