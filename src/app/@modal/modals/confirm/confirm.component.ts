import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalConfig } from '../../modal.config';

@Component({
  selector: 'mgd-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  @Input() input!: string;
  @Input() response!: (answer: boolean) => void;
  @Input() config!: ModalConfig;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  public confirmed!: boolean;

  get message(): string {
    return this.input;
  }

  public onAccept(): void {
    this.response(true);
    this.close.emit();
  }

  public onDecline(): void {
    this.response(false);
    this.close.emit();
  }

}
