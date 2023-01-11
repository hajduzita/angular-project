import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { PasswordValidators } from '../../authentication/user-registration/password-validators';
import { MyProfileService } from './my-profile.service';
import { IApiUserData } from '../../@interfaces/api-user-data.interface';
import { JwtService } from '../../authentication/@services/jwt.service';
import { PasswordService } from '../../authentication/@services/password.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'mgd-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public changePasswordForm!: FormGroup;
  public onChangeDataForm!: FormGroup;
  public loading!: boolean;
  public roles!: {id: number, authority: string}[];
  public userData!: IApiUserData;
  public isAdminOrSupervisorosSuperadmin!: boolean;

  constructor(
    private myProfileService: MyProfileService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService) { }

  get fullName(): FormControl {
    return this.onChangeDataForm.get('fullName') as FormControl;
  }

  get email(): FormControl {
    return this.onChangeDataForm.get('email') as FormControl;
  }

  get roleId(): FormControl {
    return this.onChangeDataForm.get('roleId') as FormControl;
  }

  get password(): FormControl {
    return this.changePasswordForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.changePasswordForm.get('confirmPassword') as FormControl;
  }

  ngOnInit(): void {

    this.myProfileService
      .getUserData()
      .subscribe((user: IApiUserData) => {
        this.userData = user;
        user.role.id === 4 || user.role.id === 5 || user.role.id === 6 ?
          this.isAdminOrSupervisorosSuperadmin = true :
          this.isAdminOrSupervisorosSuperadmin = false;
        this.onChangeDataForm.setValue({
          email:user.email,
          fullName: user.fullName,
          roleId: user.role.id
        })
      },
        (e: HttpErrorResponse) => {
        if (e.status === 404) {
          this.snackbarService.error('User\'s email address is not found')
        }
        })

    this.roles = [
      {
        id: 1,
        authority: 'Segmenter'
      },
      {
        id: 2,
        authority:'Annotator'
      },
      {
        id: 3,
        authority: 'Reviewer'
      },
      {
        id: 4,
        authority:'Supervisor'
      },
      {
        id : 5,
        authority: 'Administrator'
      },
      {
        id: 6,
        authority: 'Superadmin'
      }
    ];

    this.onChangeDataForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      fullName: new FormControl(null, Validators.required),
      roleId: new FormControl(null),
    })

    this.changePasswordForm = new FormGroup({
      password: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(8),
          PasswordValidators.patternValidator(/\d/, { hasNumber: true }),
          PasswordValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true })
        ]),
      confirmPassword: new FormControl(null, Validators.required)
    },
      // @ts-ignore
      this.passwordMatchValidator)
  }

  public onChangeData(){
    const uuid = this.jwtService.getUserUuid();
    this.loading = true;
    this.myProfileService
      .changeUserData(this.email.value, this.fullName.value, uuid, this.roleId.value)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((v) => {
        this.snackbarService.success('Data updated');
        console.log(v)
      },
        (e: HttpErrorResponse) => {
          if (e.status === 401) {
            this.snackbarService.error('Unsuccessful, user is unauthorized')
            console.log(e)
          }
          if (e.status === 404) {
            this.snackbarService.error('Unsuccessful, user\'s UUID is not found')
            console.log(e)
          }
        })
  }

  public onChangePassword() {
    const uuid = this.jwtService.getUserUuid();
    this.loading = true;
    const token = this.route.snapshot.queryParams['token'];
    this.myProfileService
      .changeUserData(this.email.value, this.fullName.value, uuid, this.roleId.value, this.password.value)
      .pipe(
        finalize(() => {this.loading = false;})
      )
      .subscribe(
        (v) => {
          this.snackbarService.success('Your password updated!');
          console.log(v)
        },
        (e: HttpErrorResponse) => {
          this.snackbarService.error('Unsuccessful password update')
          console.log(e)
        }
      )
  }

  private passwordMatchValidator(form: FormGroup): {mismatch: boolean} | null {
    return form.get('password')!.value !== form.get('confirmPassword')!.value ? {mismatch: true} : null;
  }

}
