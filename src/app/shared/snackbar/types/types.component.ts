import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SnackbarDirective } from '../snackbar.directive';
import { SnackbarInterface } from '../snackbar.interface';

@Component({
  selector: 'mgd-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  @ViewChild(SnackbarDirective, { static: true }) snackbarDirective!: SnackbarDirective;
  @Input() snackbar!: SnackbarInterface;
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  private timeout!: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.snackbar.component);
    const viewContainerRef = this.snackbarDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance).message = this.snackbar.message;
    (<any>componentRef.instance).timeout = this.snackbar.timeout;
    (<any>componentRef.instance).clear = () => clearTimeout(this.timeout);

    if (this.snackbar.timeout) {
      this.timeout = setTimeout(
        () => this.remove.emit(this.snackbar),
        5000);
    }
  }

}
