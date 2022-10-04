
class CellView {
    #cellElem
    #pElem
    #pos
    #symbol

    constructor(parrentElem, pos=0) {
        const elem = '<div class="cell"><p></p></div>';
        parrentElem.append(elem);
        this.#cellElem = parrentElem.children(".cell:last-child");
        this.#pElem = this.#cellElem.children("p:last-child");
        this.#pos = pos;
        this.#symbol = -1;
        this.#cellElem.off("click");
        this.#cellElem.on("click", ()=> {
            this.onClick();
        })
    }

    setSymbol(symbol) {
        if(this.#symbol == -1 && symbol != -1) {
            this.#symbol = symbol;
            this.#pElem.text(this.#symbol?"X":"O");
            this.#cellElem.off("click");
        }
    }

    getSymbol() {
        return this.#symbol;
    }

    onClick() {
        let cEvent = new CustomEvent("clickCell", {detail:(this.#pos)});
        window.dispatchEvent(cEvent);
    }
}

export default CellView