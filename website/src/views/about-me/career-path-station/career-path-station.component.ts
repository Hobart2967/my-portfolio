import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CareerStation } from '../../../models/career-station.interface';
import { ModalService } from '../../../services/modal.service';
import { CareerStationInfoComponent } from '../career-station-info/career-station-info.component';

@Component({
  selector: 'career-path-station',
  templateUrl: './career-path-station.component.html',
  styleUrls: ['./career-path-station.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('grow', [
      state(
        "void",
        style({
          height: "0px",
          overflow: "hidden"
        })
      ),
      //element being added into DOM.
      transition(":enter", [
        animate(
          "500ms ease-in-out",
          style({
            height: "*",
            overflow: "hidden"
          })
        )
      ]),
      //element being removed from DOM.
      transition(":leave", [
        animate(
          "500ms ease-in-out",
          style({
            height: "0px",
            overflow: "hidden"
          })
        )
      ]),
    ])
  ]
})
export class CareerPathStation {
  //#region Properties
  @ViewChild('mainDiv', { static: true})
  public mainDiv: ElementRef;

  private _showImmediately: boolean;
  @Input()
  public get showImmediately(): boolean {
    return this._showImmediately;
  }
  public set showImmediately(v: boolean) {
    this._showImmediately = v;
  }


  private _station: CareerStation;
  @Input()
  public get station(): CareerStation {
    return this._station;
  }
  public set station(v: CareerStation) {
    this._station = v;
  }

  private _path: HTMLElement;
  @Input()
  public get path(): HTMLElement {
    return this._path;
  }
  public set path(v: HTMLElement) {
    this._path = v;
  }

  private _isHovered: Observable<boolean>;
  public get isHovered(): Observable<boolean> {
    return this._isHovered;
  }
  public set isHovered(v: Observable<boolean>) {
    this._isHovered = v;
  }

  private _isDetailsHovered: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean);
  public get isDetailsHovered(): BehaviorSubject<boolean> {
    return this._isDetailsHovered;
  }
  public setIsDetailsHovered(v: boolean) {
    this._isDetailsHovered.next(v);
  }

  private _isBulletHovered: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean);
  public get isBulletHovered(): BehaviorSubject<boolean> {
    return this._isBulletHovered;
  }
  public setIsBulletHovered(v: boolean) {
    this._isBulletHovered.next(v);
  }

  //#endregion

  //#region Ctor
  public constructor(
    private readonly _modalService: ModalService) {
    this._isHovered = combineLatest([this._isBulletHovered, this._isDetailsHovered])
      .pipe(map(hovers => hovers.some(x => !!x)));
  }
  //#endregion

  //#region Public Methods
  @HostListener('window:scroll', ['$event'])
  @HostListener('window:wheel', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  public onWindowScroll($event: Event) {
    if (!window.matchMedia('(max-width: 768px)').matches) {
      return;
    }

    if (!this.mainDiv) {
      return;
    }

    const clientRect = this.mainDiv.nativeElement.getBoundingClientRect();
    if (clientRect.top < 140 && clientRect.top > 10) {
      this.setIsDetailsHovered(true);
    } else {
      this.setIsDetailsHovered(false);
    }
  }

  public openStationInfoModal() {
    this._modalService.openModal({
      modalContent: CareerStationInfoComponent,
      title: this.station.job,
      data: {
        station: this.station
      }
    });
  }
  //#endregion
}