import { Popup } from "./Popup.js";
export {PopupWithConfirmation}

class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupConfirmButton = this._popup.querySelector(".popup__submit-button");
    }

    handleOpenPopup({handleConfirmButtonFunction}) {
        // console.log("popup opened")
        this._handleConfirmButtonFunction = handleConfirmButtonFunction;
        super.handleOpenPopup();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupConfirmButton.addEventListener("click", () => {
            
            this._handleConfirmButtonFunction();
        })
    }
}