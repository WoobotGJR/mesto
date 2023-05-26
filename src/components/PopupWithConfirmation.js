import { Popup } from "./Popup.js";
export {PopupWithConfirmation}

class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupConfirmButton = this._popup.querySelector(".popup__submit-button");
    }

    saveInitialText() {
        this._initialText = this._popupButton.textContent
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._popupButton.textContent = "Сохранение..."
        }
        else {
            this._popupButton.textContent = this._initialText;
        }
    }

    handleOpenPopup({handleConfirmButtonFunction}) {
        // console.log("popup opened")
        this._handleConfirmButtonFunction = handleConfirmButtonFunction;
        super.handleOpenPopup();
    }

    setEventListeners() {
        super.setEventListeners();
        // в подобных случаях лучше пользоваться свойством submit вместо click, и вешать обработчик на форму, а не на кнопку модального окна.
        // иначе это может привести к неожиданному поведению страницы, например, перезагрузке страницы при 
        // самом первом удалении карточки.
        this._popup.querySelector(".popup__form").addEventListener("submit", (event) => {
            event.preventDefault();
            
            this._handleConfirmButtonFunction();
        })
    }
}