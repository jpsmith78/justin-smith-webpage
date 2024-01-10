import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { State } from './state';
import { Observable } from 'rxjs';

// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class MapService {
  base_url = 'http://localhost:8888/public';

  constructor(private http: HttpClient) {
  }

  getState(): Observable<HttpResponse<State>> {
    return this.http.get<State>(`${this.base_url}/maps/getstate?state_code=MA`, { observe: 'response'});
  }

  getAllStates(): Observable<HttpResponse<State[]>> {
    return this.http.get<State[]>(`${this.base_url}/maps/getallstates`, {observe: 'response'});
  }

  getAllUserStates(user_id: number): Observable<HttpResponse<State[]>> {
    return this.http.get<State[]>(`${this.base_url}/maps/getalluserstates?user_id=${user_id}`, {observe: 'response'});
  }

  addUserState(user_id: number, state_code: string) {
    const config = {
        headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    return this.http.put<any>(`${this.base_url}/maps/adduserstate?user_id=${user_id}&state_code=${state_code}`, config);

  }


}