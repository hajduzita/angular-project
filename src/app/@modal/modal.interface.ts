import { Type } from '@angular/core';
import { ModalConfig } from './modal.config';

export interface ModalInterface {
  component: Type<any>,
  input?: any,
  response?: (answer: any) => void,
  config?: ModalConfig
}
