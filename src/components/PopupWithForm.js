import {Popup} from "./Popup.js";
export {PopupWithForm}

class PopupWithForm extends Popup {
    constructor(popupSelector, {submitFormCallback}) {
        super(popupSelector);
        this._submitCallback = submitFormCallback;
        this._popupForm = this._popup.querySelector(".popup__form");
        this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
        // this.iterator = 0;
    }

    _getInputValues() {
        const inputValues = {};

        this._inputList.forEach(inputElement => {
            // this.iterator++
            // console.log(this.iterator)
            inputValues[inputElement.name] = inputElement.value;
        })
        
        return inputValues;
    }

    getPopupForm() {
        return this._popupForm;
    }

    setEventListeners() {
        this._popupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            this._submitCallback(this._getInputValues());
            this.handleClosePopup();
        })

        super.setEventListeners();

        // console.log("listener has been added")
    }

    handleClosePopup() {
        super.handleClosePopup();

        this._popupForm.reset(); // reset необходим для деактивации кнопки submit после повторного открытия модального окна
    }
}

// Итератор был необходим для обнаружения ошибки со слушателями событий