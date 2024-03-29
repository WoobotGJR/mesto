import './pages/index.css';
import {FormValidator} from "./components/FormValidator.js";  // указывать разрешение имортируемого файла всегда обязательно
import { PopupWithImage } from './components/PopupWithImage.js';
import {settings} from "./utils/validationSettings.js";
import {PopupWithForm} from "./components/PopupWithForm.js";
import {Section} from "./components/Section.js";
import {UserInfo} from "./components/UserInfo.js";
import {popupProfileAddButton, popupProfileEditButton, popupProfileEditAvatarButton, nameInput, jobInput} from "./utils/constants.js";
import { Card } from './components/Card.js';
import {Api} from './components/Api.js';
import { PopupWithConfirmation } from './components/PopupWithConfirmation.js';

// Создание переменной для профиля пользователя
let userId;

// Создание апи
const api = new Api({baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66", headers: {
  authorization: '5543044c-fd15-4f3f-9950-66b2e3519db9',
  'Content-Type': 'application/json'
}})

// Создание модального окна с изображением
const imagePopup = new PopupWithImage(".image-popup");

imagePopup.setEventListeners();

// создаём объект класса, который будет хранить имя, описание профиля и аватар пользователя
const newUser = new UserInfo(".profile__name", ".profile__activity", ".profile__avatar");

// Функция по созданию карточек была перенесена из utils.js в index.js по причине того, что она требует доступа к
// таким классам как PopupWithForm, которые объявляются в index.js (в противном случае придётся многое экспортировать из index.js в utils.js)
function createCardElement(cardResponse) {
  // console.log(cardResponse)
  const newCardElement = new Card(cardResponse, "#card-element", userId, {
    imagePopupFunction: () => {
      imagePopup.handleOpenPopup(cardResponse.link, cardResponse.name);
    },
    likeSetFunction: () => {
      api.setLike(cardResponse._id)
        .then(res => {
          newCardElement.refreshLikes(res.likes)
          newCardElement.refreshCardLikes();
        })
        .catch(err => {
          console.log(`Like setting error: ${err}`)
        })
    },
    likeRemoveFunction: () => {
      api.deleteLike(cardResponse._id)
        .then(res => {
          newCardElement.refreshLikes(res.likes)
          newCardElement.refreshCardLikes()
        })
        .catch(err => {
          console.log(`Like deletation error: ${err}`);
        })
    },
    cardDeleteFunction: (cardId) => {
      popupDeletetionCardConfirm.handleOpenPopup({
        handleConfirmButtonFunction: () => {
          popupDeletetionCardConfirm.saveInitialText();
          popupDeletetionCardConfirm.renderLoading(true)
          api.deleteUserCard(cardId)
           .then(() => {
            newCardElement.handleDeleteCard();
            popupDeletetionCardConfirm.handleClosePopup();
          })
          .catch(err => {
            console.log(`Card deletation error: ${err}`)
          })
          .finally(() => {popupDeletetionCardConfirm.renderLoading(false)})
        }
      })
    }
  });
  // console.log(newCardElement.generateCard());
  return newCardElement.generateCard();
} 

// Обработчик карточек
const cardsList = new Section({
  renderer: (cards) => {
    // console.log(card); // выводит объект карточки
    cardsList.addItem(createCardElement(cards));
}}, ".elements"
)

// Карточки должны отрисовываться только после получения id пользователя, 
// т.к. это требуется для отображения кнопки удаления т.к. должен использоваться 
// Promise.all или в крайнем случае вложенный запрос
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userInitialInfo]) => {
    // Заполнение страницы начальными карточками
    cardsList.renderItems(initialCards);

    // Инициализация начальных данных о профиле пользователя
    newUser.setUserInfo(userInitialInfo.name, userInitialInfo.about);
    newUser.setUserAvatar(userInitialInfo.avatar);
    userId = userInitialInfo._id;
  })
  .catch(err => {
    console.log(`Initial info loading error - ${err}`);
  })

