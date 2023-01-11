import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../@services/auth.service';
import { JwtService } from '../@services/jwt.service';
import { Role } from '../../@models/roles';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'mgd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInForm!: FormGroup;
  public loading!: boolean;
  public isLoginError: boolean = false;
  public isInactiveUser: boolean = false;

  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private snackbarService: SnackbarService) {
  }

  get email(): FormControl {
    return this.signInForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  public onSignIn(): void {
    /*this.jwtService.getUserRole();
    console.log('ole',  this.jwtService.getUserRole())*/
    this.loading = true;
    this.authService
      .signIn(this.signInForm.value)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response: HttpResponse<any>) => {
          this.jwtService.setToken(response.body.token);
          if (
            this.jwtService.getUserRole().includes(Role.ANNOTATOR) ||
            this.jwtService.getUserRole().includes(Role.REVIEWER) ||
            this.jwtService.getUserRole().includes(Role.SUPERVISOR)) {
              this.router.navigate(['/worklist'])
          } else {
            this.router.navigate(['/user-list'])
          }
        },
        (e: HttpErrorResponse) => {
          if (e.status === 404) {
            this.snackbarService.error('Invalid email or password')
            this.isLoginError = true;
            this.router.navigate(['/sign-in']);
          }
          if (e.status === 409) {
            this.snackbarService.error('User is inactive')
            this.isInactiveUser = true;
            this.router.navigate(['/sign-in']);
          }
          if (e.status === 401) {
            this.snackbarService.error('Deleted user')
            this.isInactiveUser = true;
            this.router.navigate(['/sign-in']);
          }
          console.log(e)
        }
      )
  }

}
