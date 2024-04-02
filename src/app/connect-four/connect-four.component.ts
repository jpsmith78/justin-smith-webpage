import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
    selector: 'app-connect-four',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        CommonModule
    ],
    templateUrl: './connect-four.component.html',
    styleUrls: ['../app.component.css', './connect-four.component.css']
})
export class ConnectFourComponent implements OnInit {
    game_board:string[][];
    player_turn:boolean;
    first_turn:boolean;
    game_on:boolean;
    player:string;
    message:string;

    constructor () {
        this.player_turn = false;
        this.first_turn = false;
        this.game_on = false;
        this.player = 'player';
        this.message = '';
        this.game_board = [];
        this.buildGameBoard();
    }

    ngOnInit(): void {
    }

    buildGameBoard() {
        this.game_board = [];
        for (let i = 0; i < 7; i++) {
            this.game_board.push([]);

            for (let j = 0; j < 6; j++) {
                this.game_board[i][j] = 'open'
            }
        }
    }

    getPlayer() {
        if (this.player_turn) {
            this.player = 'player';
        } else {
            this.player = 'opponent';
        }
    }

    startGame() {
        this.buildGameBoard();
        this.coinToss();
        this.game_on = true;
    }

    coinToss() {
        this.first_turn = (Math.floor(Math.random() * 2) == 0);
        if (this.first_turn) {
            this.player_turn = true;
            this.player = 'player';
        } else {
            this.player_turn = false;
            this.player = 'opponent';
        }
        this.message = this.player + ' has won the coin toss';
    }

    playTurn(row: any) {
        if (this.game_on) {
            let index = 0;

            for (let square of row) {
                this.getPlayer();
                this.checkForWin();

                if (square !== 'open' && index === 0) {
                    // This is the top of the board. Don't keep taking turns here.
                    this.message = 'row full';
                    break;
                } else if (square !== 'open' && index != 0) {
                    row[index - 1] = this.player;
                    this.checkForWin();
                    this.player_turn = !this.player_turn;
                    this.getPlayer();
                    break;
                } else if (index == 5 && square == 'open'){
                    row[index] = this.player;
                    this.checkForWin();
                    this.player_turn = !this.player_turn;
                    this.getPlayer();

                }
    
                index++;
            }
        }
    }

    checkForWin() {
        for (let i = 0; i < this.game_board.length; i++) {
            for (let j = 0; j < this.game_board[i].length; j++) {
                console.log(this.game_board[i][j]);
                if (
                    (
                        this.game_board[i][j] === this.player &&
                        this.game_board[i][j + 1] === this.player &&
                        this.game_board[i][j + 2] === this.player &&
                        this.game_board[i][j + 3] === this.player
                    ) ||
                    (
                        this.game_board[i][j] === this.player &&
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j] === this.player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j] === this.player) &&
                        (typeof this.game_board[i + 3] !== 'undefined' && this.game_board[i + 3][j] === this.player)
                    ) ||
                    (
                        this.game_board[i][j] === this.player &&
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j + 1] === this.player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j + 2] === this.player) &&
                        (typeof this.game_board[i + 3] !== 'undefined' && this.game_board[i + 3][j + 3] === this.player)
                    ) ||
                    (
                        this.game_board[i][j] === this.player &&
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j - 1] === this.player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j - 2] === this.player) &&
                        (typeof this.game_board[i + 3] !== 'undefined' && this.game_board[i + 3][j - 3] === this.player)
                    ) 

                ) {
                    this.message = this.player + ' wins!';
                    this.buildGameBoard();
                    this.game_on = false;
                }

            }
        }
    }

}
