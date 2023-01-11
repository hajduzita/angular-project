import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtService } from '../../authentication/@services/jwt.service';
import { AuthService } from '../../authentication/@services/auth.service';
import { Role } from '../../@models/roles';
import { MyProfileService } from '../my-profile/my-profile.service';
import { IApiUserData } from '../../@interfaces/api-user-data.interface';

@Component({
  selector: 'mgd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private token: string = this.jwtService.getToken();
  public userEmail!: string | null;
  public isUserListPermission!: boolean | null;
  public isWorklistPermission!: boolean | null;
  public isStatisticsPermission!: boolean | null;
  public isAnnotationPermission!: boolean | null;
  public userName!: string;

  constructor(
    private router: Router,
    private jwtService: JwtService,
    public authService: AuthService,
    public myProfileService: MyProfileService) { }

  ngOnInit(): void {
    this.myProfileService.getUserData().subscribe((user: IApiUserData) => {
      let name = user.fullName.split(' ')
      this.userName = name[name.length-1];
    })

    this.jwtService.decodeToken(this.token);
    this.userEmail = this.jwtService.getUserEmail();

    this.isUserListPermission =
      this.jwtService.getUserRole()?.includes(Role.ADMINISTRATOR)
      || this.jwtService.getUserRole()?.includes(Role.SUPERADMIN)
      || this.jwtService.getUserRole()?.includes(Role.SUPERVISOR);

    this.isWorklistPermission = !this.jwtService.getUserRole()?.includes(Role.ADMINISTRATOR);

    this.isStatisticsPermission =
      this.jwtService.getUserRole()?.includes(Role.SUPERVISOR)
      || this.jwtService.getUserRole()?.includes(Role.SUPERADMIN);

    this.isAnnotationPermission =
      this.jwtService.getUserRole()?.includes(Role.ANNOTATOR)
      || this.jwtService.getUserRole()?.includes(Role.REVIEWER)
      || this.jwtService.getUserRole()?.includes(Role.SUPERADMIN)
      || this.jwtService.getUserRole()?.includes(Role.SUPERVISOR);
  }

  public onLogout(): void {
    this.authService.signOut(this.token);
    this.router.navigate(['/sign-in']);
    this.jwtService.logoutUser();
  }

}
