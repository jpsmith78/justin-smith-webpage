import { Component, DoCheck} from '@angular/core';
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
export class ConnectFourComponent implements DoCheck{
    game_board:string[][] = [];

    opponent_move_conditions: {[condition: string]: number | null} = {}
    player_turn:boolean;
    first_turn:boolean;
    game_in_progress:boolean;
    game_won:boolean;
    player:string;
    message:string;

    constructor () {
        this.player_turn = false;
        this.first_turn = false;
        this.game_in_progress = false;
        this.game_won = false;
        this.player = 'player';
        this.message = '';
        this.populateOpponentMoveConditions();
        this.buildGameBoard();
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

    ngDoCheck() {
        if (!this.player_turn && this.game_in_progress) {
            this.opponentMove();
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
        this.game_in_progress = true;
    }

    endGame() {
        this.buildGameBoard();
        this.game_in_progress = false;
        this.game_won = false;
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
        if (this.game_in_progress && !this.game_won) {
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
                    this.game_won = true;
                }
            }
        }
    }

    opponentMove() {
        for (let i = 0; i < this.game_board.length; i++) {
            for (let j = 0; j < this.game_board[i].length; j++) {
                if (this.game_board[i][0] === 'open') {
                    for (let player of ['opponent', 'player']) {
                        if (this.game_board[i][j] === 'open') {
                            if (this.getGroupsOfThree(player, i, j) === true) {
                                {
                                    if (player == 'opponent') {
                                        this.opponent_move_conditions['opponent_three'] = i;
                                    } else {
                                        this.opponent_move_conditions['player_three'] = i;
                                    }
                                }
                            } else if (this.getGroupsOfTwo(player, i, j) === true) {
                                {
                                    if (player == 'opponent') {
                                        this.opponent_move_conditions['opponent_two'] = i;
                                    } else {
                                        this.opponent_move_conditions['player_two'] = i;
                                    }
                                }
                            }
                        }
                    }                     
                }
            }
        }

        this.determineOpponentMove();
    }

    determineOpponentMove() {
        let row: number = 0;
        if (this.opponent_move_conditions['opponent_three'] !== null) {
            row = this.opponent_move_conditions['opponent_three'];
        } else if (this.opponent_move_conditions['player_three'] !== null) {
            row = this.opponent_move_conditions['player_three'];
        } else if (this.opponent_move_conditions['opponent_two'] !== null) {
            row = this.opponent_move_conditions['opponent_two'];
        } else if (this.opponent_move_conditions['player_two'] !== null) {
            row = this.opponent_move_conditions['player_two'];
        } else {
            console.log(this.game_board);
            if (this.game_board[3][0] == 'open') {
                row = 3;
            } else if (this.game_board[2][0] == 'open') {
                row = 2;
            } else if (this.game_board[4][0] == 'open') {
                row = 4;
            } else if (this.game_board[1][0] == 'open') {
                row = 1;
            } else if (this.game_board[5][0] == 'open') {
                row = 5;
            } else if (this.game_board[0][0] == 'open') {
                row = 0;
            } else if (this.game_board[6][0] == 'open') {
                row = 6;
            }        
        }

            setTimeout(() => {
                this.playTurn(this.game_board[row]);
            }, 1000);

        this.populateOpponentMoveConditions();
    }

    populateOpponentMoveConditions() {
        this.opponent_move_conditions['player_three'] = null;
        this.opponent_move_conditions['opponent_three'] = null;
        this.opponent_move_conditions['player_two'] = null;
        this.opponent_move_conditions['opponent_two'] = null;
        this.opponent_move_conditions['player_one'] = null;
        this.opponent_move_conditions['opponent_one'] = null;
        this.opponent_move_conditions['no_pieces_played'] = null;
    }

