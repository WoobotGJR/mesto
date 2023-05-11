import './pages/index.css';
import {FormValidator} from "./components/FormValidator.js";  // указывать разрешение имортируемого файла всегда обязательно
import {settings} from "./utils/validationSettings.js";
import {Card} from "./components/Card.js";
import {initialCards} from "./utils/InitialCards.js";
import {PopupWithForm} from "./components/PopupWithForm.js";
import {Section} from "./components/Section.js";
import {UserInfo} from "./components/UserInfo.js";
import {addButton,editButton, nameInput, jobInput} from "./utils/constants.js";
import {createImagePopup} from "./utils/utils.js";

const newUser = new UserInfo(".profile__name", ".profile__activity"); // создаём объект класса, который будет хранить имя и описание профиля

const formEditProfile = new PopupWithForm(".edit-popup", {submitFormCallback: ({name, activity}) => {
  newUser.setUserInfo(name, activity);
}})

formEditProfile.setEventListeners(); // Была ошибка, связанная с тем, что слушатель добавлялся много раз при нажатии на кнопку вызова модального окна

editButton.addEventListener("click", () => { // слушатель для открытия модального окна при нажатии на кнопку
  nameInput.value = newUser.getUserInfo().userName; // инициализируем поля ввода, данными со страницы
  jobInput.value = newUser.getUserInfo().userInfo; // Важно отметить, что поля ввода теперь ссылаются на свойства объекта, и при их изменении, меняются данные на странице**

  formEditProfile.handleOpenPopup();
})

const formAddProfile = new PopupWithForm(".add-popup", { // Функционал и создание модального окна для добавления карточек
  submitFormCallback: ({name, link}) => {
    const newCard = new Card(link, name, "#card-element", {
      handleCardClick: () => {
        createImagePopup(link, name);
      }})
    const newCardElement = new Section({items: [{name, link}], 
      renderer: () => {
        newCardElement.addItem(newCard.generateCard());
      }}, ".elements")
    newCardElement.renderItems();
  }
})

formAddProfile.setEventListeners();

addButton.addEventListener("click", () => { // слушатель для открытия модального окна при нажатии на кнопку
  formAddProfile.handleOpenPopup();
})

const starterCards = new Section({items: initialCards,  // Инициализация карточек из массива при загрузке страницы
  renderer: (element) => {
    const card = new Card(element.link, element.name, "#card-element", {
      handleCardClick: () => {
        createImagePopup(element.link, element.name)
      }})
      starterCards.addItem(card.generateCard());
  }}, ".elements")

starterCards.renderItems();

const addFormValidator = new FormValidator(formAddProfile.getPopupForm(), settings); // добавление валидатора для формы добавления карточек
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(formEditProfile.getPopupForm(), settings) // добавление валидатора для формы редактирования профиля
editFormValidator.enableValidation();