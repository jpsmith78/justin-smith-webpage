import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, last } from 'rxjs';
import { environment } from './../environments/environment';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookListService {
    base_url = environment.api_url;

    constructor(private http: HttpClient) {}

    getBooksByAuthor(author: string) {
        return this.http.get<any>(`${this.base_url}/?controller=books&method=getallbooksbyauthor&author=${author}`, {observe: 'response'});
    }

    getUserBooksByAuthor(author: string, user_id: string | null) {
        return this.http.get<any>(`${this.base_url}/?controller=books&method=getalluserbooksbyauthor&author=${author}&user_id=${user_id}`, {observe: 'response'});
    }

    getUserShortStoriesByAuthor(author: string, user_id: string | null) {
        return this.http.get<any>(`${this.base_url}/?controller=books&method=getallusershortstoriesbyauthor&author=${author}&user_id=${user_id}`, {observe: 'response'});
    }

    updateUserBook(book_id: string, user_id: string | null, completed: string) {
        const config = {headers: {"Content-Type": "text/plain"}};

        return this.http.put<any>(`${this.base_url}/?controller=books&method=updateuserbook&book_id=${book_id}&user_id=${user_id}&completed=${completed}`, config, {observe: 'response'});
    }
    
}



