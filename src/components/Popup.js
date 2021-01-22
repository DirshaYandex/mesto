export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._escKeyCode = 27;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._popupOverlayClickHandler = this._popupOverlayClickHandler.bind(this)
    }
    
    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose); 
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', this._popupOverlayClickHandler);
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