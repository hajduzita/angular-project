import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as ENV } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  public passwordReset(passwordReset: {email: string}): Observable<any> {
    return this.http.post<any>(`${ENV.api}/auth/forgotten-password`, passwordReset,
      {observe: 'response'});
  }

  public newPassword(token: string, password: string): Observable<any> {
    const newPassword = {
      token: token,
      password: password
    }
    return this.http.post<any>(`${ENV.api}/auth/reset-password`, newPassword,
      {observe: 'response'});
  }
}
