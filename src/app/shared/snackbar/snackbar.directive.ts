import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mgdSnackbar]'
})
export class SnackbarDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
