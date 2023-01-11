import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './authentication/auth.guard';
import { AuthService } from './authentication/@services/auth.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { TokenInterceptorService } from './authentication/token-interceptor.service';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { JwtService } from './authentication/@services/jwt.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { WorklistComponent } from './worklist/worklist.component';
import { InviteUserComponent } from './user-list/invite-user/invite-user.component';
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { UserRegistrationComponent } from './authentication/user-registration/user-registration.component';
import { PasswordStrengthMeterDirective } from './authentication/user-registration/password-strength-meter.directive';
import { SnackbarModule } from './shared/snackbar/snackbar.module';
import { MyProfileComponent } from './shared/my-profile/my-profile.component';
import { NewPasswordComponent } from './authentication/new-password/new-password.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AnnotationComponent } from './annotation/annotation.component';
import { UserProfileComponent } from './user-list/user-profile/user-profile.component';
import { ModalModule } from './@modal/modal.module';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoaderModule } from './shared/loader/loader.module';
//import { far } from '@fortawesome/free-regular-svg-icons';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    SignInComponent,
    WelcomeComponent,
    NavbarComponent,
    UserListComponent,
    WorklistComponent,
    InviteUserComponent,
    PasswordResetComponent,
    UserRegistrationComponent,
    PasswordStrengthMeterDirective,
    MyProfileComponent,
    NewPasswordComponent,
    StatisticsComponent,
    AnnotationComponent,
    UserProfileComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ModalModule.forRoot({
      schema: 'dark'
    }),
    SnackbarModule,
    LoaderModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  JwtService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas)
  }
}
