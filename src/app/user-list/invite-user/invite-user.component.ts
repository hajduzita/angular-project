import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InviteUserService } from './invate-user.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'mgd-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  public inviteUserForm!: FormGroup;
  public loading!: boolean;
  public roles!: any;

  constructor(
    private inviteUserService: InviteUserService,
    public snackbarService: SnackbarService) { }

  get email(): FormControl {
    return this.inviteUserForm.get('email') as FormControl;
  }

  get roleId(): FormControl {
    return this.inviteUserForm.get('roleId') as FormControl;
  }

  ngOnInit(): void {
    this.inviteUserForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      roleId: new FormControl(null, Validators.required)
    });

    this.inviteUserService
      .getRoleList()
      .subscribe((roles) => {
        console.log('ez a roles', roles)
        this.roles = roles;
      });
  }


  public onSendRegistration(): void {
    this.loading = true;
    this.inviteUserService
      .inviteUser(this.inviteUserForm.value)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (response: HttpResponse<any>) => {
         console.log(response)
        },
        (e: HttpErrorResponse) => {
          if (e.status === 200) {
            this.snackbarService.success(`Registration email has been sent to ${this.inviteUserForm.value.email}`);
          }
          if (e.status === 404) {
            this.snackbarService.error('User\'s email address is not found')
            console.log(e)
          }
          if (e.status === 406) {
            this.snackbarService.error(`${this.inviteUserForm.value.email}Email address is already exist`)
            console.log(e)
          }
          if (e.status === 409) {
            this.snackbarService.error('Role is not found')
            console.log(e)
          }
          console.log(e);
        }

      )
  }

}
