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
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{
    current_book: Book;
    all_books: Book[] | null;
    result_count: number;

    constructor(private book_list_service: BookListService) {
        this.current_book = {key: '', title: '', authors: '', categories: '', page_count: 0, first_published_year: 0, description: ''};
        this.all_books = [{key: '', title: '', authors: '', categories: '', page_count: 0, first_published_year: 0, description: ''}];
        this.result_count = 0;
    }

    ngOnInit(): void {
        this.getBookList()
    }

    getBookList() {
        let book_list = this.book_list_service.getBookList();

        book_list.subscribe(data => {
            console.log(data.body.docs)
            for (let book of data.body.docs) {
                let first_published_year = 0;
                
                if (typeof book.publish_year !== 'undefined') {
                    let publish_years = book.publish_year.sort((a: number,b: number) => a - b);
                    // Some of the first results are oddball stuff that's way in the past. This is a quick reality check.
                    if (publish_years[1] > publish_years[0] + 15) {
                        first_published_year = publish_years[1];
                    } else {
                        first_published_year = publish_years[0];

                    }



                    
                } 

                if (book.author_name == 'Stephen King') {
                    let temp_book: Book = {
                        key: book.key,
                        title: book.title,
                        authors: book.author_name,
                        categories: book.subject,
                        page_count: book.number_of_pages_median,
                        first_published_year: first_published_year | 0,
                        description: ''
                    }
                    this.all_books?.push(temp_book);
                }

                
            }

            this.all_books?.splice(0,1);

            this.all_books?.sort((a, b) => {
                if (a.first_published_year < b.first_published_year) {
                    return -1;
                }
                if (a.first_published_year > b.first_published_year) {
                    return 1;
                }
                return 0;
            });

            // if (this.all_books){
            //     for (let book of this.all_books){

            //         console.log(book);
            //     }
            // }

        });



    }

}
