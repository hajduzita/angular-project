import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { IApiUserList } from '../@interfaces/api-user-list.interface';
import { UserListService } from './user-list.service';
import { JwtService } from '../authentication/@services/jwt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from '../@modal/modal.service';
import { SnackbarService } from '../shared/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mgd-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: IApiUserList[] | null = [];
  public userRole!: string[] | null;
  public loading!: boolean;
  public user!: IApiUserList;

  constructor(
    private userListService: UserListService,
    public jwtService: JwtService,
    private modalService: ModalService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {

    this.userListService
      .userList()
      .subscribe((userArray: IApiUserList[]) => {
        console.log(userArray)
        this.users = userArray;
      })
  }

  public onOpenUserProfile(uuid: string) {
    this.router.navigate([`/user/${uuid}`])
  }

  public onChangeUserActivity(email: string, active: boolean) {
    this.loading = true;
    this.userListService
      .changeActivity(email, !active)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(() => {},
        (e: HttpErrorResponse) => {
        if (e.status === 200) {
          this.snackbarService.success('Active status has been changed successfully');
        }
        if (e.status === 404) {
          this.snackbarService.error('User\'s email address is not found');
        }
      })
  }

  public onDeleteUser(uuid: string, name: string) {
    this.modalService
      .confirm(
        'Are you sure, you want to delete the user?',
        (answer: boolean) => {
          if (answer) {
            this.userListService
              .deleteUser(uuid)
              .subscribe(
                () => {},
                (e: HttpErrorResponse) => {
                  if (e.status === 200) {
                    if (!this.users) {
                      return;
                    }
                    this.snackbarService.success(`${name}: User deleted`);
                    this.users = this.users.filter((user: IApiUserList) => user.uuid !== uuid)
                  }
                  if (e.status === 404) {
                    this.snackbarService.error(`${name}: User ID is not found`);
                  }
                })
          }
        }
      )
  }

}
