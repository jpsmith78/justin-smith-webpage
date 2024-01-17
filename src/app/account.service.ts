import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    base_url = 'http://localhost:8888/public';

    constructor(private http: HttpClient) { }


    addUser(params: FormGroup) {
        const config = {headers: {"Content-Type": "text/plain"}}
        return this.http.put<any>(`${this.base_url}/users/adduser?username=${params.value.username}&email=${params.value.email}`, config, {observe: 'response'});
    }

    getAllUsers() {
        return this.http.get<any>(`${this.base_url}/users/getallusers`, {observe: 'response'});
    }

}
