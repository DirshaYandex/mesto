import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._picturePopupImage = this._popupElement.querySelector('.picture-popup__image');
        this._picturePopupText = this._popupElement.querySelector('.picture-popup__text');

    }

    open(link, name) {
        this._picturePopupImage.src =  link; 
        this._picturePopupImage.alt = name;
        this._picturePopupText.textContent = name;
        super.open()
    }
}