import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AuthGuard } from './authentication/auth.guard';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { UserListComponent } from './user-list/user-list.component';
import { WorklistComponent } from './worklist/worklist.component';
import { RoleGuardService } from './authentication/role-guard.service';
import { Role } from './@models/roles';
import { InviteUserComponent } from "./user-list/invite-user/invite-user.component";
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { UserRegistrationComponent } from './authentication/user-registration/user-registration.component';
import { MyProfileComponent } from './shared/my-profile/my-profile.component';
import { NewPasswordComponent } from './authentication/new-password/new-password.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AnnotationComponent } from './annotation/annotation.component';
import { UserProfileComponent } from './user-list/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-list',
    component: UserListComponent,
   /* canActivate: [AuthGuard, RoleGuardService],
    data: {
      expectedRole: [Role.SUPERVISOR, Role.ADMINISTRATOR, Role.SUPERADMIN]
    }*/
  },
  {
    path: 'worklist',
    component: WorklistComponent,
    /*canActivate: [AuthGuard, RoleGuardService],
    data: {
      expectedRole: [Role.SEGMENTER, Role.ANNOTATOR, Role.SUPERVISOR, Role.SUPERADMIN]
    }*/
  },
  {
    path: 'new-user',
    component: InviteUserComponent,
    /*canActivate: [AuthGuard, RoleGuardService],
    data: {
      expectedRole: [Role.SUPERVISOR, Role.ADMINISTRATOR, Role.SUPERADMIN]
    }*/
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'registration',
    component: UserRegistrationComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'forgotten-password',
    component: NewPasswordComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    /*canActivate: [AuthGuard, RoleGuardService],
    data: {
      expectedRole: [Role.SUPERVISOR, Role.SUPERADMIN]
    }*/
  },
  {
    path: 'annotation',
    component: AnnotationComponent,
    /*canActivate: [AuthGuard, RoleGuardService],
    data: {
      expectedRole: [Role.ANNOTATOR, Role.REVIEWER, Role.SUPERVISOR, Role.SUPERADMIN]
    }*/
  },
  {
    path: 'user/:uuid',
    component: UserProfileComponent,
    /*canActivate: [AuthGuard, RoleGuardService],
    data: {
      expectedRole: [Role.ADMINISTRATOR, Role.SUPERVISOR, Role.SUPERADMIN]
    }*/
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
