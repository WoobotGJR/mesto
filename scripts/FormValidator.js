export {FormValidator};

class FormValidator {
    constructor(formElement, settings) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formElement = formElement;
		this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass); 
    }

	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    	errorElement.textContent = '';
	}

	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} 
		else {
			this._hideInputError(inputElement);
		}
	}

	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		}); 
	}

	_disableButton() {
		this._submitButton.classList.add(this._inactiveButtonClass);
   		this._submitButton.setAttribute("disabled", true);
	}

	_enableButton() {
		this._submitButton.classList.remove(this._inactiveButtonClass);	
		this._submitButton.removeAttribute("disabled", true);
	}

	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._disableButton();
		}
		else {
			this._enableButton();
		}
	}

	_setEventListeners() {
		this._formElement.addEventListener("reset", () => { // срабатывает при обновлении формы, необходимо, чтобы при повторном открытии кнопка модального окна была неактивна 
		    this._disableButton(this._submitButton);
		})
	  
		this._toggleButtonState();
	  
		this._inputList.forEach((inputElement) => {
		    inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
	}

	enableValidation() {
		this._setEventListeners();
	}
}