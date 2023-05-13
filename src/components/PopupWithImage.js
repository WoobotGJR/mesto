import {Popup} from "./Popup.js";
export {PopupWithImage}

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        // console.log(this._popup)
    }

    handleOpenPopup(link, name) {
        this._popup.querySelector(".popup__image").src = link;
        this._popup.querySelector(".popup__image").alt = name;
        this._popup.querySelector(".popup__image-subtitle").textContent = name;
        
        super.handleOpenPopup();
    }
    
    // setEventListeners унаследован от Popup
}