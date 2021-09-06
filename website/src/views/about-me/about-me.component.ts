import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { stations } from '../../configuration/stations';
import { CareerStation } from '../../models/career-station.interface';
import { NavigationMemoryService } from '../../services/navigation-memory.service';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutMeComponent implements OnInit {
  //#region Properties
  public get stations(): CareerStation[] {
    return stations;
  }

  private _wasOpened: boolean;
  public get wasOpened(): boolean {
    return this._wasOpened;
  }
  public set wasOpened(v: boolean) {
    this._wasOpened = v;
  }

  //#endregion

  //#region Ctor
  public constructor(private readonly _navigationMemoryService: NavigationMemoryService) { }
  //#endregion

  //#region Public Methods
  public ngOnInit() {
    this._wasOpened = this._navigationMemoryService.wasOpened('about-me');
  }
  //#endregion
}