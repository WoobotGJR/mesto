const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active'); 
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
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
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add("popup__submit-button_disabled");
      buttonElement.setAttribute("disabled", true);
    }
    else {
      buttonElement.classList.remove("popup__submit-button_disabled");
      buttonElement.removeAttribute("disabled", true);
    } 
  }
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const submitButton = formElement.querySelector(".popup__submit-button")
  
    toggleButtonState(inputList, submitButton);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, submitButton);
      });
    });
  };  
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (event) => {
        event.preventDefault();
      })
      setEventListeners(formElement);
    })
  }
  
  enableValidation();