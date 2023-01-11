import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'mgd-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  @Input() message!: string;
  @Input() timeout!: boolean;
  @Input() clear!: () => void;

  @HostListener('mouseenter') onClearTimeout() {
    this.timeout = false;
    this.clear();
  }

}
