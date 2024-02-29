import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { State } from './state';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class MapService {
  base_url = environment.api_url;

  constructor(private http: HttpClient) {}

  getUserStateCount(user_id: string | null): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.base_url}/maps/getuserstatecount?user_id=${user_id}`, {observe: 'response'});
  }

  getAllUserStates(user_id: string | null): Observable<HttpResponse<State[]>> {
    return this.http.get<State[]>(`${this.base_url}/maps/getalluserstates?user_id=${user_id}`, {observe: 'response'});
  }

  addUserState(user_id: string | null, state_code: string) {
    const config = {headers: {"Content-Type": "application/json"}}
    return this.http.put<any>(`${this.base_url}/maps/adduserstate?user_id=${user_id}&state_code=${state_code}`, config);
  }

  removeUserState(user_id: string | null, state_code: string) {
    const config = {headers: {"Content-Type": "application/json"}}
    return this.http.delete<any>(`${this.base_url}/maps/removeuserstate?user_id=${user_id}&state_code=${state_code}`, config);
  }


}