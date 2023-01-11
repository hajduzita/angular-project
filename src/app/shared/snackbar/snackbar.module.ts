import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { TypesComponent } from './types/types.component';
import { SuccessComponent } from './types/success/success.component';
import { SnackbarDirective } from './snackbar.directive';
import { SnackbarService } from './snackbar.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ErrorComponent } from './types/error/error.component';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    SnackbarComponent,
    TypesComponent,
    SuccessComponent,
    SnackbarDirective,
    ErrorComponent,
  ],
  providers: [
    SnackbarService
  ],
  exports: [
    SnackbarComponent
  ],
  entryComponents: [
    SuccessComponent
  ]
})

export class SnackbarModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas)
  }
}
