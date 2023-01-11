import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { ModalInterface } from '../modal.interface';
import { ModalsDirective } from './modals.directive';
import { ModalService } from '../modal.service';

@Component({
  selector: 'mgd-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {


  @ViewChild(ModalsDirective, { static: true }) modalDirective!: ModalsDirective;
  @Input() modal!: ModalInterface;

  constructor(
    private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.modal.component);
    const viewContainerRef = this.modalDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const componentInstance = (<any>componentRef.instance);
    componentInstance.input = this.modal.input;
    componentInstance.response = this.modal.response;
    componentInstance.config = this.modal.config;
    componentInstance.close.subscribe(() => this.modalService.close());

  }

}
