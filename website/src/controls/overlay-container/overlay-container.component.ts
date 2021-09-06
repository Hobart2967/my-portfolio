import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseComponent } from '../../core/base.component';
import { branch } from '../../core/util/branch';
import { DynamicContentDirective } from '../../directives/dynamic-content.directive';
import { OverlayService } from '../../services/overlay.service';
import { OverlayHostedControl } from './models/overlay-hosted-control.model';
import { OverlayOptions } from './models/overlay-options.model';

@Component({
  selector: 'overlay-container',
  styleUrls: ['./overlay-container.component.scss'],
  templateUrl: './overlay-container.component.html',
  encapsulation: ViewEncapsulation.None
})
export class OverlayContainer extends BaseComponent implements AfterViewInit {
  //#region Constants
  public static readonly CLASS_OVERLAY_ACTIVE  = 'overlay-container__content--overlay-active';
  //#endregion

  //#region Properties
  @ViewChild('dynamicContent')
  public dynamicContent: DynamicContentDirective;

  private _contentContainer: HTMLElement;
  @Input()
  public get contentContainer(): HTMLElement {
    return this._contentContainer;
  }
  public set contentContainer(v: HTMLElement) {
    this._contentContainer = v;
  }

  private _overlayActive: Observable<any>;
  public get overlayActive$(): Observable<any> {
    return this._overlayActive;
  }
  public set overlayActive$(v: Observable<any>) {
    this._overlayActive = v;
  }
  //#endregion

  //#region Ctor
  public constructor(
    private readonly _overlayService: OverlayService,
    @Inject(DOCUMENT) private readonly _document: Document) { super(); }
  //#endregion

  //#region Public Methods
  public ngAfterViewInit() {
    this._contentContainer.classList.add('overlay-container__content');
    this.overlayActive$ = this._overlayService.overlayActive;

    this.rememberSubscriptions(
      ...branch(this.overlayActive$,

        active => active
          .pipe(filter(options => !options))
          .subscribe(() =>
            this.closeOverlay()),

        active => active
          .pipe(filter(options => !!options))
          .subscribe((options) =>
            this.openOverlay(options))),

      fromEvent(this._document, 'keyup')
        .pipe(map(ev => ev as KeyboardEvent))
        .pipe(filter(ev => ev.key === 'Escape'))
        .subscribe(() => this._overlayService.hideOverlay()));

  }
  //#endregion

  //#region Private Methods
  private async openOverlay<TContent extends BaseComponent>(options: OverlayOptions<TContent>): Promise<void> {
    this._contentContainer.classList.add(OverlayContainer.CLASS_OVERLAY_ACTIVE);
    const contentComponent = await this.dynamicContent.add<BaseComponent>(options.content) as unknown as OverlayHostedControl;
    contentComponent.options = options.data;
  }

  private closeOverlay(): void {
    this._contentContainer.classList.remove(OverlayContainer.CLASS_OVERLAY_ACTIVE)
  }
  //#endregion
}