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
    user_books: Book[] = [];
    filtered_books: Book[] = [];
    category_books: Book[] = [];
    short_stories: ShortStory[] = [];
    read_count: number = 0;
    book_count: number = 0;
    search_string: string = '';
    dropdown_categories: string [] = ['fiction', 'collection', 'non-fiction', 'dark tower', 'bachman', 'bill hodges', 'all'];
    selected_category: string = 'all';
    
    constructor(private book_list_service: BookListService) {
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
            this.book_count = this.filtered_books.length;
            this.read_count = this.filtered_books.filter(book => book.completed === true).length;
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

    filterBooksBySearch() {
        // If no string, show all books.
        if (!this.search_string) {
            this.filtered_books = this.user_books;
            return;
        }

        // Filtered list of books by book title.
        if (!this.selected_category || this.selected_category === 'all') {
            this.filtered_books = this.user_books.filter(
                user_book => user_book.title.toLowerCase().includes(this.search_string.toLowerCase())
            );
        } else {
            this.filtered_books = this.filtered_books.filter(
                user_book => user_book.title.toLowerCase().includes(this.search_string.toLowerCase())
            );
        }


        // Get a list of filtered short stories by title.
        let matching_stories = this.short_stories.filter(
            short_story => short_story.story_name.toLowerCase().includes(this.search_string.toLowerCase())
        );

        // Match the book_id from the story title and append the book record to the filtered book list.
        for (let i = 0; i < this.user_books.length; i++) {
            if (this.user_books && matching_stories.find(e => e.book_id === this.user_books[i].book_id)) {
                this.filtered_books.push(this.user_books[i])
            }
        }

        this.book_count = this.filtered_books.length;
        this.read_count = this.filtered_books.filter(book => book.completed === true).length;
    }

    clearSearchBar() {
        this.search_string = '';
        this.filterBooksBySearch();
    }

    filterBooksByCategory() {
        console.log(this.selected_category)
        if (!this.selected_category || this.selected_category == 'all') {
            this.filtered_books = this.user_books;
            return;
        }

        // fiction gets false positives from non-fiction, so let's make it a bit more explicit for that one.
        if (this.selected_category === 'fiction') {
            this.filtered_books = this.user_books.filter(
                user_book => (user_book.categories.toLowerCase().includes(this.selected_category) && 
                !user_book.categories.toLowerCase().includes('non-fiction'))
            );
        } else {
            this.filtered_books = this.user_books.filter(
                user_book => user_book.categories.toLowerCase().includes(this.selected_category)
            );
        }

        this.book_count = this.filtered_books.length;
        this.read_count = this.filtered_books.filter(book => book.completed === true).length;
    }

}
