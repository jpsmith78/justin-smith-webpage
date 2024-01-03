import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { State } from '../state';
import { States } from '../states';

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

  displayState() {
    let state = this.map_service.getState();
    state.subscribe(data => this.state.code = data.body?.code);
    state.subscribe(data => this.state.name = data.body?.name);
  }

}

