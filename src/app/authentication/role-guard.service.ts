import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from './@services/auth.service';
import { JwtService } from './@services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(
    public authService: AuthService,
    public router: Router,
    public jwtService: JwtService) { }

    public isAuthorized!: boolean;

  canActivate(route: ActivatedRouteSnapshot): boolean {

    this.jwtService.getUserRole()
      .map((role) => {
        this.isAuthorized = route.data['expectedRole'].includes(role);
      })

    if (this.isAuthorized) {
      return true;
    }
    else {
      this.router.navigate(['/welcome']);
      return false;
    }

  }
}
