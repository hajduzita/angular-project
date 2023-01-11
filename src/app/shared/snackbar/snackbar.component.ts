import { Component, OnInit } from '@angular/core';
import {SnackbarInterface} from "./snackbar.interface";
import {SnackbarService} from "./snackbar.service";

@Component({
  selector: 'mgd-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(private snackBarService: SnackbarService) { }

  public snackbars: SnackbarInterface[] = [];

  ngOnInit(): void {
    this.snackBarService
      .getMessages()
      .subscribe((snackbar: SnackbarInterface) => {
        if (!snackbar) {
          this.snackbars = [];
          return;
        }
        this.snackbars.push(snackbar)
      })
  }

  public onRemove(snackbar: SnackbarInterface): void {
    this.snackbars = this.snackbars.filter((s: SnackbarInterface) => s !== snackbar);
  }

}
