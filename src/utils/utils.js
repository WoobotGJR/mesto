import {imagePopupImage, imagePopupTextContent} from "./constants.js"
import { PopupWithImage } from "../components/PopupWithImage.js";
export {createImagePopup}

const createImagePopup = (link, name) => { // функция для создания и заполнения модального окна с карточками
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupTextContent.textContent = name;
    const popupWindow = new PopupWithImage({link: link, name: name}, ".image-popup")
    popupWindow.setEventListeners();
    popupWindow.handleOpenPopup();
  }