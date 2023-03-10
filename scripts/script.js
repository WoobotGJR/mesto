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
    console.log("Попап закрыт - handleFormSubmit");
}


function togglePopup() {
    popupWindow.classList.toggle("popup_opened")
    console.log("Попап закрыт/открыт - togglePopup");

    nameInput.value = profileName.textContent; //при открытии попапа инициализируем формы теми, которые введены в профиле
    jobInput.value = profileActivity.textContent; //при открытии попапа инициализируем формы теми, которые введены в профиле
}

for(let i = 0; i < likeButtons.length; ++i) {
    // console.log("цикл for был вызван");
    function toggleLikeButton() {
        let likeButton = likeButtons[i];
        
        // console.log(likeButton)

        likeButton.classList.toggle("element__like-button_disabled");   
        likeButton.classList.toggle("element__like-button_active");        
    }

    likeButtons[i].addEventListener("click", toggleLikeButton);

     /*была проблема с тем, что метод querySelector для like и dislike вызывался от первого попавшегося в DOM дереве likeButtons.
     Проблема решена тем, что все элементы учтены в цикле for, и там же, они вызываются от имени итерируемого элемента*/
}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);
formElement.addEventListener('submit', handleFormSubmit); 
