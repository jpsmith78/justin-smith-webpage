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
        styleUrl: './map.component.css',
    })
    export class MapComponent implements OnInit {
        user_id: string | null;
        state: State;
        user_states: State[] | null;
        response: string;

    constructor(private map_service: MapService) {
        this.state = {code: '', name: '', coordinates: '', selected: 'No'};
        this.user_states = [{code: '', name: '', coordinates: '', selected: 'No'}];
        this.response = '';
        this.user_id = localStorage.getItem('user_id');
    }

    ngOnInit() {
        this.getAllUserStates();
        console.log(localStorage.getItem('user_id'));

    }

    onSelect(state: State) {
        if (state.selected == 'No') {
            this.addUserState(this.user_id, state.code);
        } else {
            this.removeUserState(this.user_id, state.code);
        }
        this.getAllUserStates();
    }

    getAllUserStates() {
        let user_states = this.map_service.getAllUserStates(this.user_id);
        user_states.subscribe(data => this.user_states = data.body);
    }

    addUserState(user_id: string | null, state_id: string) {
        let response = this.map_service.addUserState(user_id, state_id);
        response.subscribe(data=> this.response = data);
    }

    removeUserState(user_id: string | null, state_id: string) {
        let response = this.map_service.removeUserState(user_id, state_id);
        response.subscribe(data=> this.response = data);
    }

}

