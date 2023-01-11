import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from '../user-registration/password-validators';
import { PasswordService } from '../@services/password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'mgd-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  public newPasswordFrom!: FormGroup;
  public loading!: boolean;

  constructor(
    private passworResetService: PasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService) { }

  get password(): FormControl {
    return this.newPasswordFrom.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.newPasswordFrom.get("confirmPassword") as FormControl;
  }

  ngOnInit(): void {
    this.newPasswordFrom = new FormGroup({
      'password': new FormControl(null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/\d/),
          PasswordValidators.patternValidator(/\d/, { hasNumber: true }),
          PasswordValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true })
        ]),
      'confirmPassword': new FormControl(null, Validators.required)
    },
      // @ts-ignore
      this.passwordMatchValidator
    );
  }

  public onNewPassword() {
    this.loading = true;
    const token = this.route.snapshot.queryParams['token'];
    const {password} = this.newPasswordFrom.value;

    this.passworResetService
      .newPassword(token, password)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(() => {},
        (e: HttpErrorResponse) => {
        if (e.status === 200) {
          this.router.navigate(['/sign-in'])
          this.snackbarService.success('New password saved');
          console.log(e)
        }
          if (e.status === 401) {
            this.snackbarService.error('Token is expired')
            console.log(e)
          }
          if (e.status === 404) {
            this.snackbarService.error('Token is not found')
            console.log(e)
          }
          if (e.status === 409) {
            this.snackbarService.error('Token is already used')
            console.log(e)
          }
          if (e.status === 415) {
            this.snackbarService.error('Password doesn\'t match requirements')
            console.log(e)
          }
        })
  }

  private passwordMatchValidator(form: FormGroup): {mismatch: boolean} | null {
    return form.get('password')!.value !== form.get('confirmPassword')!.value ? {mismatch: true} : null;
  }

}
