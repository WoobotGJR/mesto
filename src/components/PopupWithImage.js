import {Popup} from "./Popup.js";
export {PopupWithImage}

class PopupWithImage extends Popup {
    constructor({link, name}, popupSelector) {
        super(popupSelector);
        this._image = link;
        this._name = name;
        console.log(this._popup)
    }

    handleOpenPopup() {
        this._popup.querySelector(".popup__image").src = this._image;
        this._popup.querySelector(".popup__image-subtitle").textContent = this._name;
        
        super.handleOpenPopup();
    }
    
    // setEventListeners унаследован от Popup
}