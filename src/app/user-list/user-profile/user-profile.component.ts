import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IApiUserList } from "../../@interfaces/api-user-list.interface";
import { UserListService } from "../user-list.service";
import { MyProfileService } from '../../shared/my-profile/my-profile.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'mgd-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public users: IApiUserList[] | null = [];
  public user!: any;
  public editUserDataForm!: FormGroup;
  public loading!: boolean;
  public roles!: {id: number, authority: string}[];
  private uuid!: string | null;

  constructor(
    private userListService: UserListService,
    private route: ActivatedRoute,
    private myProfileService: MyProfileService,
    private snackbarService: SnackbarService) { }

  get fullName(): FormControl {
    return this.editUserDataForm.get('fullName') as FormControl;
  }

  get email(): FormControl {
    return this.editUserDataForm.get('email') as FormControl;
  }

  get currentRoleId(): FormControl {
    return this.editUserDataForm.get('currentRoleId') as FormControl;
  }

  get password(): FormControl {
    return this.editUserDataForm.get('password') as FormControl;
  }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.uuid = routeParams.get('uuid');

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
      }
    ];

    this.editUserDataForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      fullName: new FormControl(null, Validators.required),
      currentRoleId: new FormControl(null),
      password: new FormControl(null)
    })

    this.userListService
      .userList()
      .subscribe((userArray: IApiUserList[]) => {
        this.users = userArray;

        /*const routeParams = this.route.snapshot.paramMap;
        const uuid = routeParams.get('uuid');*/
        this.user = this.users?.filter((user: IApiUserList) => user.uuid === this.uuid);

        this.editUserDataForm.patchValue({
          email: this.user[0].email,
          fullName: this.user[0].fullName,
          currentRoleId: this.user[0].currentRoleId
        })
      })

  }

  public onChangeUserData() {
    /*const routeParams = this.route.snapshot.paramMap;
    const uuid = routeParams.get('uuid');*/
    if (!this.uuid) {
      return;
    }
    this.loading = true;
    this.myProfileService
      .changeUserData(this.email.value, this.fullName.value, this.uuid, this.currentRoleId.value, this.password.value)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((v) => {
          this.snackbarService.success('User data updated');
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

}
