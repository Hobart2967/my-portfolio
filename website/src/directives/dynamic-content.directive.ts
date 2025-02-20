import { DOCUMENT } from '@angular/common';
import { Directive, ViewContainerRef, ComponentFactoryResolver, Type, Inject, ComponentRef } from '@angular/core';
import { BaseComponent } from '../core/base.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dynamic-content]',
  exportAs: 'dynamicContent'
})
export class DynamicContentDirective {
  //#region Ctor
  public constructor(
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private readonly _document: Document) {
  }
  //#endregion

  //#region Public Methods
  public async add<TComponent extends BaseComponent>(item: Type<TComponent>): Promise<ComponentRef<TComponent>> {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(item);

    return new Promise((resolve, reject) =>
      this._document.defaultView.setTimeout(() => {
        try {
          resolve(this._viewContainerRef.createComponent(componentFactory));
        } catch(err) {
          reject(err);
        }
      }));
  }

  public remove(content: ComponentRef<BaseComponent>) {
    content.destroy();
  }
  //#endregion
}