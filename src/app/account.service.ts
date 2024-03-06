import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from './../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    base_url = environment.api_url;

    constructor(private http: HttpClient) { }

    addUser(params: FormGroup) {
        const config = {headers: {"Content-Type": "text/plain"}}
        return this.http.put<any>(`${this.base_url}/?controller=users&method=adduser&user_name=${params.value.user_name}&email=${params.value.email}`, config, {observe: 'response'});
    }

    getAllUsers() {
        return this.http.get<any>(`${this.base_url}/?controller=users&method=getallusers`, {observe: 'response'});
    }

    loginUser(params: FormGroup) {
        return this.http.get<any>(`${this.base_url}/?controller=users&method=getuser&user_name=${params.value.user_name}&email=${params.value.email}`, {observe: 'response'});
    }

}
