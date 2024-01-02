import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { State } from '../state';
import { States } from '../states';

import { Observable } from 'rxjs';

import {
  NgFor
} from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  state: State;
  states = States;

  constructor(private map_service: MapService) {
    this.state = {code: '', name: '' };
  }


  ngOnInit() {
    console.log('hello');
    
    this.displayState();
    console.log(this.state);
  }

  // getState() {
  //   this.http.get<State>(`http://localhost:8888/public/maps/getstate/MA`)
  //     .subscribe(data => this.state = data);
  // }



  displayState() {
    let state = this.map_service.getState();
    // state.subscribe(data => console.log(data.body?.code));
    state.subscribe(data => this.state.code = data.body?.code);
    state.subscribe(data => this.state.name = data.body?.name);
  }

}

