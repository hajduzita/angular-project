import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment as ENV} from "../../../environments/environment";
import {IApiUserData} from "../../@interfaces/api-user-data.interface";

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor( private http: HttpClient) { }

  // Change only the user name
  /*public changeUserName(email: string, fullName: string): Observable<HttpResponse<any>> {
    const request = {
      email: email,
      fullName: fullName
    }
    return this.http.post<any>(`${ENV.api}/users/update`, request,
      {observe: 'response'})
  }*/

  // Change only the role
  /*public changeUserRole(email: string, roleId: string): Observable<HttpResponse<any>> {
    const request = {
      email: email,
      roleId: roleId
    }
    return this.http.post<any>(`${ENV.api}/users/change-role`, request,
      {observe: 'response'})
  }*/

  // Change every data
  public changeUserData(email: string, fullName: string, uuid: string, roleId: number, password?: string): Observable<HttpResponse<IApiUserData>> {
    const request = {
      email: email,
      fullName: fullName,
      uuid: uuid,
      roleId: roleId,
      password: password
    }
    return this.http.post<IApiUserData>(`${ENV.api}/users/update`, request,
      {observe: 'response'});
  }

  public getUserData(): Observable<IApiUserData> {
    return this.http.get<IApiUserData>(`${ENV.api}/users/get-current`);
  }
}
