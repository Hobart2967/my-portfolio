import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationMemoryService } from '../../services/navigation-memory.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  //#region Properties
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
    this._wasOpened = this._navigationMemoryService.wasOpened('home');
  }
  //#endregion
}