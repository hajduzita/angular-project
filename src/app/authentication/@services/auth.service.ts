import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as ENV } from '../../../environments/environment';
import { IApiSignIn } from '../../@interfaces/api-user-sign-in.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signIn(signIn: IApiSignIn): Observable<HttpResponse<IApiSignIn>> {
    return this.http.post<IApiSignIn>(`${ENV.api}/auth/signin`, signIn,
      {observe: 'response'})
  }

  public signOut(token: string | null): Observable<{token: string}> {
    return this.http.put<{token: string}>(`${ENV.api}/auth/logout`, token)
  }

}
