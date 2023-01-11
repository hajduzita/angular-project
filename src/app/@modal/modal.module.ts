import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalsComponent } from './modals/modals.component';
import { ModalsDirective } from './modals/modals.directive';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';
import { ModalConfig } from './modal.config';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [
    ModalsComponent,
    ModalsDirective,
    ConfirmComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    ModalService
  ],
  exports: [
    ModalComponent
  ],
  entryComponents: [
    ConfirmComponent
  ]
})
export class ModalModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas)
  }

  static forRoot(config: ModalConfig) {
    return {
      ngModule: ModalModule,
      providers: [
        {
          provide: ModalConfig,
          useValue: config
        }
      ]
    };
  }
}
