import { Type } from '@angular/core';

export interface SnackbarInterface {
  message: string,
  timeout: boolean,
  component: Type<any>
}
