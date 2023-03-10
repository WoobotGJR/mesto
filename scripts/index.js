let editButton = document.querySelector(".profile__edit-button");
let popupWindow = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button");
let likeButtons = document.querySelectorAll(".element__like-button");
// console.log(likeButtons);
let formElement = document.querySelector(".popup__container");
// console.log(formElement);
let nameInput = formElement.querySelector(".popup__input_type_name-text");
// console.log(nameInput);
let jobInput = formElement.querySelector(".popup__input_activity-text");
// console.log(jobInput);
let profileName = document.querySelector(".profile__name");
// console.log(document.querySelector(".profile__name"));
let profileActivity = document.querySelector(".profile__activity");
// console.log(document.querySelector(".profile__activity"));
let submitButton = document.querySelector(".popup__submit-button");
// console.log(likeButtons[0].classList)

function handleFormSubmit(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;
    // console.log("Значения сохранены");

    togglePopup();
    // console.log("Попап закрыт - handleFormSubmit");
}

function togglePopup() {
    popupWindow.classList.toggle("popup_opened")
    console.log("Попап закрыт/открыт - togglePopup");

    nameInput.value = profileName.textContent; //при открытии попапа инициализируем формы теми, которые введены в профиле
    jobInput.value = profileActivity.textContent; //при открытии попапа инициализируем формы теми, которые введены в профиле
}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);
formElement.addEventListener('submit', handleFormSubmit); 
