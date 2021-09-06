import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, Inject, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Observable, ReplaySubject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { BaseComponent } from '../../core/base.component';
import { DynamicContentDirective } from '../../directives/dynamic-content.directive';
import { ModalService } from '../../services/modal.service';
import { OverlayHostedControl } from '../overlay-container/models/overlay-hosted-control.model';
import { ModalOptions } from './models/modal-options.interface';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent extends BaseComponent implements OverlayHostedControl<ModalOptions<BaseComponent>>, AfterViewInit {
  //#region Properties
  @ViewChild('dynamicContent', { read: DynamicContentDirective })
  public dynamicContent: DynamicContentDirective

  private _content: ComponentRef<BaseComponent>;
  public get content(): ComponentRef<BaseComponent> {
    return this._content;
  }
  public set content(v: ComponentRef<BaseComponent>) {
    this._content = v;
  }

  private _isHiding: boolean = false;
  public get isHiding(): boolean {
    return this._isHiding;
  }
  public set isHiding(v: boolean) {
    this._isHiding = v;
  }

  private _options: ReplaySubject<ModalOptions<BaseComponent>> = new ReplaySubject();
  @Input()
  public get options$(): Observable<ModalOptions<BaseComponent>> {
    return this._options;
  }
  //#endregion

  //#region Ctor
  public constructor(
    private readonly _modalService: ModalService,
    @Inject(DOCUMENT) private readonly _document: Document) { super(); }
  //#endregion

  //#region Public Methods
  public registerOptions(modalOptions: ModalOptions<BaseComponent>) {
    this._options.next(modalOptions);
  }

  public async ngAfterViewInit(): Promise<void> {
    const options = await this.options$
      .pipe(filter(x => !!x))
      .pipe(take(1)).toPromise();

    if (!options) {
      this.closeModal();
      return;
    }

    this.rememberSubscriptions(fromEvent(this._document, 'keyup')
        .pipe(map(ev => ev as KeyboardEvent))
        .pipe(filter(ev => ev.key === 'Escape'))
        .subscribe(() => this.closeModal()));

    this._content = await this.dynamicContent.add(options.modalContent);
  }

  public async closeModal(): Promise<void> {
    if (this._content) {
      this.dynamicContent.remove(this._content);
    }

    this.isHiding = true;
    await new Promise<void>(resolve => this._document.defaultView.setTimeout(() => resolve(), 900));

    this._modalService.closeModal(this);
  }
  //#endregion
}