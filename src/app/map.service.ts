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
    return this.http.get<State>(`${this.base_url}/maps/getstate/MA`, { observe: 'response'});
  }

  getAllStates(): Observable<HttpResponse<State[]>> {
    return this.http.get<State[]>(`${this.base_url}/maps/getallstates`, {observe: 'response'});
  }
}