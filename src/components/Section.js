export {Section}

class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        // this.iterator = 0;
    }

    renderItems() {
        this._items.forEach(element => {
            this._renderer(element);
            // console.log("element rendered")
        });
    }

    addItem(element) {
        this._container.prepend(element);
        // this.iterator++;
        // console.log(`element ${this.iterator} added`)
    }
}

// iterator добавлен для поиска ошибок