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

    // addUser(book_id: string, title: string, authors: string, page_count: number, publish_year: number) {
    //     const config = {headers: {"Content-Type": "text/plain"}};

    //     return this.http.put<any>(`${this.base_url}/?controller=books&method=addbook&book_id=${book_id}&title=${title}&authors=${authors}&page_count=${page_count}&publish_year=${publish_year}`, config, {observe: 'response'});
    // }

    addBook(book: Book) {
        const config = {headers: {"Content-Type": "text/plain"}};

        return this.http.put<any>(`${this.base_url}/?controller=books&method=addbook&book_id=${book.book_id}&cover_id=${book.cover_id}&title=${book.title}&authors=${book.authors}&page_count=${book.page_count}&publish_year=${book.publish_year}`, config, {observe: 'response'});
    }

    getBookList() {
        return this.http.get<any>(`${this.base_url}/?controller=books&method=getallbooksbyauthor&author=stephen+king`, {observe: 'response'});
    }

    getBookSource() {
        return this.http.get<any>(`https://openlibrary.org/search.json?q=author:stephen+king&title=joyland`, {observe: 'response'})
    }
   
    addBookDescription(book_id: string, description: string) {
        const config = {headers: {"Content-Type": "text/plain"}};

        return this.http.put<any>(`${this.base_url}/?controller=books&method=addbookdescription&book_id=${book_id}&description=${description}`, config, {observe: 'response'});
    }

    getBookDetails(book_key: string) {

        return this.http.get<any>(`https://openlibrary.org/works/${book_key}.json`, {observe: 'response'});
    }

    getBookCover(cover_id: string) {
        return this.http.get<any>(`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`, {observe: 'response'});
    }
    
}



