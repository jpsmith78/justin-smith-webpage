import { Component, OnInit } from '@angular/core';
import { BookListService } from '../book-list.service';
import { Book } from '../book';

import {
    NgFor,
    NgIf,
    NgClass,
    LowerCasePipe
} from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    LowerCasePipe
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['../app.component.css','./book-list.component.css'],
})

export class BookListComponent implements OnInit{
    user_name: string | null;
    current_book: Book;
    all_books: Book[] | null;
    result_count: number;
    
    constructor(private book_list_service: BookListService) {
        this.current_book = {book_id: '', cover_id: '', title: '', authors: '', categories: '', page_count: 0, publish_year: 0, description: ''};
        this.all_books = [{book_id: '', cover_id: '', title: '', authors: '', categories: '', page_count: 0, publish_year: 0, description: ''}];
        this.result_count = 0;
        this.user_name = localStorage.getItem('user_name');
    }

    ngOnInit(): void {
        this.getBookList()
    }

    getBookList() {
        let book_list = this.book_list_service.getBookList();

        book_list.subscribe(data => {
            for (let book of data.body) {

                let temp_book: Book = {
                    book_id: book.book_id,
                    cover_id: book.cover_id,
                    title: book.title,
                    authors: book.authors,
                    categories: book.categories,
                    page_count: book.page_count,
                    publish_year: book.publish_year,
                    description: book.description
                }

                this.all_books?.push(temp_book);

            }
            // The first index is empty. Get rid of it.
            this.all_books?.splice(0,1);      
            console.log(this.all_books);          
        });
    }

    showDetails(book_id: string) {
        var book_details = document.getElementById(book_id);
        if (book_details) {
            book_details.classList.toggle('is-hidden');
        }
    }

}
