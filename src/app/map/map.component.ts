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
  user_states: State[] | null;

  constructor(private map_service: MapService) {
    this.state = {code: '', name: '' };
    this.states = [{code: '', name: ''}];
    this.user_states = [{code: '', name: ''}];
  }

  ngOnInit() {
    this.getUserState();
    this.getAllUserStates();
    this.addUserState(1, 'ME');
  }

  getUserState() {
    let state = this.map_service.getState();
    state.subscribe(data => this.state.code = data.body?.code);
    state.subscribe(data => this.state.name = data.body?.name);
  }

  getAllUserStates() {
    let user_states = this.map_service.getAllUserStates(1);
    user_states.subscribe(data => this.user_states = data.body);
  }

  addUserState(user_id: number, state_id: string) {
    let response = this.map_service.addUserState(user_id, state_id);
    response.subscribe(data=> console.log(data));
  }



}

