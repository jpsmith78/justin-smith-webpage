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
import { ShortStory } from '../short-story';

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
    user_books: Book[] = [];
    filtered_books: Book[] = [];
    short_stories: ShortStory[] = [];
    result_count: number;
    search_string: string = '';
    
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

        this.result_count = 0;
        this.user_id = localStorage.getItem('user_id');
        this.user_name = localStorage.getItem('user_name');
    }

    ngOnInit(): void {
        this.getUserBooksByAuthor('Stephen King');
        this.getUserShortStoriesByAuthor('Stephen King');
        localStorage.setItem('book-list', 'on');
        console.log(this.short_stories);
    }

    getUserBooksByAuthor(author: string) {
        let book_list = this.book_list_service.getUserBooksByAuthor(author, this.user_id);
        console.log(this.user_id)
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

                this.user_books?.push(temp_book);

            }
            this.filtered_books = this.user_books;
        });
    }

    getUserShortStoriesByAuthor(author: string) {
        let ss_list = this.book_list_service.getUserShortStoriesByAuthor(author, this.user_id);
        ss_list.subscribe(data => {
            for (let story of data.body) {
                let temp_story: ShortStory = {
                    book_id: story.book_id,
                    story_name: story.story_name
                }

                this.short_stories?.push(temp_story);
            }
            this.short_stories?.splice(0,1);      
        });
    }

    showDetails(book_id: string) {
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

    updateUserBook(book_id: string) {
        // Get the updated values of the current book
        let new_values = this.user_books?.filter(obj => {
            return obj.book_id === book_id
        })

        if (new_values) {
            let completed = new_values[0].completed == true ? 'Y' : 'N';
            let in_progress = new_values[0].in_progress == true ? 'Y' : 'N';
            let owned = new_values[0].owned == true ? 'Y' : 'N';

            let book = this.book_list_service.updateUserBook(book_id, this.user_id, completed, in_progress, owned);
            book.subscribe(data => {
                console.log(data)

            });
        }
    }

    filterBooks() {
        if (!this.search_string) {
            this.filtered_books = this.user_books;
            return;
        }

        this.filtered_books = this.user_books.filter(
            user_book => user_book.title.toLowerCase().includes(this.search_string.toLowerCase())
        );
    }

    clearSearchBar() {
        this.search_string = '';
        this.filterBooks();
    }

}