    getGroupsOfThree(player: string, i: number, j: number) {
        if ((
                // vertical 3 in a row.
                this.game_board[i][j + 1] === player &&
                this.game_board[i][j + 2] === player &&
                this.game_board[i][j + 3] === player
            ) || 
            (
                // Make sure this is either the bottom row, or the row beneath is filled, or two rows beneath are empty.
                (
                    typeof this.game_board[i][j + 1] === 'undefined' ||
                    this.game_board[i][j + 1] !== 'open' || 
                    this.game_board[i][j + 2] === 'open'
                ) && 
                (
                    (
                        // horizontal 3 in a row.
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j] ===  player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j] ===  player) &&
                        (typeof this.game_board[i + 3] !== 'undefined' && this.game_board[i + 3][j] === player)
                    ) || (
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j] ===  player) &&
                        (typeof this.game_board[i - 3] !== 'undefined' && this.game_board[i - 3][j] === player)
                    ) || (
                        // horizontal 3 broken up.
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j] ===  player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j] ===  player) &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j] === player)
                    ) || (
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j] ===  player) &&
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j] === player)
                    ) || (
                        // diagonal 3 in a row.
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j + 1] ===  player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j + 2] ===  player) &&
                        (typeof this.game_board[i + 3] !== 'undefined' && this.game_board[i + 3][j + 3] === player)
                    ) || (
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j - 1] ===  player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j - 2] ===  player) &&
                        (typeof this.game_board[i + 3] !== 'undefined' && this.game_board[i + 3][j - 3] === player)
                    ) || (
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j + 1] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j + 2] ===  player) &&
                        (typeof this.game_board[i - 3] !== 'undefined' && this.game_board[i - 3][j + 3] === player)
                    ) || (
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j - 1] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j - 2] ===  player) &&
                        (typeof this.game_board[i - 3] !== 'undefined' && this.game_board[i - 3][j - 3] === player)
                    ) || (
                        // diagonal 3 broken up.
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j + 1] ===  player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j + 2] ===  player) &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j - 1] === player)
                    ) || (
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j - 1] ===  player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j - 2] ===  player) &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j + 1] === player)
                    ) || (
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j + 1] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j + 2] ===  player) &&
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j - 1] === player)
                    ) || (
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j - 1] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j - 2] ===  player) &&
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j + 1] === player)
                    )
                )
            )        
        ) 
        {
            return true;
        }

        return false;
    }

    getGroupsOfTwo(player: string, i: number, j: number) {
        if ((
                // vertical 2 in a row.
                this.game_board[i][j + 1] === player &&
                this.game_board[i][j + 2] === player &&
                // Make sure there's room above for 4.
                (typeof this.game_board[i][j - 1] !== 'undefined' && this.game_board[i][j - 1] === 'open')
            ) || 
            (
                // Make sure this is either the bottom row, or the row beneath is filled, or two rows beneath are empty.
                (
                    typeof this.game_board[i][j + 1] === 'undefined' ||
                    this.game_board[i][j + 1] !== 'open' || 
                    this.game_board[i][j + 2] === 'open'
                ) && 
                (
                    (
                        // horizontal 2 in a row.
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j] ===  player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j] ===  player) &&
                        (
                            (typeof this.game_board[i + 3] !== 'undefined' && this.game_board[i + 3][j] === 'open') ||
                            (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j] === 'open') 
                        )
                    ) || (
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j] ===  player) &&
                        (
                            (typeof this.game_board[i - 3] !== 'undefined' && this.game_board[i - 3][j] === 'open') ||
                            (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j] === 'open') 
                        )
                    ) || (
                        // horizontal 2 broken up.
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j] ===  player) &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j] === player) &&
                        (
                            (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j] === 'open') ||
                            (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j] === 'open') 
                        )
                    ) || (
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j] ===  'open') &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j] === player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j] === player)
                    ) || (
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j] ===  'open') &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 1][j] === player) &&
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 2][j] === player)
                    ) || (
                        // diagonal 2 in a row.
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j + 1] ===  player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j + 2] ===  player) &&
                        (
                            (typeof this.game_board[i + 3] !== 'undefined' && this.game_board[i + 3][j + 3] === 'open') ||
                            (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j - 1] === 'open') 
                        )
                    ) || (
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j - 1] ===  player) &&
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j - 2] ===  player) &&
                        (
                            (typeof this.game_board[i + 3] !== 'undefined' && this.game_board[i + 3][j - 3] === 'open') ||
                            (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j + 1] === 'open') 
                        )                    
                    ) || (
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j + 1] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j + 2] ===  player) &&
                        (
                            (typeof this.game_board[i - 3] !== 'undefined' && this.game_board[i - 3][j + 3] === 'open') ||
                            (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j - 1] === 'open') 
                        )    
                    ) || (
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j - 1] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j - 2] ===  player) &&
                        (
                            (typeof this.game_board[i - 3] !== 'undefined' && this.game_board[i - 3][j - 3] === 'open') ||
                            (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j + 1] === 'open') 
                        ) 
                    ) || (
                        // diagonal 2 broken up.
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j + 1] ===  player) &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j - 1] === player) &&
                        (
                            (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j + 2] === 'open') ||
                            (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j - 2] === 'open') 
                        ) 
                    ) || (
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j - 1] ===  player) &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j + 1] === player) &&
                        (
                            (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j - 2] === 'open') ||
                            (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j + 2] === 'open') 
                        )
                    ) || (
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j - 2] ===  player) &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j + 1] === player) &&
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j - 1] === 'open')
                    ) || (
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j - 1] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j + 2] === player) &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j + 1] === 'open')
                    ) || (
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j + 1] ===  player) &&
                        (typeof this.game_board[i - 2] !== 'undefined' && this.game_board[i - 2][j - 2] === player) &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j - 1] === 'open')
                    ) || (
                        (typeof this.game_board[i + 2] !== 'undefined' && this.game_board[i + 2][j + 2] ===  player) &&
                        (typeof this.game_board[i - 1] !== 'undefined' && this.game_board[i - 1][j - 1] === player) &&
                        (typeof this.game_board[i + 1] !== 'undefined' && this.game_board[i + 1][j + 1] === 'open')
                    )
                )
            )        
        ) 
        {
            return true;
        }

        return false;
    }

}
