import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent {
    title = 'justin_smith-webpage';
    username = localStorage.getItem('user_name') ? localStorage.getItem('user_name') : 'Guest' ;

    submitLogOut() {
        localStorage.clear();
        console.log(localStorage.getItem('user_id'));
    }

}
