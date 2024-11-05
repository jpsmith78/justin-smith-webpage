import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookListService } from '../book-list.service';
import { Book } from '../book';
import { ShortStory } from '../short-story';

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
    user_books: Book[] = [];
    filtered_books: Book[] = [];
    category_books: Book[] = [];
    short_stories: ShortStory[] = [];
    read_count: number = 0;
    book_count: number = 0;
    disable_checkbox: boolean = false;
    search_string: string = '';
    dropdown_categories: string [] = ['Fiction', 'Collection', 'Non-Fiction', 'Dark Tower', 'Bachman', 'Bill Hodges', 'All'];
    selected_category: string = 'All';
    show_all_details: boolean = false;
    
    constructor(private book_list_service: BookListService) {
        this.user_id = localStorage.getItem('user_id');
        this.user_name = localStorage.getItem('user_name');
    }

    ngOnInit(): void {
        this.getUserBooksByAuthor('Stephen King');
        this.getUserShortStoriesByAuthor('Stephen King');
        localStorage.setItem('book-list', 'on');
        if (!this.user_name) {
            this.disable_checkbox = true;
        }

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
                    completed: book.completed == 'Y' ? true : false
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
                button.textContent = 'Expand';
                button.style.background = 'var(--alizarin-crimson)';
            } else {
                button.textContent = 'Collapse';
                button.style.background = 'var(--rufous)';
            }
        }

        this.checkForOpenDetails();
    }

    showAllDetails() {
        let details = document.getElementsByClassName('book-long-details');
        for (let i = 0; i < details.length; i++) {
            details[i].classList.remove('is-hidden');
            let button = document.getElementById(details[i].id.concat('-button'))
            if (button) {
                button.textContent = 'Collapse';
                button.style.background = 'var(--rufous)';
            }
        }

        this.checkForOpenDetails()
    }

    hideAllDetails() {
        let details = document.getElementsByClassName('book-long-details');
        for (let i = 0; i < details.length; i++) {
            details[i].classList.add('is-hidden');
            let button = document.getElementById(details[i].id.concat('-button'))
            if (button) {
                button.textContent = 'Expand';
                button.style.background = 'var(--alizarin-crimson)';
            }
        }

        this.checkForOpenDetails()
    }

    checkForOpenDetails() {
        let show_details = false;
        let details = document.getElementsByClassName('book-long-details');
        for (let i = 0; i < details.length; i++) {
            if (!details[i].classList.contains('is-hidden')) {
                show_details = true;
            }
        }
        this.show_all_details = show_details;
    }

    updateUserBook(book_id: string) {
        // Get the updated values of the current book
        let new_values = this.user_books?.filter(obj => {
            return obj.book_id === book_id
        })

        if (new_values) {
            let completed = new_values[0].completed == true ? 'Y' : 'N';

            let book = this.book_list_service.updateUserBook(book_id, this.user_id, completed);
            book.subscribe(data => {
                console.log(data)

            });
        }
    }

    filterBooksBySearch() {
        // If no string, show all books.
        if (!this.search_string) {
            this.filtered_books = this.category_books ? this.category_books :this.user_books;
            return;
        }

        // Filtered list of books by book title.
        if (!this.selected_category || this.selected_category === 'all') {
            this.filtered_books = this.user_books.filter(
                user_book => user_book.title.toLowerCase().includes(this.search_string.toLowerCase().trim())
            );
        } else {
            this.filtered_books = this.filtered_books.filter(
                user_book => user_book.title.toLowerCase().includes(this.search_string.toLowerCase().trim())
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
        this.filterBooksByCategory();
        return;
    }

    filterBooksByCategory() {
        if (!this.selected_category || this.selected_category == 'All') {
            this.category_books = this.user_books;
            this.filtered_books = this.user_books;
            this.book_count = this.filtered_books.length;
            this.read_count = this.filtered_books.filter(book => book.completed === true).length;
            return;
        }

        // fiction gets false positives from non-fiction, so let's make it a bit more explicit for that one.
        if (this.selected_category === 'fiction') {
            this.category_books = this.user_books.filter(
                user_book => (user_book.categories.toLowerCase().includes(this.selected_category.toLowerCase()) && 
                !user_book.categories.toLowerCase().includes('non-fiction'))
            );
        } else {
            this.category_books = this.user_books.filter(
                user_book => user_book.categories.toLowerCase().includes(this.selected_category.toLowerCase())
            );
        }

        this.filtered_books = this.category_books;

        this.book_count = this.filtered_books.length;
        this.read_count = this.filtered_books.filter(book => book.completed === true).length;
    }

}
