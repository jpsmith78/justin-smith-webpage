import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { BookListService } from '../book-list.service';
import { AccountService } from '../account.service';
import { Book } from '../book';
import { User } from '../user';

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
    FormsModule,
    MatTooltipModule
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['../app.component.css','./book-list.component.css'],
})

export class BookListComponent implements OnInit {
    all_users: User[] = [];
    user_id: string | null;
    user_name: string | null;
    user_books: Book[] = [];
    filtered_books: Book[] = [];
    category_books: Book[] = [];
    read_count: number = 0;
    book_count: number = 0;

    user_two_books: Book[] = [];
    user_two_filtered_books: Book[] = [];
    user_two_category_books: Book[] = [];
    user_two_read_count: number = 0;
    user_two_book_count: number = 0;

    disable_checkbox: boolean = false;
    search_string: string = '';
    dropdown_categories: string [] = ['Fiction', 'Collection', 'Non-Fiction', 'Dark Tower', 'Bachman', 'Bill Hodges', 'All'];
    selected_category: string = 'All';
    selected_user_id: string = '';
    // user_two: User[];
    show_all_details: boolean = false;
    
    constructor(
        private book_list_service: BookListService,
        private account_service: AccountService
    ) {
        this.user_id = localStorage.getItem('user_id');
        this.user_name = localStorage.getItem('user_name');
    }

    ngOnInit(): void {
        this.getUserBooksByAuthor('Stephen King');
        localStorage.setItem('book-list', 'on');
        if (!this.user_name) {
            this.disable_checkbox = true;
        }
        this.getAllUsers(this.user_id);

    }

    getAllUsers(user_id: string | null) {
        let users = this.account_service.getAllUsers();
        users.subscribe(data => {
            for (let user of data.body) {
                if (user.user_id != user_id) {
                    let temp_user: User = {
                        user_id: user.user_id,
                        user_name: user.user_name
                    };
                    this.all_users?.push(temp_user);
                }

            }
        })
    }

    getUserBooksByAuthor(author: string) {
        this.user_books = [];
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

    getUserTwoBooks() {
        console.log('hello');
        this.user_two_books = [];
        let book_list = this.book_list_service.getUserBooksByAuthor('Stephen King', this.selected_user_id);
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

                this.user_two_books?.push(temp_book);

            }
            this.user_two_filtered_books = this.user_two_books;
            this.user_two_book_count = this.user_two_filtered_books.length;
            this.user_two_read_count = this.filtered_books.filter(book => book.completed === true).length;
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
        this.book_count = this.filtered_books.length;
        this.read_count = this.filtered_books.filter(book => book.completed === true).length;
    }

    filterBooksBySearch() {
        // If no string, show all books.
        if (!this.search_string) {
            this.filtered_books = this.category_books ? this.category_books :this.user_books;
        }

        // Filtered list of books by book title.
        if (!this.selected_category || this.selected_category === 'all') {
            this.filtered_books = this.user_books.filter(
                user_book => user_book.title.toLowerCase().includes(this.search_string.toLowerCase().trim())
            );
        } else {
            this.filtered_books = this.category_books.filter(
                user_book => user_book.title.toLowerCase().includes(this.search_string.toLowerCase().trim())
            );
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

    resetDropdown() {
        this.selected_category = 'All';
        this.filterBooksByCategory();
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
