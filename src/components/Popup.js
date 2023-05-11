export {Popup}

class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    handleClosePopup() { // метод, закрывающий модальное окно
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose)
    }

    handleOpenPopup() { // метод, открывающий модальное окно
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose)
    }

    _handleEscClose = (event) => { // метод, позволяющий закрывать модальные окна при помощи Esc
        if(event.key === "Escape") {
            this.handleClosePopup();
          }
    }

    setEventListeners() {
        // слушатель, позволяющий закрывать модальные окна кнопкой закрытия
        this._popup.querySelector(".popup__close-button").addEventListener("click", () => {
            this.handleClosePopup();
        })

        //cлушатель, позволяющий закрывать модальные окна в любой области, не являющейся модальным окном
        this._popup.addEventListener("click", (event) => {
            if(event.target === event.currentTarget) {
                this.handleClosePopup();
              }
        })
    }
}