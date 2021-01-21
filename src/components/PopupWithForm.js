import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
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
        const inputValues = []
        this._popupElement.querySelectorAll('.popup__field').forEach((inputElement) => {
            inputValues.push(inputElement.value);
        });
        return inputValues;
    }

    _handleSubmit(event) {
        event.preventDefault();
        const inputValues = this._getInputValues();
        this._submitCallback(inputValues);
        this.close();
    }

}