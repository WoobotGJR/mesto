const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".edit-popup");
const addPopup = document.querySelector(".add-popup");
const imagePopup = document.querySelector(".image-popup");
const closeButtons = document.querySelectorAll(".popup__close-button");
const likeButtons = document.querySelectorAll(".element__like-button");
const addFormElement = document.querySelector(".popup__container_type_add");
const editFormElement = document.querySelector(".popup__container_type_edit");
const nameInput = editFormElement.querySelector(".popup__input_type_name-text");
const jobInput = editFormElement.querySelector(".popup__input_activity-text"); 
const profileName = document.querySelector(".profile__name");
const placeNameInput = addFormElement.querySelector(".popup__input_type_place-name-text"); 
const imageLinkInput = addFormElement.querySelector(".popup__input_image-link-text") 
const profileActivity = document.querySelector(".profile__activity");
const cardElements = document.querySelector(".elements");
const imagePopupImage = document.querySelector(".image-popup__image");
const imagePopupTextContent = document.querySelector(".image-popup__subtitle");
const popupImage = document.querySelector(".image-popup"); // Изображение попапов найдено.
const popups = document.querySelectorAll(".popup");
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function openPopup(popup) {
  popup.classList.add("popup_opened"); // Добавлены функции открытия и (ниже) закрытия попапов.
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function createCardElement(link, name) {

    const cardTemplate = document.querySelector("#card-element").content;
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true); //разобраться с cloneNode дополнительно
    const cardImage = cardElement.querySelector(".element__image");
    const cardName = cardElement.querySelector(".element__subtitle");

    cardImage.src = link;
    cardImage.alt = name; // в качестве атрибута alt в изображение вставляется назваание карточки
    cardName.textContent = name;

    cardElement.querySelector(".element__like-button").addEventListener("click", (event) => { // конпка лайка карточки

        event.target.classList.toggle("element__like-button_active");

    })

    cardElement.querySelector(".element__delete-button").addEventListener("click", () => { // кнопка удаления карточки

       cardElement.remove();
       
    })

    cardElement.querySelector(".element__image").addEventListener("click", () => { // попап каротчки

      imagePopupImage.src = cardImage.src;
      imagePopupImage.alt = cardImage.textContent; // атрибут alt инициализируется названием картинки
      imagePopupTextContent .textContent = cardName.textContent;

      openPopup(popupImage);

    })

    // cardElement.querySelector(".element__image").addEventListener("keydown", (event) => {
    //   console.log(event.key)
    //   if(event.key === "Escape") {
    //     closePopup(imagePopup);
    //   }
    // })

    return cardElement

}

for (let i = 0; i < initialCards.length; i++) {

    cardElements.append(createCardElement(initialCards[i].link, initialCards[i].name));

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

for(let i = 0; i < closeButtons.length; i++) {

  closeButtons[i].addEventListener("click", (event) => {

    const popup = event.target.closest(".popup")
    
    closePopup(popup);

  });

}

editFormElement.addEventListener('submit', (event) => {

    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;
    // console.log("Значения сохранены");

    closePopup(editPopup);

}); 

addFormElement.addEventListener("submit", (event) => {

  event.preventDefault();

  cardElements.prepend(createCardElement(imageLinkInput.value, placeNameInput.value));

  closePopup(addPopup);
  
  event.target.reset();
  
})

popups.forEach(element => { // функция для закрытия попапов, при клике в любой области, не являющейся модальным окном
  element.addEventListener("click", (event) => {
    // console.log(event.currentTarget)
    // console.log(event.target)
    if(event.target === event.currentTarget) {
      closePopup(event.target.closest(".popup"));
    }
  })
});

document.addEventListener("keydown", (event) => {

  if(event.key === "Escape") {
    popups.forEach((element) => {
      if(element.classList.contains("popup_opened")) {
        closePopup(element);
      }
    })
  }
})