import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrls: ['../app.component.css', './home-page.component.css']
})

export class HomePageComponent implements OnInit{

    constructor() {}

    ngOnInit(): void {
        localStorage.removeItem('book-list');
    }

}
