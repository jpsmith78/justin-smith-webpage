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
    // public function addUserBook($user_id, $book_id, $completed, $in_progress, $owned) {


    getBooksByAuthor(author: string) {
        return this.http.get<any>(`${this.base_url}/?controller=books&method=getallbooksbyauthor&author=${author}`, {observe: 'response'});
    }

    getUserBooksByAuthor(author: string, user_id: string | null) {
        return this.http.get<any>(`${this.base_url}/?controller=books&method=getalluserbooksbyauthor&author=${author}&user_id=${user_id}`, {observe: 'response'});
    }

    updateUserBook(user_id: string, book_id: string, completed: string, in_progress: string, owned: string) {
        const config = {headers: {"Content-Type": "text/plain"}};

        return this.http.put<any>(`${this.base_url}/?controller=books&method=updateuserbook&user_id=${user_id}&book_id=${book_id}&completed=${completed}&in_progress=${in_progress}&owned=${owned}`, config, {observe: 'response'});
    }
    
}



