import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loading$: Subject<boolean> = new Subject();

  public start(): void {
    this.loading$.next(true);
  }

  public stop(): void {
    this.loading$.next(false);
  }
}
