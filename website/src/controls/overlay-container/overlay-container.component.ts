import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OverlayService } from '../../services/overlay-service';

@Component({
  selector: 'overlay-container',
  styleUrls: ['./overlay-container.component.scss'],
  templateUrl: './overlay-container.component.html',
  encapsulation: ViewEncapsulation.None
})
export class OverlayContainer implements AfterViewInit {
  //#region Properties
  private _contentContainer: HTMLElement;
  @Input()
  public get contentContainer(): HTMLElement {
    return this._contentContainer;
  }
  public set contentContainer(v: HTMLElement) {
    this._contentContainer = v;
  }
  //#endregion

  //#region Ctor
  public constructor(
    private readonly _overlayService: OverlayService,
    @Inject(DOCUMENT) private readonly _document: Document) { }
  //#endregion

  //#region Public Methods
  public ngAfterViewInit() {
    this._contentContainer.classList.add('overlay-container__content');
    this._overlayService.overlayActive
      .subscribe(overlayOptions => {
        const activeClass = 'overlay-container__content--overlay-active';
        overlayOptions
          ? this._contentContainer.classList.add(activeClass)
          : this._contentContainer.classList.remove(activeClass)
      } );

    fromEvent(this._document, 'keyup')
      .pipe(map(ev => ev as KeyboardEvent))
      .pipe(filter(ev => ev.key === 'Escape'))
      .subscribe(() => this._overlayService.hideOverlay());
  }
  //#endregion
}