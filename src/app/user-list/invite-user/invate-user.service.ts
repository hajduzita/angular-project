import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as ENV } from '../../../environments/environment';
import { IApiRoleList } from '../../@interfaces/api-role-list.interface';
import { IApiInvitedUserData } from '../../@interfaces/api-invited-user.interface';



@Injectable({
  providedIn: 'root'
})
export class InviteUserService {

  constructor(private http: HttpClient) { }

  public getRoleList(): Observable<IApiRoleList> {
    return this.http.get<IApiRoleList>(`${ENV.api}/roles/list`);
  }

  public inviteUser(inviteUser: IApiInvitedUserData): Observable<HttpResponse<IApiInvitedUserData>> {
    return this.http.post<IApiInvitedUserData>(`${ENV.api}/users/invite`, inviteUser,
      {observe: 'response'})
  }

}
