import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SnackbarInterface } from './snackbar.interface';
import { NavigationStart, Router } from '@angular/router';
import { SuccessComponent } from './types/success/success.component';
import { ErrorComponent } from './types/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private message = new Subject<SnackbarInterface>();
  private keepAfterRouteChange!: boolean;

  constructor(private router: Router) {
    router
      .events
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
            this.keepAfterRouteChange = false;
            return;
          }
          this.clear();
        }
      })
  }

  public success(message: string, keepAfterRouteChange: boolean = false, timeout: boolean = false): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.message.next(<SnackbarInterface>{message: message, timeout: timeout, component: SuccessComponent});
  }

  public error(message: string, keepAfterRouteChange: boolean = false, timeout: boolean = false): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.message.next(<SnackbarInterface>{message: message, timeout: timeout, component: ErrorComponent});
  }

  public getMessages(): Observable<any> {
    return this.message.asObservable();
  }

  private clear(): void {
    // @ts-ignore
    this.message.next();
  }
}
