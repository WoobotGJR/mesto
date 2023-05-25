export {Section}

class Section {
    constructor({renderer}, containerSelector) {
        // this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    // Из за асинхонности использовать items в качестве принимаемого аргумента не имеет смысла

    renderItems(cards) {
        cards.forEach(card => {
            this._renderer(card);
            // console.log(card) // выводит объект карточки
        });
    }

    addItem(element) {
        // console.log(element);
        this._container.prepend(element);
    }
}
