import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { SignInComponent } from './sign-in.component';
import { AuthService } from '../@services/auth.service';
import { JwtService } from '../@services/jwt.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  const authService = jasmine.createSpyObj('AuthService', ['signIn']);
  const jwtService = jasmine.createSpyObj('JwtService', ['setToken']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SignInComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authService
        },
        {
          provide: JwtService,
          useValue: jwtService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should call setToken method and allow the authenticated user to the welcome page', fakeAsync(() => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigate').and.stub();
    const token = 'abc123';
    const routeParams = ['/welcome'];
    const httpResponse: Pick<HttpResponse<any>, 'body'> = {
      body: {
        token: token
      }
    }
    const authServiceSignInFnSpy = authService.signIn.and.returnValue(of(httpResponse));
    const jwtServiceSetTokenFnSpy = jwtService.setToken;
    component.onSignIn();
    tick();
    expect(authServiceSignInFnSpy).toHaveBeenCalled();
    expect(jwtServiceSetTokenFnSpy).toHaveBeenCalledWith(token);
    expect(routerStub.navigate).toHaveBeenCalledWith(routeParams);
  }));

});
