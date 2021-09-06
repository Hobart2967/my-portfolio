import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable()
export class NavigationMemoryService {
  //#region Private Fields
  private readonly _pageWasOpened: Map<string, boolean> = new Map();
  //#endregion

  //#region Public Methods
  public wasOpened(pageName: string): boolean {
    this._pageWasOpened.set(pageName, true);

    if (this._pageWasOpened.has(pageName)) {
      return false;
    }

    return true;
  }
}