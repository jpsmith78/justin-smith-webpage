import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './account.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        HttpClientModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
    username: string | null;
    show_message: boolean | false;
    alert: string | null;
    catfact: string | null;
    book_page: boolean | false;

    constructor(private account_service: AccountService) {
        this.username = localStorage.getItem('user_name') ? localStorage.getItem('user_name') : 'Guest' ;
        this.show_message = localStorage.getItem('alert') ? true : false;
        this.book_page = localStorage.getItem('book-list') ? true : false;
        this.alert = localStorage.getItem('alert') ? localStorage.getItem('alert') : '';
        this.catfact = '';
        setTimeout(() => {
            localStorage.removeItem('alert');
            this.show_message = false;
        }, 3000);
    }

    ngOnInit(): void {
        this.getCatFact();
    }

    submitLogOut() {
        localStorage.clear();
        localStorage.setItem('alert', 'Log Out Successful!');
        this.username = 'Guest';
        window.location.reload();
    }

    getCatFact() {
        let catfact = this.account_service.getCatFact();
        catfact.subscribe(data => {this.catfact = data.body.fact});
    }

    addBookPageStyle() {
        let buttons = document.getElementsByClassName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.add('book-list-button')
        }
    }

    removeBookPageStyle() {
        let buttons = document.getElementsByClassName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('book-list-button')
        }
    }    

}
