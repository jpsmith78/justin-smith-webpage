import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { State } from './state';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  baseUrl = 'http://localhost:8888/public';

  constructor(public http: HttpClient) {
  }

  getState(): Observable<HttpResponse<State>> {
    return this.http.get<State>(`${this.baseUrl}/states/getstate/MA`, { observe: 'response'});
  }
}
