import './pages/index.css';
import {FormValidator} from "./components/FormValidator.js";  // указывать разрешение имортируемого файла всегда обязательно
import { PopupWithImage } from './components/PopupWithImage.js';
import {settings} from "./utils/validationSettings.js";
import {initialCards} from "./utils/InitialCards.js";
import {PopupWithForm} from "./components/PopupWithForm.js";
import {Section} from "./components/Section.js";
import {UserInfo} from "./components/UserInfo.js";
import {popupProfileAddButton, popupProfileEditButton, nameInput, jobInput} from "./utils/constants.js";
import {createCardElement} from "./utils/utils.js";

const newUser = new UserInfo(".profile__name", ".profile__activity"); // создаём объект класса, который будет хранить имя и описание профиля

const formEditProfile = new PopupWithForm(".edit-popup", {submitFormCallback: ({name, activity}) => {
  newUser.setUserInfo(name, activity);
}})

formEditProfile.setEventListeners(); // Была ошибка, связанная с тем, что слушатель добавлялся много раз при нажатии на кнопку вызова модального окна

popupProfileEditButton.addEventListener("click", () => { // слушатель для открытия модального окна при нажатии на кнопку
  nameInput.value = newUser.getUserInfo().userName; // инициализируем поля ввода, данными со страницы
  jobInput.value = newUser.getUserInfo().userInfo; // Важно отметить, что поля ввода теперь ссылаются на свойства объекта, и при их изменении, меняются данные на странице**

  formEditProfile.handleOpenPopup();
})

const formAddProfile = new PopupWithForm(".add-popup", { // Функционал и создание модального окна для добавления карточек
  submitFormCallback: ({name, link}) => {
    const newCard = createCardElement(link, name, () => {
      imagePopup.handleOpenPopup(link, name);
      imagePopup.setEventListeners();
    })
    cardsContainer.addItem(newCard.generateCard())
  }
})

formAddProfile.setEventListeners(); // слушатели для формы добавления

popupProfileAddButton.addEventListener("click", () => { // слушатель для открытия модального окна при нажатии на кнопку
  formAddProfile.handleOpenPopup();
})

const cardsContainer = new Section({items: initialCards,  // Инициализация карточек из массива при загрузке страницы
  renderer: (element) => {  
    const card = createCardElement(element.link, element.name, () => {
      imagePopup.handleOpenPopup(element.link, element.name);
      imagePopup.setEventListeners();
    })
    cardsContainer.addItem(card.generateCard());
  }}, ".elements")

cardsContainer.renderItems(); // обработка начальных изображений

const imagePopup = new PopupWithImage(".image-popup"); // создание модального окна для изображений

const addFormValidator = new FormValidator(formAddProfile.getPopupForm(), settings); // добавление валидатора для формы добавления карточек
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(formEditProfile.getPopupForm(), settings) // добавление валидатора для формы редактирования профиля
editFormValidator.enableValidation();