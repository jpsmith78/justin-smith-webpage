import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { State } from '../state';

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
  states: State[] | null;

  constructor(private map_service: MapService) {
    this.state = {code: '', name: '' };
    this.states = [{code: '', name: ''}];
  }

  ngOnInit() {
    this.displayState();
    this.displayAllStates();
    console.log(this.state);
    console.log(this.states);
  }

  displayState() {
    let state = this.map_service.getState();
    state.subscribe(data => this.state.code = data.body?.code);
    state.subscribe(data => this.state.name = data.body?.name);
  }

  displayAllStates() {
    let states = this.map_service.getAllStates();
    states.subscribe(data => this.states = data.body);
  }

}

