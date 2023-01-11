import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from './password-validators';
import { UserRegistrationService } from './user-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JwtService } from '../@services/jwt.service';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'mgd-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  public userRegisterForm!: FormGroup;
  public loading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userRegistrationService: UserRegistrationService,
    private jwtService: JwtService,
    private snackbarService: SnackbarService) { }

  get fullName(): FormControl {
    return this.userRegisterForm.get('fullName') as FormControl;
  }

  get password(): FormControl {
    return this.userRegisterForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.userRegisterForm.get("confirmPassword") as FormControl;
  }

  ngOnInit(): void {
    this.userRegisterForm = new FormGroup({
      'fullName': new FormControl(null, Validators.required),
      'password': new FormControl(null,
        [
          Validators.required,
          Validators.minLength(8),
          PasswordValidators.patternValidator(/\d/, { hasNumber: true }),
          PasswordValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true })
        ]),
      'confirmPassword': new FormControl(null, Validators.required)
    },
      // @ts-ignore
      this.passwordMatchValidator
    );
  }

  public onSendUserRegistration() {
    const token = this.route.snapshot.queryParams['token'];
    const {fullName, password} = this.userRegisterForm.value;

    if (!token || !fullName || !password) {
      return;
    }

    this.userRegistrationService
      .userRegistration(token, fullName, password)
        .subscribe((response: HttpResponse<any>) => {
          this.jwtService.setToken(response.body.token);
          this.router.navigate(['/sign-in']);
          this.snackbarService.success('Successful registration, please login to use MAGDA');
        },
          (e: HttpErrorResponse) => {
            if (e.status === 200) {
              this.router.navigate(['/sign-in']);
              this.snackbarService.success('Successful registration, please login to use MAGDA');
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
