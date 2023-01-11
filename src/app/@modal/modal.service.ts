import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalConfig } from './modal.config';
import { ModalInterface } from './modal.interface';
import { ConfirmComponent } from './modals/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modal$ = new Subject<ModalInterface>()

  public confirm(
    message: string,
    response: (answer: boolean) => void,
    config: ModalConfig = {schema: 'light', buttonLabels: ['Accept', 'Reject'], softConfirm: false}): void {
    console.log('confirm')
    this.modal$.next(<ModalInterface>{
      component: ConfirmComponent,
      input: message,
      response: response,
      config: config});
  }

  public close(): void {
    // @ts-ignore
    this.modal$.next();
  }
}
