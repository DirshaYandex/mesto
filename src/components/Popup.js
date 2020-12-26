export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(popupSelector);
        this._escKeyCode = 27;
    }
    
    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this)); 
        this._popupElement.removeEventListener('mousedown', this._popupOverlayClickHandler.bind(this));
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', this._popupOverlayClickHandler.bind(this));
    }

    _handleEscClose(event) {
        if(event.keyCode === this._escKeyCode) {
            this.close();
        event.preventDefault();
        }
    }

    _popupOverlayClickHandler(event) {
        if (event.target.classList.contains('popup')) {
            this.close()
        }
        if (event.target.classList.contains('popup__close')) {
            this.close()
        }
    }
}