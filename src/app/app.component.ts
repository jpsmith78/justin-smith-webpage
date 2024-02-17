import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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

export class AppComponent {
    username: string | null;
    show_message: boolean | false;
    alert: string | null;

    constructor() {
        this.username = localStorage.getItem('user_name') ? localStorage.getItem('user_name') : 'Guest' ;
        this.show_message = localStorage.getItem('alert') ? true : false;
        this.alert = localStorage.getItem('alert') ? localStorage.getItem('alert') : '';
        setTimeout(() => {
            localStorage.removeItem('alert');
            this.show_message = false;
        }, 3000);
    }

    submitLogOut() {
        localStorage.clear();
        localStorage.setItem('alert', 'Log Out Successful!');
        this.username = 'Guest';
        window.location.reload();
    }

}