// Функционал и создание модального окна для добавления карточек
const formAddCard = new PopupWithForm(".add-popup", {
  submitFormCallback: ({name, link}) => {
    formAddCard.saveInitialText();
    formAddCard.renderLoading(true)
    api.addUserCard({link: link, name: name})
      .then(res => {
        // console.log(`response - ${res}`);
        cardsList.addItem(createCardElement(res));
        // Попап не должен закрываться если возникнет серверная ошибка, поэтому функционал закрытия следует поместить в блок then соответствующей цепочки промиcов
        formAddCard.handleClosePopup();
      })
      .catch(err => {
        console.log(`Card adding error: ${err}`)
      })
      .finally(() => {formAddCard.renderLoading(false)})
  }
})

// слушатели для формы добавления
formAddCard.setEventListeners();

// слушатель для открытия модального окна при нажатии на кнопку
popupProfileAddButton.addEventListener("click", () => {
  formAddCard.handleOpenPopup();
})

// функционал сабмита модального окна редактирования
const formEditProfile = new PopupWithForm(".edit-popup", {
  submitFormCallback: ({name, activity}) => {
    formEditProfile.saveInitialText()
    formEditProfile.renderLoading(true); // Обработка загрузки данных пользователя
    api.setUserInfo({username: name, userInfo: activity})
      .then(res => {
        newUser.setUserInfo(res.name, res.about);
        //Попап не должен закрываться если возникнет серверная ошибка, поэтому функционал закрытия следует поместить в блок then соответствующей цепочки промиcов
        formEditProfile.handleClosePopup();
      })
      .catch(err => {
        console.log(`Editing name and about error - ${err}`)})
      .finally(() => {formEditProfile.renderLoading(false)})
  }
})

// слушатель для формы редактирования
formEditProfile.setEventListeners();

// слушатель на кнопку редактирования
popupProfileEditButton.addEventListener("click", () => {
  nameInput.value = newUser.getUserInfo().userName; // инициализируем поля ввода, данными со страницы
  jobInput.value = newUser.getUserInfo().userInfo; // Важно отметить, что поля ввода теперь ссылаются на свойства объекта, и при их изменении, меняются данные на странице**

  formEditProfile.handleOpenPopup();
})  

// Объявление и функционал для модального окна с редактированием аватара пользователя
const formAvatarEditProfile = new PopupWithForm(".avatar-edit-popup", {
  submitFormCallback: ({avatar}) => {
    formAvatarEditProfile.saveInitialText();
    formAvatarEditProfile.renderLoading(true);
    api.setUserAvatar({avatar: avatar})
      .then(res => {
        newUser.setUserAvatar(res.avatar);
        //Попап не должен закрываться если возникнет серверная ошибка, поэтому функционал закрытия следует поместить в блок then соответствующей цепочки промиcов
        formAvatarEditProfile.handleClosePopup();
      })
      .catch(err => {
        console.log(`Set Avatar Error - ${err}`)
      })
      .finally(() => {
        formAvatarEditProfile.renderLoading(false);
      })
  }
});

// Слушатели для модального окна с редактированием аватара пользователя
formAvatarEditProfile.setEventListeners();

popupProfileEditAvatarButton.addEventListener("click", () => {
  formAvatarEditProfile.handleOpenPopup();
})

// Объявление и функционал модального окна с подтверждением удаления карточки
const popupDeletetionCardConfirm = new PopupWithConfirmation(".card-delete-popup");

// Слушатели для модального окна с подтверждением
popupDeletetionCardConfirm.setEventListeners();

// добавление валидатора для формы добавления карточек
const addFormValidator = new FormValidator(formAddCard.getPopupForm(), settings);
addFormValidator.enableValidation();

// добавление валидатора для формы редактирования профиля
const editFormValidator = new FormValidator(formEditProfile.getPopupForm(), settings);
editFormValidator.enableValidation();

// добавление валидатора для формы обновления аватара
const avatarEditValidator = new FormValidator(formAvatarEditProfile.getPopupForm(), settings);
avatarEditValidator.enableValidation();