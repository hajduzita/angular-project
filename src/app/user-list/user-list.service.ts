import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as ENV } from '../../environments/environment';
import { IApiUserList } from '../@interfaces/api-user-list.interface';
import { IApiUserActivity } from '../@interfaces/api-user-activity.interface';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private http: HttpClient) { }

  public userList(): Observable<IApiUserList[]> {
    return this.http.get<IApiUserList[]>(`${ENV.api}/users`);
  }

  public changeActivity(email: string, active: boolean): Observable<IApiUserActivity> {
    const response = {
      email: email,
      active: active
    }
    return this.http.post<IApiUserActivity>(`${ENV.api}/users/change-activity`, response);
  }

  public deleteUser(uuid: string): Observable<string>{
    return this.http.post<string>(`${ENV.api}/users/delete/${uuid}`, uuid)
  }

}
