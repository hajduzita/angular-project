import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mgd-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {

  @Input() message!: string;
  @Input() timeout!: boolean;
  @Input() clear!: () => void;

  @HostListener('mouseenter') onClearTimeout() {
    this.timeout = false;
    this.clear();
  }
}
