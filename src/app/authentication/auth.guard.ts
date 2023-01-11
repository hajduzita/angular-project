import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { JwtService } from './@services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtService: JwtService) {
  }

  canActivate(): boolean {
    if (this.jwtService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }

}
