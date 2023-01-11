import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from "./loader.component";
import {LoaderService} from "./loader.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoaderInterceptorService} from "./loader-interceptor.service";



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    LoaderService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ]
})
export class LoaderModule { }
