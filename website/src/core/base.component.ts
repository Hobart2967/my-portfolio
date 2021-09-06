import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({ template: ''})
export class BaseComponent implements OnDestroy {
  //#region Private Fields
  private _subscriptions: Subscription[] = [];
  //#endregion

  //#region Public Methods
  /**
   * Remembers a subscription registered and cleans it on component destruction
   *
   * @param subscription The subscription to remember
   */
  public rememberSubscriptions(...subscription: Subscription[]) {
    this._subscriptions.push(...subscription);
  }

  /**
   * Cleans up all subscriptions.
   */
  public ngOnDestroy(): void {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }

    this._subscriptions = null;
  }
  //#endregion

}