    import { Component, OnInit } from '@angular/core';
    import { MapService } from '../map.service';
    import { State } from '../state';

    import {
        NgFor,
        NgIf,
        NgClass,
        LowerCasePipe
    } from '@angular/common';

    @Component({
        selector: 'app-map',
        standalone: true,
        imports: [
            NgFor,
            NgIf,
            NgClass,
            LowerCasePipe
        ],
        templateUrl: './map.component.html',
        styleUrls: ['../app.component.css','./map.component.css'],
    })
    export class MapComponent implements OnInit {
        user_id: string | null;
        user_name: string | null;
        state_count: number;
        current_state: State;
        user_states: State[] | null;
        response: string;

    constructor(
        private map_service: MapService
    ) {
        this.current_state = {code: '', name: '', coordinates: '', capital: '', largest_city: '', bird: '', flower: '', fun_fact: '',  selected: 'No'};
        this.user_states = [{code: '', name: '', coordinates: '', capital: '', largest_city: '', bird: '', flower: '', fun_fact: '', selected: 'No'}];
        this.state_count = 0;
        this.response = '';
        this.user_id = localStorage.getItem('user_id');
        this.user_name = localStorage.getItem('user_name');
    }

    ngOnInit(): void {
        this.getAllUserStates();
    }

    addCurrentState(state: State) {
        this.current_state = state;
        this.map_service.getAllUserStates(this.user_id);

    }

    removeCurrentState(state: State) {
        this.current_state = {code: '', name: '', coordinates: '', capital: '', largest_city: '', bird: '', flower: '', fun_fact: '',  selected: 'No'};
        this.map_service.getAllUserStates(this.user_id);

    }

    selectState(state: State) {
        if (this.user_id != null) {
            if (state.selected === 'Yes') {
                this.removeUserState(this.user_id, state.code);
            } else {
                this.addUserState(this.user_id, state.code);
            }
        }
        this.getAllUserStates();
    }

    getAllUserStates() {
        let user_states = this.map_service.getAllUserStates(this.user_id);
        user_states.subscribe(data => this.user_states = data.body);
        this.getUserStateCount();
    }

    getUserStateCount() {
        let state_count = this.map_service.getUserStateCount(this.user_id);
        state_count.subscribe(data => this.state_count = data.body);
    }

    addUserState(user_id: string | null, state_id: string) {
        console.log('click');
        let response = this.map_service.addUserState(user_id, state_id);
        response.subscribe(data=> this.response = data);
        console.log(this.response);
    }

    addUserStateMouseDown(user_id: string | null, state_id: string) {
        console.log('mouse');
        let response = this.map_service.addUserState(user_id, state_id);
        response.subscribe(data=> this.response = data);
        console.log(this.response);
    }

    removeUserState(user_id: string | null, state_id: string) {
        let response = this.map_service.removeUserState(user_id, state_id);
        response.subscribe(data=> this.response = data);
        console.log(this.response);

    }

}

