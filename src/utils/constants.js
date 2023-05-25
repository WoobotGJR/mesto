const imagePopupImage = document.querySelector(".popup__image");
const imagePopupTextContent = document.querySelector(".popup__image-subtitle");
const popupProfileEditButton = document.querySelector(".profile__edit-button");
const popupProfileAddButton = document.querySelector(".profile__add-button");
const popupProfileEditAvatarButton = document.querySelector(".profile__avatar-overlay");
const formEditElement = document.querySelector(".popup__container_type_edit");
const nameInput = formEditElement.querySelector(".popup__input_type_name-text");
const jobInput = formEditElement.querySelector(".popup__input_activity-text"); 

export {popupProfileEditButton, popupProfileAddButton, popupProfileEditAvatarButton, nameInput, jobInput, imagePopupImage, imagePopupTextContent}