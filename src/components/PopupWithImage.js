import {Popup} from "./Popup.js";
export {PopupWithImage}

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(".popup__image");
        // console.log(this._popup)
    }

    handleOpenPopup(link, name) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popup.querySelector(".popup__image-subtitle").textContent = name;
        
        super.handleOpenPopup();

        // console.log("opened")
    }
    
    // setEventListeners унаследован от Popup
}