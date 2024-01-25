import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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

    constructor(private toast: ToastrService) {
        this.username = localStorage.getItem('user_name') ? localStorage.getItem('user_name') : 'Guest' ;
    }

    ngOnInit(): void {
        
    }

    submitLogOut() {
        localStorage.clear();
        this.toast.success('Log Out Successful', '', { positionClass:'toast-custom' });
        this.username = 'Guest';
    }

}
