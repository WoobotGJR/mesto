const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass); 
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } 
    else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }
  
  const disableButton = (button, settings) => {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute("disabled", true);
  }

  const enableButton = (button, settings) => {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute("disabled", true);
  }

  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, settings);
    }
    else {
      enableButton(buttonElement, settings);
    } 
  }
  
  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const submitButton = formElement.querySelector(settings.submitButtonSelector)

    formElement.addEventListener("reset", () => { //Слушатель с аргументом "reset срабатывает тогда, когда к форме применяется метод reset (185 строка index.js)"
      disableButton(submitButton, settings);
    })
  
    toggleButtonState(inputList, submitButton, settings);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, submitButton, settings);
      });
    });
  };  
  
  const enableValidation = (settings) => {    
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (event) => {
        event.preventDefault();
      })
      setEventListeners(formElement, settings);
    })
  }
  
  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "form__input-error_active"
  });