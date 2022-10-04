
class InfoView {
    #oNameElem
    #xNameElem
    #infoBoxP
    #winBoxP
    #oPlayerName
    #xPlayerName

    constructor() {
        this.#oNameElem = $("#oPlayer");
        this.#xNameElem = $("#xPlayer");
        this.#oPlayerName = "";
        this.#xPlayerName = "";
        this.#setPlayerNames();
        this.#infoBoxP = $("#infoBox>p");
        this.#winBoxP = $("#winBox>p");
        this.setInfoBox();
        this.setWinBox();

        $(window).off("changePlayer");
        $(window).off("winGame");

        $(window).on("changePlayer", (evt)=> {
            this.setInfoBox(evt.detail.nextPlayer);
        })

        $(window).on("winGame", (evt)=> {
            this.setWinBox(evt.detail.winner, evt.detail.turns);
        })
    }

    #setPlayerNames() {
        this.#oPlayerName = this.#oNameElem.val();
        this.#xPlayerName = this.#xNameElem.val();
    }

    setInfoBox(nextPlayer=-1) {
        if(nextPlayer == -1)
            this.#infoBoxP.text("VÉGE");
        else
            this.#infoBoxP.text(`${nextPlayer?this.#xPlayerName:this.#oPlayerName} játékos következik`);
    }

    setWinBox(winner=-1, turns=0) {
        if(winner == -1)
            this.#winBoxP.text("");
        else {
            this.setInfoBox(-1);
            if(winner == 2)
                this.#winBoxP.text(`Döntetlen! (${turns} kör)`);
            else
                this.#winBoxP.text(`${winner?this.#xPlayerName:this.#oPlayerName} játékos nyert! Gratulálok! (${turns} kör)`);
        }
    }
}

export default InfoView