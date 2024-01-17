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
        state: State;
        user_states: State[] | null;
        response: string;

    constructor(private map_service: MapService) {
        this.state = {code: '', name: '', coordinates: '', selected: 'No'};
        this.user_states = [{code: '', name: '', coordinates: '', selected: 'No'}];
        this.response = '';
    }

    ngOnInit() {
        this.getAllUserStates();
    }

    onSelect(state: State) {
        if (state.selected == 'No') {
            this.addUserState(1, state.code);
        } else {
            this.removeUserState(1, state.code);
        }
        this.getAllUserStates();
    }

    getAllUserStates() {
        let user_states = this.map_service.getAllUserStates(1);
        user_states.subscribe(data => this.user_states = data.body);
    }

    addUserState(user_id: number, state_id: string) {
        let response = this.map_service.addUserState(user_id, state_id);
        response.subscribe(data=> this.response = data);
    }

    removeUserState(user_id: number, state_id: string) {
        let response = this.map_service.removeUserState(user_id, state_id);
        response.subscribe(data=> this.response = data);
    }

}

