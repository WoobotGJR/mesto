export {Card}

const imagePopupImage = document.querySelector(".image-popup__image");
const imagePopupTextContent = document.querySelector(".image-popup__subtitle");
const popupImage = document.querySelector(".image-popup"); // Изображение попапов найдено.

  class Card {
    constructor(link, name, templateSelector) {
      this._link = link;
      this._name = name;
      this._templateSelector = templateSelector;
      // this._cardTemplate = document.querySelector("#card-element").content;
      // this.cardElement = cardTemplate.querySelector(".element").cloneNode(true);
      // this.cardImage = cardElement.querySelector(".element__image");
      // this.cardName = cardElement.querySelector(".element__subtitle");
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

      return cardElement;
    }

    _deleteButton() {
      this._element.querySelector(".element__delete-button").addEventListener("click", () => {
        this._element.remove();
      })
    }

    _toggleLikeButton() {
      this._element.querySelector(".element__like-button").addEventListener("click", (event) => {
        event.target.classList.toggle("element__like-button_active");
      })
    }

    _handleOpenPopup() {
      this._element.querySelector(".element__image").addEventListener("click", () => {
        imagePopupImage.src = this._link;
        imagePopupImage.alt = this._name;
        imagePopupTextContent.textContent = this._name;

        popupImage.classList.add("popup_opened");
      })
    }

    _setEventListeners() {
      this._deleteButton();
      this._toggleLikeButton();
      this._handleOpenPopup();
    }

    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      console.log(this._element)

      this._element.querySelector(".element__image").src = this._link;
      this._element.querySelector(".element__image").alt = this._name;
      this._element.querySelector(".element__subtitle").textContent = this._name;

      console.log(this._element )

      return this._element
    }
  }