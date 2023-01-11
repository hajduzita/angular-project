import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IApiUserRegistration } from '../../@interfaces/api-user-registration.interface';
import { environment as ENV } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) { }

  public userRegistration(token: string, fullName: string, password: string): Observable<HttpResponse<IApiUserRegistration>> {
    const request = {
      token: token,
      fullName: fullName,
      password: password
    }
    return this.http.post<IApiUserRegistration>(`${ENV.api}/auth/register`, request,
      {observe: 'response'})
  }

}
