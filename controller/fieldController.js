import InfoView from "../view/infoView.js"
import CellView from "../view/cellView.js"
import FieldModel from "../model/fieldModel.js"

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
        this.#fieldModel = new FieldModel();
        new InfoView();
        this.sendChPlayerEvt();

        $(window).on("clickCell", (evt)=> {
            this.nextTurn(evt.detail);
        })
    }

    nextTurn(cellNum) {
        this.#cells[cellNum].setSymbol(this.#fieldModel.getNextPlayer());
        let win = this.#fieldModel.nextTurn(cellNum);
        //events
        this.sendChPlayerEvt();
        if(win) {
            $(window).off("clickCell");
            this.sendWinEvt();
        }
    }

    sendChPlayerEvt() {
        window.dispatchEvent(
            new CustomEvent("changePlayer", {detail:{
                nextPlayer:this.#fieldModel.getNextPlayer()
            }})
        );
    }

    sendWinEvt() {
        console.log(this.#fieldModel.getWinner());
        window.dispatchEvent(
            new CustomEvent("winGame", {detail:{
                winner:this.#fieldModel.getWinner(),
                turns:this.#fieldModel.getTurn()
            }})
        );
    }

}

export default FieldController