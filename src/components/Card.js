  export {Card}

  class Card {
    constructor(card, templateSelector, userId, {imagePopupFunction, likeSetFunction, likeRemoveFunction, cardDeleteFunction}) {
      // информация о карточке
      this._card = card;
      this._link = card.link;
      this._name = card.name;
      // селектор шаблона
      this._templateSelector = templateSelector;
      // Функции для работы с карточками
      this._imagePopupFunction = imagePopupFunction;
      this._likeSetFunction = likeSetFunction;
      this._likeRemoveFunction = likeRemoveFunction;
      this._cardDeleteFunction = cardDeleteFunction;
      // Данные о пользователе и карточке
      this._userId = userId;
      this._cardId = card._id;
      this._cardOwner = card.owner;
      this._likes = card.likes
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

      return cardElement;
    }

    _checkCardLike() {
      const isLiked = (user) => user._id === this._userId;

      return this._likes.some(isLiked);
    }

    refreshLikes(newLikes) {
      this._likes = newLikes;
    }

    refreshCardLikes() {
      this._likeButtonCounter.textContent = this._likes.length;

      if(this._checkCardLike()) {
        this._likeButton.classList.add("element__like-button_active");
      }
      else {
        this._likeButton.classList.remove("element__like-button_active");
      }
    }

    _toggleLikeButton() {
      if (!this._checkCardLike()) {
        this._likeSetFunction();
        // console.log("like set");
      }
      else {
        this._likeRemoveFunction();
        // console.log("like remove");
      }
    }

    // Делаем метод публичным, чтобы вызвать его из блока с удалением карточки через модальное окно с подтверждением
    handleDeleteCard() {
      this._element.remove();
      this._element = null
    }

    _setEventListeners() {
      this._likeButton.addEventListener("click", () => {
        this._toggleLikeButton();
      });

      this._element.querySelector(".element__image").addEventListener("click", () => {
        this._imagePopupFunction();
      });

      // Если айди автора карточки, не совпадает с айди пользователя, удалять DOM узел, отвечающий за кнопку удаления карточки
      if(this._userId === this._cardOwner._id) {
        this._element.querySelector(".element__delete-button").addEventListener("click", () => {
          
          this._cardDeleteFunction(this._cardId);
        })
      }
      else {
        this._element.querySelector(".element__delete-button").remove();
      }
    }

    generateCard() {
      this._element = this._getTemplate();

      this._likeButton = this._element.querySelector(".element__like-button");
      this._likeButtonCounter = this._element.querySelector(".element__like-counter");
      this._cardImage = this._element.querySelector(".element__image")
  
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._element.querySelector(".element__subtitle").textContent = this._name;

      this.refreshCardLikes();

      this._setEventListeners();
  
      return this._element
    }
  }