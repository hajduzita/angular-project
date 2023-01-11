import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mgdModals]'
})
export class ModalsDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
