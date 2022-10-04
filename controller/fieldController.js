import InfoView from "/view/infoView.js"
import CellView from "/view/cellView.js"
import FieldModel from "/model/fieldModel.js"

class FieldController {
    #fieldElem
    #fieldModel
    #cells = [];

    constructor() {
        $(window).off("clickCell");
        this.#fieldElem = $("#field");
        this.#fieldElem.empty();
        for (let x = 0; x < 9; x++) {
            this.#cells.push(new CellView(this.#fieldElem, x));
        }
        this.#fieldModel = new FieldModel(this.cellsConverter());
        new InfoView();
        this.sendChPlayerEvt();

        $(window).on("clickCell", (evt)=> {
            this.nextTurn(evt.detail);
        })
    }

    nextTurn(cellNum) {
        this.#cells[cellNum].setSymbol(this.#fieldModel.getNextPlayer());
        this.#fieldModel.setCells(this.cellsConverter());
        let win = this.#fieldModel.nextTurn(cellNum);
        //events
        this.sendChPlayerEvt();
        if(win)
            this.sendWinEvt();
    }

    cellsConverter() {
        let cellsConv = [];
        this.#cells.forEach(cell => {
            let ch = cell.getSymbol();
            cellsConv.push(ch != -1?ch:"-");
        });
        return cellsConv;
    }

    sendChPlayerEvt() {
        window.dispatchEvent(
            new CustomEvent("changePlayer", {detail:{
                nextPlayer:this.#fieldModel.getNextPlayer()
            }})
        );
    }

    sendWinEvt() {
        $(window).off("clickCell");
        window.dispatchEvent(
            new CustomEvent("winGame", {detail:{
                winner:this.#fieldModel.getWinner(),
                turns:this.#fieldModel.getTurn()
            }})
        );
    }

}

export default FieldController