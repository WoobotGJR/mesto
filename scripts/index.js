const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".edit-popup");
const addPopup = document.querySelector(".add-popup");
const imagePopup = document.querySelector(".image-popup");
const closeButton = document.querySelectorAll(".popup__close-button");
const likeButtons = document.querySelectorAll(".element__like-button");
const formElement = document.querySelectorAll(".popup__container");
const nameInput = formElement[0].querySelector(".popup__input_type_name-text"); //мне не нравится обращение к элементам по индексу
const jobInput = formElement[0].querySelector(".popup__input_activity-text");
const profileName = document.querySelector(".profile__name");
const placeNameInput = formElement[1].querySelector(".popup__input_type_place-name-text");
const imageLinkInput = formElement[1].querySelector(".popup__input_image-link-text")
const profileActivity = document.querySelector(".profile__activity");
const submitButton = document.querySelector(".popup__submit-button");
const cardElements = document.querySelector(".elements");
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' // replace with images from PC
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

function addCardElement(link, name) {

    const cardTemplate = document.querySelector("#card-element").content;
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true); //разобраться с cloneNode дополнительно
    const cardImage = cardElement.querySelector(".element__image");
    const cardName = cardElement.querySelector(".element__subtitle");

    cardImage.src = link;
    cardName.textContent = name;

    cardElements.append(cardElement);

    cardElement.querySelector(".element__like-button").addEventListener("click", (event) => {

        event.target.classList.toggle("element__like-button_active");

    })

    cardElement.querySelector(".element__delete-button").addEventListener("click", () => {

       cardElement.remove();
       
    })

    cardElement.querySelector(".element__image").addEventListener("click", () => {

      document.querySelector(".image-popup__image").src = cardImage.src;
      document.querySelector(".image-popup__subtitle").textContent = cardName.textContent;

      document.querySelector(".image-popup").classList.toggle("popup_opened");

    })

}

for (let i = 0; i < initialCards.length; i++) {

    addCardElement(initialCards[i].link, initialCards[i].name)

}

editButton.addEventListener("click", () => {

  editPopup.classList.toggle("popup_opened");

  nameInput.value = profileName.textContent; //при открытии попапа инициализируем формы теми, которые введены в профиле
  jobInput.value = profileActivity.textContent; //при открытии попапа инициализируем формы теми, которые введены в профиле

});

addButton.addEventListener("click", () => {

  addPopup.classList.toggle("popup_opened");

});

for(let i = 0; i < closeButton.length; i++) {

  closeButton[i].addEventListener("click", (event) => {

    event.target.parentElement.parentElement.classList.toggle("popup_opened");

  });

}

formElement[0].addEventListener('submit', (event) => {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;
    // console.log("Значения сохранены");

    editPopup.classList.toggle("popup_opened");
}); 

formElement[1].addEventListener("submit", (event) => {
  event.preventDefault();

  addCardElement(imageLinkInput.value, placeNameInput.value);

  addPopup.classList.toggle("popup_opened");

  imageLinkInput.value = null;
  placeNameInput.value = null;
})