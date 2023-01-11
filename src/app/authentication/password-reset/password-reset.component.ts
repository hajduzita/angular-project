
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { PasswordService } from '../@services/password.service';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';


@Component({
  selector: 'mgd-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  public passwordResetForm!: FormGroup;
  public loading!: boolean;

  constructor(
    private passwordService: PasswordService,
    private router: Router,
    private snackbarService: SnackbarService) { }

  get email(): FormControl {
    return this.passwordResetForm.get('email') as FormControl;
  }

  ngOnInit(): void {
    this.passwordResetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }

  public onPasswordReset() {
    this.loading = true;
    this.passwordService
      .passwordReset(this.passwordResetForm.value)
      .pipe(
        finalize(() => {this.loading = false;})
      )
      .subscribe(
        () => {},
        (e: HttpErrorResponse) => {
          if (e.status === 200) {
            this.snackbarService.success('We have sent you an e-mail, please follow the instructions!');
            this.router.navigate(['/sign-in'])
          }
          if (e.status === 404) {
            this.snackbarService.error('User not found')
            console.log(e)
          }
          if (e.status === 409) {
            this.snackbarService.error('User is inactive')
            console.log(e)
          }

        }
      )
  }

}
