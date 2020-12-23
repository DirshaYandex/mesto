import Popup from './Popup.js'
import FormValidator from './FormValidator.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, validationConfig) {
        super(popupSelector)
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(popupSelector)
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._formValidator = new FormValidator(validationConfig, this._popupForm)
        this._formValidator.enableValidation()
        this._submitCallback = submitCallback
    }

    open () {
        this._formValidator.setButtonState();
        this._clearValidErrors();
        super.open()
    }

    _clearValidErrors() {
        this._popupElement.querySelectorAll('.popup__field').forEach((input_element) => {
            input_element.classList.remove('popup__field_state_invalid');  
        })
        this._popupElement.querySelectorAll('.error').forEach((error_element) => {
            error_element.textContent = '';
        })
    }

    setEventListeners(){
        this._popupForm.addEventListener('submit', (event) => {
            this._submitCallback(event);
            this.close();
        })
    }

}