import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WelcomeComponent } from './welcome.component';
import { AuthService } from '../../authentication/@services/auth.service';
import { JwtService } from '../../authentication/@services/jwt.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  const authService = jasmine.createSpyObj('AuthService', ['signIn']);
  const jwtService = jasmine.createSpyObj('JwtService', ['setToken']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WelcomeComponent
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
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
