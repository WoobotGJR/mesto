  export {Card}

  class Card {
    constructor(link, name, templateSelector, {handleCardClick}) {
      this._link = link;
      this._name = name;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

      return cardElement;
    }

    _handleDeleteButton() {
      this._element.remove();
      this._element = null
    }

    _toggleLikeButton() {
      this._element.querySelector(".element__like-button").classList.toggle("element__like-button_active");
    }

    _setEventListeners() {
      this._element.querySelector(".element__delete-button").addEventListener("click", () => { //если передать функцию как колбэк без стрелочной функции, то произойдёт ошибка (разобраться)
        this._handleDeleteButton();
      });
      this._element.querySelector(".element__like-button").addEventListener("click", () => {
        this._toggleLikeButton();
      });
      this._element.querySelector(".element__image").addEventListener("click", () => {
        this._handleCardClick();
      });
    }

    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();

      this._element.querySelector(".element__image").src = this._link;
      this._element.querySelector(".element__image").alt = this._name;
      this._element.querySelector(".element__subtitle").textContent = this._name;

      return this._element
    }
  }