import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector, link, name) {
        super(popupSelector)
        this._link = link
        this._name = name
    }

    open() {
        const picturePopupImage = this._popupElement.querySelector('.picture-popup__image');
        const picturePopupText = this._popupElement.querySelector('.picture-popup__text');
        picturePopupImage.src =  this._link; 
        picturePopupImage.alt = this._name;
        picturePopupText.textContent = this._name;
        super.open()
    }
}