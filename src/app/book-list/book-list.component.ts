import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    LowerCasePipe,
    FormsModule
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['../app.component.css','./book-list.component.css'],
})

export class BookListComponent implements OnInit {
    user_id: string | null;
    user_name: string | null;
    current_book: Book;
    all_books: Book[] | null;
    user_books: Book[] | null;
    result_count: number;
    
    constructor(private book_list_service: BookListService) {
        this.current_book = {
            book_id: '',
            cover_id: '',
            title: '',
            authors: '',
            categories: '',
            page_count: 0,
            publish_year: 0,
            description: '',
            completed: false,
            in_progress: false, 
            owned: false
        };
        this.all_books = [
            {
                book_id: '',
                cover_id: '',
                title: '',
                authors: '',
                categories: '',
                page_count: 0,
                publish_year: 0,
                description: '',
                completed: false,
                in_progress: false, 
                owned: false
            }
        ];
        this.user_books = [
            {
                book_id: '',
                cover_id: '',
                title: '',
                authors: '',
                categories: '',
                page_count: 0,
                publish_year: 0,
                description: '',
                completed: false,
                in_progress: false, 
                owned: false
            }
        ];
        this.result_count = 0;
        this.user_id = localStorage.getItem('user_id');
        this.user_name = localStorage.getItem('user_name');
    }

    ngOnInit(): void {
        this.getUserBooksByAuthor('Stephen King')
        localStorage.setItem('book-list', 'on');
    }

    getBooksByAuthor(author: string) {
        let book_list = this.book_list_service.getBooksByAuthor(author);

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
                    description: book.description,
                    completed: book.completed == 'Y' ? true : false,
                    in_progress: book.in_progress == 'Y' ? true : false,
                    owned: book.owned == 'Y' ? true : false
                }

                this.all_books?.push(temp_book);

            }
            // The first index is empty. Get rid of it.
            this.all_books?.splice(0,1);      
        });
    }

    getUserBooksByAuthor(author: string) {
        let book_list = this.book_list_service.getUserBooksByAuthor(author, this.user_id);
        console.log(this.user_id)
        book_list.subscribe(data => {
            for (let book of data.body) {
                console.log(book);
                let temp_book: Book = {
                    book_id: book.book_id,
                    cover_id: book.cover_id,
                    title: book.title,
                    authors: book.authors,
                    categories: book.categories,
                    page_count: book.page_count,
                    publish_year: book.publish_year,
                    description: book.description,
                    completed: book.completed == 'Y' ? true : false,
                    in_progress: book.in_progress == 'Y' ? true : false,
                    owned: book.owned == 'Y' ? true : false
                }

                this.user_books?.push(temp_book);

            }
            // The first index is empty. Get rid of it.
            this.user_books?.splice(0,1);      
        });
    }

    showDetails(book_id: string) {
        console.log(this.user_books)

        let book_details = document.getElementById(book_id);
        book_details?.classList.toggle('is-hidden');

        let  button = document.getElementById(book_id.concat('-button'))

        if (button) {
            if (book_details?.classList.contains('is-hidden')) {
                button.textContent = 'Show Details'
            } else {
                button.textContent = 'Hide Details'
            }
        }
    }

}
