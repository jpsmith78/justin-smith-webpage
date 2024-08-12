import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, last } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

    constructor(private http: HttpClient) {}

    // getAuthorId(first_name: string, last_name: string) {
    //     return this.http.get<any>(`https://openlibrary.org/search/authors.json?q=${first_name}+AND+${last_name}&sort=work_count+desc&limit=1`, {observe: 'response'})
    // }

    getBookList() {
        return this.http.get<any>(`https://openlibrary.org/search.json?q=author:stephen+king&language:eng&subject=fiction&limit=1000`, {observe: 'response'})
    }
    // get id and make request to get details
    // https://openlibrary.org/works/OL149093W.json
    // details can be used to suss out what collection a short story may be in.
}

// https://openlibrary.org/search/authors.json?q=stephen+AND+king&sort=work_count+desc&limit=1
// https://openlibrary.org/search/authors.json?q=stephen+king&sort=work_count+desc&limit=1

// https://openlibrary.org/authors/OL2162284A/works.json?limit=1000&sort=old


// https://openlibrary.org/search.json?q=author:stephen+king&subject:Ahorror+AND+edition_count:1