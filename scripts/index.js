import  {FormValidator} from "./FormValidator.js";  // указывать разрешение имортируемого файла всегда обязательно
import {Card} from "./Card.js";
import {initialCards} from "./InitialCards.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".edit-popup");
const formEditProfile = editPopup.querySelector(".popup__form");
const addPopup = document.querySelector(".add-popup");
const formAddProfile = addPopup.querySelector(".popup__form")
const closeButtons = document.querySelectorAll(".popup__close-button");
const formAddElement = document.querySelector(".popup__container_type_add");
const formEditElement = document.querySelector(".popup__container_type_edit");
const nameInput = formEditElement.querySelector(".popup__input_type_name-text");
const jobInput = formEditElement.querySelector(".popup__input_activity-text"); 
const profileName = document.querySelector(".profile__name");
const placeNameInput = formAddElement.querySelector(".popup__input_type_place-name-text"); 
const imageLinkInput = formAddElement.querySelector(".popup__input_image-link-text") 
const profileActivity = document.querySelector(".profile__activity"); 
const cardElements = document.querySelector(".elements"); 
const popups = document.querySelectorAll(".popup");

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error_active"
}

function createCardElement(link, name, selector) {
  const newCardElement = new Card(link, name, selector)

  return newCardElement.generateCard()
}

function openPopup(popup) {
  popup.classList.add("popup_opened"); // Добавлены функции открытия и (ниже) закрытия попапов.

  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  // console.log("listener deleted")
  document.removeEventListener("keydown", closeByEscape);

  editFormValidator.refreshValidation(); //ошибки полей валидации очищаются при закрытии модального окна
  addFormValidator.refreshValidation();
}

function closeByEscape(event) { // функция закрытия модальных окон нажатем клавиши Esc
  if(event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    // console.log("closed")
    closePopup(openedPopup);
  }
}

for (let i = 0; i < initialCards.length; i++) { // заполнение страницы карточками из списка выше
  cardElements.append(createCardElement(initialCards[i].link, initialCards[i].name, "#card-element"));
}

editButton.addEventListener("click", () => {
  openPopup(editPopup);

  nameInput.value = profileName.textContent; //при открытии попапа инициализируем формы теми, которые введены в профиле
  jobInput.value = profileActivity.textContent; //при открытии попапа инициализируем формы теми, которые введены в профиле
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

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

formEditElement.addEventListener('submit', (event) => { // слушатель, редактирующий имя профиля
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  // console.log("Значения сохранены");

  closePopup(editPopup);
}); 

formAddElement.addEventListener("submit", (event) => { // слушатель, добавляющий карточки на страницу
  event.preventDefault();

  cardElements.prepend(createCardElement(imageLinkInput.value, placeNameInput.value, "#card-element"));

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

const addFormValidator = new FormValidator(formAddProfile, settings); // добавление валидатора для формы добавления карточек
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(formEditProfile, settings) // добавление валидатора для формы редактирования профиля
editFormValidator.enableValidation();

export {openPopup}