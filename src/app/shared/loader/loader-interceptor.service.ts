import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import {HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import {finalize, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {

  private requests: number = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.requests === 0) {
      this.loaderService.start();
    }

    this.requests++;

    return next.handle(request)
      .pipe(
        finalize(() => {
          this.requests--;
          if (this.requests === 0) {
            this.loaderService.stop();
          }
        })
      );
  }
}
