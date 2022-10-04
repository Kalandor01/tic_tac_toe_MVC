
class FieldModel {
    #nextPlayer
    #turn
    #winner
    #cells = []

    constructor() {
        this.#nextPlayer = 0;
        this.#turn = 0;
        this.#winner = -1;
        for (let x = 0; x < 9; x++) {
            this.#cells.push(-1);
        }
    }

    getNextPlayer() {
        return this.#nextPlayer;
    }

    getWinner() {
        return this.#winner;
    }

    getTurn() {
        return this.#turn;
    }

    nextTurn(cellNum) {
        this.#cells[cellNum] = this.#nextPlayer;
        this.#nextPlayer = (this.#nextPlayer + 1) % 2;
        this.#turn++;
        if(this.#turn >= 5) {
            this.checkWinner(cellNum);
            if(this.#turn >= 9 && this.#winner == -1)
                this.#winner = 2;
        }
        return this.#winner != -1;
    }

    checkLine(cellNum) {
        let lineBegin = cellNum - (cellNum % 3);
        return  this.#cells[lineBegin] == this.#cells[lineBegin+1] &&
                this.#cells[lineBegin+1] == this.#cells[lineBegin+2]
    }

    checkCol(cellNum) {
        let columnBegin = cellNum % 3;
        return  this.#cells[columnBegin] == this.#cells[columnBegin+3] &&
                this.#cells[columnBegin+3] == this.#cells[columnBegin+6]
    }

    checkDiagonal(thisSymbol) {
        return  this.#cells[4] == thisSymbol &&
                ((this.#cells[0] == this.#cells[4] && this.#cells[4] == this.#cells[8]) ||
                (this.#cells[2] == this.#cells[4] && this.#cells[4] == this.#cells[6]))
    }

    checkWinner(cellNum) {
        let thisSymbol = this.#cells[cellNum];
        if(this.checkLine(cellNum) || this.checkCol(cellNum) || this.checkDiagonal(thisSymbol))
            this.#winner = thisSymbol;
    }
}

export default FieldModel