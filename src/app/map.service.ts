import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/map`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

}
