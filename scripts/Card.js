  import { imagePopupImage, imagePopupTextContent, popupImage } from "./Constants.js";
  import { closeByEscape } from "./index.js";

  class Card {
    constructor(link, name, templateSelector) {
      this._link = link;
      this._name = name;
      this._templateSelector = templateSelector;
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

    _handleOpenPopup() {
      imagePopupImage.src = this._link;
      imagePopupImage.alt = this._name;
      imagePopupTextContent.textContent = this._name;

      document.addEventListener("keydown", closeByEscape);

      popupImage.classList.add("popup_opened");
    }

    _setEventListeners() {
      this._element.querySelector(".element__delete-button").addEventListener("click", () => { //если передать функцию как колбэк без стрелочной функции, то произойдёт ошибка (разобраться)
        this._handleDeleteButton();
      });
      this._element.querySelector(".element__like-button").addEventListener("click", () => {
        this._toggleLikeButton();
      });
      this._element.querySelector(".element__image").addEventListener("click", () => {
        this._handleOpenPopup();
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

  export {Card}