import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(popupSelector);
        this.popupForm = this._popupElement.querySelector('.popup__form');
        this._submitCallback = submitCallback;
    }

    close() {
        this.popupForm.removeEventListener('submit', this._handleSubmit.bind(this));
        super.close();
    }

    setEventListeners() {
        this.popupForm.addEventListener('submit', this._handleSubmit.bind(this));
        super.setEventListeners();
    }

    _getInputValues() {
        const array = this._popupElement.querySelectorAll('.popup__field')
        const new_array = []
        array.forEach((input_element) => {
            new_array.push(input_element.value);  
        })
        return new_array;
    }

    _handleSubmit(event) {
        event.preventDefault();
        const inputValues = this._getInputValues();
        this._submitCallback(inputValues);
        this.close();
    }

}