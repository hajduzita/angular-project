import { Injectable } from '@angular/core';

import { JwtTokenInterface } from '../../@interfaces/jwtToken.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private readonly key = 'token';

  constructor() {}

  // TYPE! public getToken(): string | null {
  public getToken(): any {
    return localStorage.getItem(this.key);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.key, token)
  }

  public logoutUser(): void {
    return localStorage.removeItem(this.key);
  }

  public isUserLoggedIn(): boolean {
    return !!localStorage.getItem(this.key);
  }

  public decodeToken(token: string): any {
    if (token === null) {
      return null;
    }
    const splitToken = token.split('.');
    const tokenPayload = splitToken[1];
    const decoded = this.b64DecodeUnicode(tokenPayload);
    return JSON.parse(decoded);
  }

  public getUserEmail(): string | null {
    return this.decodeToken(this.getToken()).sub;
    const token = this.getToken();
    const decodedToken = this.decodeToken(token);
    if (decodedToken === null || decodedToken.hasOwnProperty('sub')) {
      return null;
    }
    return decodedToken.sub;
  }

  public getUserRole(): string[] {
    return this.decodeToken(this.getToken()).roles;
    const token = this.getToken();
    const decodedToken = this.decodeToken(token);
    if (decodedToken === null || decodedToken.hasOwnProperty('roles')) {
      return [];
    }
    return decodedToken.roles;
  }

  public getTokenExpirationDate(): number | null {
    return this.decodeToken(this.getToken()).exp;
    const token = this.getToken();
    const decodedToken = this.decodeToken(token);
    if (decodedToken === null || decodedToken.hasOwnProperty('exp')) {
      return null;
    }
    return decodedToken.exp;
  }

  public getUserLastLoginDate(): number | null {
    return this.decodeToken(this.getToken()).iat;
    const token = this.getToken();
    const decodedToken = this.decodeToken(token);
    if (decodedToken === null || decodedToken.hasOwnProperty('iat')) {
      return null;
    }
    return decodedToken.iat;
  }

  public getUserUuid(): string {
    return this.decodeToken(this.getToken()).uuid;
    const token = this.getToken();
    const decodedToken = this.decodeToken(token);
    return decodedToken.uuid;
  }

  private b64DecodeUnicode(s: string): string {
    return decodeURIComponent(Array.prototype.map.call(atob(s), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  }

}
