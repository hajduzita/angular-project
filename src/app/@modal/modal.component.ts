import { Component, OnInit } from '@angular/core';

import { ModalConfig } from './modal.config';
import { ModalInterface } from './modal.interface';
import { ModalService } from './modal.service';

@Component({
  selector: 'mgd-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public config!: ModalConfig;
  public modal!: ModalInterface;

  constructor(
    config: ModalConfig,
    private modalService: ModalService) {
    this.config = config;
  }

  ngOnInit(): void {

    this.modalService.modal$
      .subscribe(
        (modal: ModalInterface) => {
          this.modal = modal;
          if (modal && modal.config) {
            this.config = modal.config;
          }
        },
        (error: any) => console.error(error),
        () => console.log('Complete')
      );

  }

}
