import  {FormValidator} from "./FormValidator.js";  // указывать разрешение имортируемого файла всегда обязательно
import {Card} from "./Card.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".edit-popup");
const editPopupForm = editPopup.querySelector(".popup__form");
const addPopup = document.querySelector(".add-popup");
const addPopupForm = addPopup.querySelector(".popup__form")
const closeButtons = document.querySelectorAll(".popup__close-button");
const addFormElement = document.querySelector(".popup__container_type_add");
const editFormElement = document.querySelector(".popup__container_type_edit");
const nameInput = editFormElement.querySelector(".popup__input_type_name-text");
const jobInput = editFormElement.querySelector(".popup__input_activity-text"); 
const profileName = document.querySelector(".profile__name");
const placeNameInput = addFormElement.querySelector(".popup__input_type_place-name-text"); 
const imageLinkInput = addFormElement.querySelector(".popup__input_image-link-text") 
const profileActivity = document.querySelector(".profile__activity"); 
const cardElements = document.querySelector(".elements"); 
const popups = document.querySelectorAll(".popup");
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://images.unsplash.com/photo-1627327719720-d1aa40985232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Челябинская область',
    link: 'https://images.unsplash.com/photo-1575738171526-df0217663296?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80'
  },
  {
    name: 'Иваново',
    link: 'https://images.unsplash.com/photo-1642962036393-91c3839a8b7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1665073140507-0bad3d962476?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1503&q=80'
  },
  {
    name: 'Холмогорский район',
    link: 'https://images.unsplash.com/photo-1590160447847-5f3246b25644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=719&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1676466920684-5d1aae90c9c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }
];

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error_active"
}

function openPopup(popup) {
  popup.classList.add("popup_opened"); // Добавлены функции открытия и (ниже) закрытия попапов.

  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(event) {
  if(event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");

    closePopup(openedPopup);
  }
}

for (let i = 0; i < initialCards.length; i++) { // заполнение страницы карточками из списка выше
    const newCard = new Card(initialCards[i].link, initialCards[i].name, "#card-element")
    cardElements.append(newCard.generateCard());
}

editButton.addEventListener("click", () => {
  openPopup(editPopup);

  nameInput.value = profileName.textContent; //при открытии попапа инициализируем формы теми, которые введены в профиле
  jobInput.value = profileActivity.textContent; //при открытии попапа инициализируем формы теми, которые введены в профиле
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

// document.querySelector(".element__image").addEventListener("keydown", (event) => {
//   if(event.key === "Escape") {
//     console.log("a")
//     closePopup(imagePopup);
//   }
// })

// находим все крестики проекта по универсальному селектору
// const closeButtons = document.querySelectorAll('.popup__close');

// closeButtons.forEach((button) => {
//   находим 1 раз ближайший к крестику попап 
//   const popup = button.closest('.popup');
//   устанавливаем обработчик закрытия на крестик
//   button.addEventListener('click', () => closePopup(popup));
// });

// Текст выше является альтернативой для цикла for ниже...

for(let i = 0; i < closeButtons.length; i++) { // функция закрытия крестиком для модальных окон
  closeButtons[i].addEventListener("click", (event) => {

    const popup = event.target.closest(".popup")
    
    closePopup(popup);
  });

}

editFormElement.addEventListener('submit', (event) => { // слушатель, редактирующий имя профиля
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  // console.log("Значения сохранены");

  closePopup(editPopup);
}); 

addFormElement.addEventListener("submit", (event) => { // слушатель, добавляющий карточки на страницу
  event.preventDefault();

  const newCard = new Card(imageLinkInput.value, placeNameInput.value, "#card-element")
  cardElements.prepend(newCard.generateCard());

  closePopup(addPopup);
  
  event.target.reset();
})

popups.forEach(element => { // функция для закрытия попапов, при клике в любой области, не являющейся модальным окном
  element.addEventListener("click", (event) => {
    // console.log(event.currentTarget)
    // console.log(event.target)
    if(event.target === event.currentTarget) {
      closePopup(element); //была ошибка связанная с неоптимальным поиском попапа
    }
  })
});

const addFormValidator = new FormValidator(addPopupForm, settings); // добавление валидатора для формы добавления карточек
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(editPopupForm, settings) // добавление валидатора для формы редактирования профиля
editFormValidator.enableValidation();